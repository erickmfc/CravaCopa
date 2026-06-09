package com.cravacopa

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ExitToApp
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.lifecycle.lifecycleScope
import io.github.jan_tennert.supabase.auth.auth
import io.github.jan_tennert.supabase.postgrest.from
import io.github.jan_tennert.supabase.postgrest.query.Columns
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

// Database Models
@Serializable
data class Match(
    val id: String,
    @SerialName("home_team") val homeTeam: String,
    @SerialName("home_flag") val homeFlag: String,
    @SerialName("away_team") val awayTeam: String,
    @SerialName("away_flag") val awayFlag: String,
    @SerialName("date_str") val dateStr: String,
    val stadium: String,
    @SerialName("home_score") val homeScore: Int? = null,
    @SerialName("away_score") val awayScore: Int? = null,
    val phase: String
)

@Serializable
data class Profile(
    val id: String,
    val username: String? = null,
    @SerialName("full_name") val fullName: String? = null,
    @SerialName("avatar_url") val avatarUrl: String? = null,
    val points: Int = 0,
    @SerialName("zicas_used") val zicasUsed: Int = 0
)

@Serializable
data class Guess(
    val id: String? = null,
    @SerialName("profile_id") val profileId: String,
    @SerialName("match_id") val matchId: String,
    @SerialName("home_score") val homeScore: Int,
    @SerialName("away_score") val awayScore: Int,
    @SerialName("zica_target_profile_id") val zicaTargetProfileId: String? = null
)

@Serializable
data class ChatMessage(
    val id: String? = null,
    @SerialName("pool_id") val poolId: String,
    @SerialName("profile_id") val profileId: String,
    @SerialName("message_text") val messageText: String,
    @SerialName("created_at") val createdAt: String? = null
)

@Serializable
data class ChatMessageWithProfile(
    val id: String,
    @SerialName("pool_id") val poolId: String,
    @SerialName("profile_id") val profileId: String,
    @SerialName("message_text") val messageText: String,
    @SerialName("created_at") val createdAt: String,
    val profiles: Profile? = null
)

@Serializable
data class Pool(
    val id: String,
    val name: String,
    val description: String? = null,
    @SerialName("shield_color") val shieldColor: String? = null,
    @SerialName("created_by") val createdBy: String? = null
)

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val session = SupabaseManager.client.auth.currentSessionOrNull()
        if (session == null) {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
            return
        }

        setContent {
            MaterialTheme(
                colorScheme = darkColorScheme(
                    background = Color(0xFF0B111A),
                    surface = Color(0xFF121B26),
                    primary = Color(0xFF10B981),
                    onPrimary = Color.White,
                    onBackground = Color.White,
                    onSurface = Color.White
                )
            ) {
                MainScreen(session.user.id)
            }
        }
    }

    @OptIn(ExperimentalMaterial3Api::class)
    @Composable
    fun MainScreen(currentUserId: String) {
        var matchesList by remember { mutableStateOf<List<Match>>(emptyList()) }
        var guessesList by remember { mutableStateOf<List<Guess>>(emptyList()) }
        var rankingList by remember { mutableStateOf<List<Profile>>(emptyList()) }
        var chatMessages by remember { mutableStateOf<List<ChatMessageWithProfile>>(emptyList()) }
        var currentUserProfile by remember { mutableStateOf<Profile?>(null) }
        var isLoading by remember { mutableStateOf(true) }
        var activeTab by remember { mutableStateOf("jogos") } // "jogos", "ranking", "resenha"

        // Guess Dialog states
        var showGuessDialog by remember { mutableStateOf(false) }
        var selectedMatchForGuess by remember { mutableStateOf<Match?>(null) }
        var tempHomeScore by remember { mutableStateOf(0) }
        var tempAwayScore by remember { mutableStateOf(0) }
        var tempZicaTargetId by remember { mutableStateOf<String?>(null) }

        // Chat Input state
        var chatInputText by remember { mutableStateOf("") }
        var isSendingMessage by remember { mutableStateOf(false) }

        // Function to reload data
        fun refreshData(silent: Boolean = false) {
            if (!silent) isLoading = true
            lifecycleScope.launch {
                try {
                    val client = SupabaseManager.client

                    // Ensure defaults are present (like the global chat pool)
                    ensureDefaultPoolExists(currentUserId)

                    // 1. Fetch matches
                    val matches = client.from("matches").select().decodeList<Match>()
                    matchesList = matches.sortedBy { it.id }

                    // 2. Fetch profiles
                    val profiles = client.from("profiles").select().decodeList<Profile>()
                    rankingList = profiles.sortedByDescending { it.points }
                    currentUserProfile = profiles.find { it.id == currentUserId }

                    // 3. Fetch guesses of current user
                    guessesList = client.from("guesses").select {
                        filter {
                            eq("profile_id", currentUserId)
                        }
                    }.decodeList<Guess>()

                    // 4. Fetch chat messages (joined with profiles)
                    chatMessages = client.from("chat_messages")
                        .select(columns = Columns.raw("*, profiles(*)")) {
                            filter {
                                eq("pool_id", "resenha-fc")
                            }
                        }.decodeList<ChatMessageWithProfile>()
                        .sortedBy { it.createdAt }

                } catch (e: Exception) {
                    e.printStackTrace()
                    if (!silent) {
                        Toast.makeText(this@MainActivity, "Erro ao carregar dados: ${e.message}", Toast.LENGTH_LONG).show()
                    }
                } finally {
                    isLoading = false
                }
            }
        }

        // Trigger load initially
        LaunchedEffect(Unit) {
            refreshData()
            // Auto refresh chat & profiles silently every 5 seconds
            while (true) {
                delay(5000)
                refreshData(silent = true)
            }
        }

        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Column {
                            Text(
                                text = "🏆 CRAVACOPA",
                                fontWeight = FontWeight.Bold,
                                fontSize = 20.sp,
                                color = Color(0xFF10B981)
                            )
                            currentUserProfile?.let {
                                Text(
                                    text = "${it.fullName ?: it.username ?: "Jogador"} • ${it.points} Pts",
                                    fontSize = 12.sp,
                                    color = Color(0xFF9CA3AF)
                                )
                            }
                        }
                    },
                    actions = {
                        IconButton(onClick = { refreshData() }) {
                            Icon(Icons.Default.Refresh, contentDescription = "Recarregar", tint = Color.White)
                        }
                        IconButton(onClick = {
                            lifecycleScope.launch {
                                SupabaseManager.client.auth.signOut()
                                startActivity(Intent(this@MainActivity, LoginActivity::class.java))
                                finish()
                            }
                        }) {
                            Icon(Icons.Default.ExitToApp, contentDescription = "Sair", tint = Color.Red)
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = Color(0xFF121B26)
                    )
                )
            },
            bottomBar = {
                NavigationBar(
                    containerColor = Color(0xFF121B26),
                    tonalElevation = 8.dp
                ) {
                    NavigationBarItem(
                        selected = activeTab == "jogos",
                        onClick = { activeTab = "jogos" },
                        icon = { Text("⚽", fontSize = 20.sp) },
                        label = { Text("Jogos", color = if (activeTab == "jogos") Color(0xFF10B981) else Color.White) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFF10B981),
                            indicatorColor = Color(0xFF1F2937)
                        )
                    )
                    NavigationBarItem(
                        selected = activeTab == "ranking",
                        onClick = { activeTab = "ranking" },
                        icon = { Text("📊", fontSize = 20.sp) },
                        label = { Text("Ranking", color = if (activeTab == "ranking") Color(0xFF10B981) else Color.White) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFF10B981),
                            indicatorColor = Color(0xFF1F2937)
                        )
                    )
                    NavigationBarItem(
                        selected = activeTab == "resenha",
                        onClick = { activeTab = "resenha" },
                        icon = { Text("💬", fontSize = 20.sp) },
                        label = { Text("Resenha", color = if (activeTab == "resenha") Color(0xFF10B981) else Color.White) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFF10B981),
                            indicatorColor = Color(0xFF1F2937)
                        )
                    )
                }
            },
            containerColor = Color(0xFF0B111A)
        ) { innerPadding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
            ) {
                if (isLoading && matchesList.isEmpty()) {
                    CircularProgressIndicator(
                        modifier = Modifier.align(Alignment.Center),
                        color = Color(0xFF10B981)
                    )
                } else {
                    when (activeTab) {
                        "jogos" -> MatchesTab(
                            matches = matchesList,
                            guesses = guessesList,
                            onMatchClick = { match ->
                                selectedMatchForGuess = match
                                val existingGuess = guessesList.find { it.matchId == match.id }
                                tempHomeScore = existingGuess?.homeScore ?: 0
                                tempAwayScore = existingGuess?.awayScore ?: 0
                                tempZicaTargetId = existingGuess?.zicaTargetProfileId
                                showGuessDialog = true
                            }
                        )
                        "ranking" -> RankingTab(
                            ranking = rankingList,
                            currentUserId = currentUserId
                        )
                        "resenha" -> ChatTab(
                            messages = chatMessages,
                            currentUserId = currentUserId,
                            inputText = chatInputText,
                            onInputChange = { chatInputText = it },
                            isSending = isSendingMessage,
                            onSendMessage = {
                                if (chatInputText.isNotBlank()) {
                                    isSendingMessage = true
                                    lifecycleScope.launch {
                                        try {
                                            SupabaseManager.client.from("chat_messages").insert(
                                                ChatMessage(
                                                    poolId = "resenha-fc",
                                                    profileId = currentUserId,
                                                    messageText = chatInputText.trim()
                                                )
                                            )
                                            chatInputText = ""
                                            refreshData(silent = true)
                                        } catch (e: Exception) {
                                            Toast.makeText(this@MainActivity, "Erro ao enviar: ${e.message}", Toast.LENGTH_SHORT).show()
                                        } finally {
                                            isSendingMessage = false
                                        }
                                    }
                                }
                            }
                        )
                    }
                }
            }
        }

        // Guess Dialog
        if (showGuessDialog && selectedMatchForGuess != null) {
            val match = selectedMatchForGuess!!
            Dialog(onDismissRequest = { showGuessDialog = false }) {
                Card(
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF121B26)),
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp)
                        .border(1.dp, Color(0xFF1F2937), RoundedCornerShape(16.dp))
                ) {
                    Column(
                        modifier = Modifier.padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "Palpite Oficial",
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp,
                            color = Color(0xFF10B981),
                            modifier = Modifier.padding(bottom = 16.dp)
                        )

                        // Teams Scores Editor
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.Center,
                            modifier = Modifier.fillMaxWidth().padding(bottom = 20.dp)
                        ) {
                            // Home Team Column
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                modifier = Modifier.weight(1f)
                            ) {
                                Text(match.homeFlag, fontSize = 28.sp)
                                Text(
                                    match.homeTeam,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White,
                                    textAlign = TextAlign.Center,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    modifier = Modifier.padding(top = 8.dp)
                                ) {
                                    Button(
                                        onClick = { if (tempHomeScore > 0) tempHomeScore-- },
                                        contentPadding = PaddingValues(0.dp),
                                        modifier = Modifier.size(32.dp),
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF1F2937))
                                    ) { Text("-", color = Color.White) }
                                    
                                    Text(
                                        text = tempHomeScore.toString(),
                                        fontSize = 20.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = Color.White,
                                        modifier = Modifier.padding(horizontal = 12.dp)
                                    )

                                    Button(
                                        onClick = { tempHomeScore++ },
                                        contentPadding = PaddingValues(0.dp),
                                        modifier = Modifier.size(32.dp),
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF1F2937))
                                    ) { Text("+", color = Color.White) }
                                }
                            }

                            Text(
                                text = "X",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF9CA3AF),
                                modifier = Modifier.padding(horizontal = 8.dp)
                            )

                            // Away Team Column
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                modifier = Modifier.weight(1f)
                            ) {
                                Text(match.awayFlag, fontSize = 28.sp)
                                Text(
                                    match.awayTeam,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White,
                                    textAlign = TextAlign.Center,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    modifier = Modifier.padding(top = 8.dp)
                                ) {
                                    Button(
                                        onClick = { if (tempAwayScore > 0) tempAwayScore-- },
                                        contentPadding = PaddingValues(0.dp),
                                        modifier = Modifier.size(32.dp),
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF1F2937))
                                    ) { Text("-", color = Color.White) }
                                    
                                    Text(
                                        text = tempAwayScore.toString(),
                                        fontSize = 20.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = Color.White,
                                        modifier = Modifier.padding(horizontal = 12.dp)
                                    )

                                    Button(
                                        onClick = { tempAwayScore++ },
                                        contentPadding = PaddingValues(0.dp),
                                        modifier = Modifier.size(32.dp),
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF1F2937))
                                    ) { Text("+", color = Color.White) }
                                }
                            }
                        }

                        // Modo Zica Section
                        HorizontalDivider(color = Color(0xFF1F2937), modifier = Modifier.padding(vertical = 12.dp))
                        Text(
                            text = "🎯 Modo Zica (Opcional)",
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp,
                            color = Color(0xFFFBBF24),
                            modifier = Modifier.padding(bottom = 4.dp)
                        )
                        Text(
                            text = "Sabote um amigo! Se ele errar a rodada ele zera; se ele acertar, você perde 1pt.",
                            fontSize = 10.sp,
                            color = Color(0xFF9CA3AF),
                            textAlign = TextAlign.Center,
                            modifier = Modifier.padding(bottom = 12.dp)
                        )

                        // Zica Target Spinner / Selector
                        var dropdownExpanded by remember { mutableStateOf(false) }
                        val targets = rankingList.filter { it.id != currentUserId }
                        val selectedTargetName = targets.find { it.id == tempZicaTargetId }?.let { it.fullName ?: it.username } ?: "Nenhum alvo"

                        Box(modifier = Modifier.fillMaxWidth()) {
                            OutlinedButton(
                                onClick = { dropdownExpanded = true },
                                modifier = Modifier.fillMaxWidth(),
                                colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.White),
                                border = ButtonDefaults.outlinedButtonBorder.copy(width = 1.dp)
                            ) {
                                Text(selectedTargetName, maxLines = 1, overflow = TextOverflow.Ellipsis)
                            }
                            DropdownMenu(
                                expanded = dropdownExpanded,
                                onDismissRequest = { dropdownExpanded = false },
                                modifier = Modifier.fillMaxWidth(0.8f).background(Color(0xFF121B26))
                            ) {
                                DropdownMenuItem(
                                    text = { Text("Nenhum Alvo (Cancelar Zica)", color = Color.Red) },
                                    onClick = {
                                        tempZicaTargetId = null
                                        dropdownExpanded = false
                                    }
                                )
                                targets.forEach { target ->
                                    DropdownMenuItem(
                                        text = { Text(target.fullName ?: target.username ?: "Jogador", color = Color.White) },
                                        onClick = {
                                            tempZicaTargetId = target.id
                                            dropdownExpanded = false
                                        }
                                    )
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(24.dp))

                        // Dialog Buttons
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            OutlinedButton(
                                onClick = { showGuessDialog = false },
                                modifier = Modifier.weight(1f),
                                colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.White)
                            ) {
                                Text("Cancelar")
                            }
                            Button(
                                onClick = {
                                    showGuessDialog = false
                                    isLoading = true
                                    lifecycleScope.launch {
                                        try {
                                            val client = SupabaseManager.client
                                            val newGuess = Guess(
                                                profileId = currentUserId,
                                                matchId = match.id,
                                                homeScore = tempHomeScore,
                                                awayScore = tempAwayScore,
                                                zicaTargetProfileId = tempZicaTargetId
                                            )
                                            client.from("guesses").upsert(newGuess, onConflict = "profile_id,match_id")
                                            Toast.makeText(this@MainActivity, "Palpite salvo!", Toast.LENGTH_SHORT).show()
                                            refreshData()
                                        } catch (e: Exception) {
                                            Toast.makeText(this@MainActivity, "Erro ao salvar palpite: ${e.message}", Toast.LENGTH_LONG).show()
                                        } finally {
                                            isLoading = false
                                        }
                                    }
                                },
                                modifier = Modifier.weight(1f),
                                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981))
                            ) {
                                Text("Salvar")
                            }
                        }
                    }
                }
            }
        }
    }

    @Composable
    fun MatchesTab(
        matches: List<Match>,
        guesses: List<Guess>,
        onMatchClick: (Match) -> Unit
    ) {
        if (matches.isEmpty()) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Nenhuma partida cadastrada na Copa 2026.", color = Color(0xFF9CA3AF))
            }
            return
        }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp, vertical = 8.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(matches) { match ->
                val guess = guesses.find { it.matchId == match.id }
                Card(
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF121B26)),
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(1.dp, Color(0xFF1F2937), RoundedCornerShape(12.dp))
                        .clickable { onMatchClick(match) }
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        // Date & Venue
                        Row(
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(match.dateStr, fontSize = 11.sp, color = Color(0xFF10B981), fontWeight = FontWeight.Bold)
                            Text(match.stadium, fontSize = 11.sp, color = Color(0xFF9CA3AF), maxLines = 1, overflow = TextOverflow.Ellipsis)
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        // Match scoreboard UI
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.Center,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            // Home Team
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.End,
                                modifier = Modifier.weight(1f)
                            ) {
                                Text(
                                    match.homeTeam,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 14.sp,
                                    color = Color.White,
                                    modifier = Modifier.padding(end = 8.dp),
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                                Text(match.homeFlag, fontSize = 24.sp)
                            }

                            // Score or Vs
                            Box(
                                contentAlignment = Alignment.Center,
                                modifier = Modifier.padding(horizontal = 16.dp)
                            ) {
                                if (match.homeScore != null && match.awayScore != null) {
                                    Text(
                                        text = "${match.homeScore} - ${match.awayScore}",
                                        fontSize = 18.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = Color.White
                                    )
                                } else {
                                    Text(
                                        text = "vs",
                                        fontSize = 14.sp,
                                        color = Color(0xFF9CA3AF),
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                            }

                            // Away Team
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.Start,
                                modifier = Modifier.weight(1f)
                            ) {
                                Text(match.awayFlag, fontSize = 24.sp)
                                Text(
                                    match.awayTeam,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 14.sp,
                                    color = Color.White,
                                    modifier = Modifier.padding(start = 8.dp),
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                            }
                        }

                        // Guess Indicator
                        HorizontalDivider(color = Color(0xFF1F2937), modifier = Modifier.padding(vertical = 12.dp))
                        Row(
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            if (guess != null) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text("🎯 Seu palpite: ", fontSize = 12.sp, color = Color(0xFF9CA3AF))
                                    Text(
                                        "${guess.homeScore} x ${guess.awayScore}",
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = Color(0xFF10B981)
                                    )
                                    if (guess.zicaTargetProfileId != null) {
                                        Text(" (Zica Ativa!)", fontSize = 10.sp, color = Color(0xFFFBBF24))
                                    }
                                }
                            } else {
                                Text("Nenhum palpite enviado", fontSize = 12.sp, color = Color(0xFF9CA3AF))
                            }
                            Text(
                                text = if (guess != null) "Editar" else "Palpitar",
                                fontSize = 12.sp,
                                color = Color(0xFF10B981),
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }
    }

    @Composable
    fun RankingTab(
        ranking: List<Profile>,
        currentUserId: String
    ) {
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            item {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Classificação Geral", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = Color.White)
                    Text("Pontos", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = Color(0xFF10B981))
                }
            }

            items(ranking.size) { index ->
                val profile = ranking[index]
                val isYou = profile.id == currentUserId
                val borderColor = if (isYou) Color(0xFF10B981) else Color.Transparent
                val backgroundColor = if (isYou) Color(0xFF162535) else Color(0xFF121B26)

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(8.dp))
                        .background(backgroundColor)
                        .border(1.dp, if (isYou) borderColor else Color(0xFF1F2937), RoundedCornerShape(8.dp))
                        .padding(12.dp)
                ) {
                    // Position
                    Text(
                        text = "${index + 1}º",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = when (index) {
                            0 -> Color(0xFFFBBF24) // Gold
                            1 -> Color(0xFF9CA3AF) // Silver
                            2 -> Color(0xFFD97706) // Bronze
                            else -> Color.White
                        },
                        modifier = Modifier.width(36.dp)
                    )

                    // Initials Avatar
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier
                            .size(32.dp)
                            .clip(CircleShape)
                            .background(if (isYou) Color(0xFF10B981) else Color(0xFF374151))
                    ) {
                        val nameStr = profile.fullName ?: profile.username ?: "P"
                        val initial = nameStr.take(1).uppercase()
                        Text(initial, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                    }

                    Spacer(modifier = Modifier.width(12.dp))

                    // Name
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = profile.fullName ?: profile.username ?: "Jogador",
                            fontWeight = if (isYou) FontWeight.Bold else FontWeight.Medium,
                            fontSize = 14.sp,
                            color = Color.White
                        )
                        if (isYou) {
                            Text("Você", fontSize = 10.sp, color = Color(0xFF10B981))
                        }
                    }

                    // Points
                    Text(
                        text = profile.points.toString(),
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp,
                        color = Color.White
                    )
                }
            }
        }
    }

    @Composable
    fun ChatTab(
        messages: List<ChatMessageWithProfile>,
        currentUserId: String,
        inputText: String,
        onInputChange: (String) -> Unit,
        isSending: Boolean,
        onSendMessage: () -> Unit
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            // Messages Area
            LazyColumn(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                if (messages.isEmpty()) {
                    item {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(32.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("Envie uma mensagem para iniciar a resenha!", color = Color(0xFF9CA3AF), fontSize = 12.sp)
                        }
                    }
                } else {
                    items(messages) { msg ->
                        val isOwn = msg.profileId == currentUserId
                        val align = if (isOwn) Alignment.End else Alignment.Start
                        val bubbleColor = if (isOwn) Color(0xFF10B981) else Color(0xFF1F2937)

                        Column(
                            horizontalAlignment = align,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            // Sender info (only for others)
                            if (!isOwn) {
                                Text(
                                    text = msg.profiles?.fullName ?: msg.profiles?.username ?: "Jogador",
                                    fontSize = 10.sp,
                                    color = Color(0xFF9CA3AF),
                                    modifier = Modifier.padding(bottom = 2.dp, start = 4.dp)
                                )
                            }
                            
                            // Message Bubble
                            Box(
                                modifier = Modifier
                                    .clip(
                                        RoundedCornerShape(
                                            topStart = 12.dp,
                                            topEnd = 12.dp,
                                            bottomStart = if (isOwn) 12.dp else 0.dp,
                                            bottomEnd = if (isOwn) 0.dp else 12.dp
                                        )
                                    )
                                    .background(bubbleColor)
                                    .padding(horizontal = 12.dp, vertical = 8.dp)
                            ) {
                                Text(
                                    text = msg.messageText,
                                    color = Color.White,
                                    fontSize = 14.sp
                                )
                            }

                            // Timestamp
                            // In real database we have timestamp, but since we parsed string we can show a brief time
                            // Let's just extract HH:mm from raw ISO timestamp
                            val displayTime = try {
                                // e.g. "2026-06-09T00:46:52Z" -> "00:46"
                                if (msg.createdAt.contains("T")) {
                                    val timePart = msg.createdAt.substringAfter("T").substringBefore(":")
                                    val minutePart = msg.createdAt.substringAfter("T").substringAfter(":").substringBefore(":")
                                    "$timePart:$minutePart"
                                } else {
                                    msg.createdAt.takeLast(8).take(5)
                                }
                            } catch (e: Exception) {
                                ""
                            }
                            if (displayTime.isNotBlank()) {
                                Text(
                                    text = displayTime,
                                    fontSize = 8.sp,
                                    color = Color(0xFF9CA3AF),
                                    modifier = Modifier.padding(top = 2.dp, start = 4.dp, end = 4.dp)
                                )
                            }
                        }
                    }
                }
            }

            // Chat Input Row
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFF121B26))
                    .padding(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                TextField(
                    value = inputText,
                    onValueChange = onInputChange,
                    placeholder = { Text("Digite sua mensagem...", color = Color(0xFF9CA3AF)) },
                    modifier = Modifier
                        .weight(1f)
                        .padding(end = 8.dp),
                    colors = TextFieldDefaults.colors(
                        focusedTextColor = Color.White,
                        unfocusedTextColor = Color.White,
                        focusedContainerColor = Color(0xFF0B111A),
                        unfocusedContainerColor = Color(0xFF0B111A),
                        focusedIndicatorColor = Color.Transparent,
                        unfocusedIndicatorColor = Color.Transparent
                    ),
                    shape = RoundedCornerShape(20.dp)
                )

                IconButton(
                    onClick = onSendMessage,
                    enabled = !isSending && inputText.isNotBlank(),
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(if (inputText.isNotBlank()) Color(0xFF10B981) else Color(0xFF1F2937))
                ) {
                    if (isSending) {
                        CircularProgressIndicator(color = Color.White, modifier = Modifier.size(20.dp))
                    } else {
                        Icon(Icons.Default.Send, contentDescription = "Enviar", tint = Color.White)
                    }
                }
            }
        }
    }

    private suspend fun ensureDefaultPoolExists(currentUserId: String) {
        try {
            val client = SupabaseManager.client
            // Check if default pool exists
            val exists = try {
                client.from("pools").select {
                    filter {
                        eq("id", "resenha-fc")
                    }
                }.decodeSingleOrNull<Pool>() != null
            } catch (e: Exception) {
                false
            }
            if (!exists) {
                // Insert default pool
                client.from("pools").insert(Pool(
                    id = "resenha-fc",
                    name = "Resenha FC",
                    description = "Bolão Oficial CravaCopa 2026",
                    shieldColor = "green",
                    createdBy = currentUserId
                ))
                // Insert member
                client.from("pool_members").insert(buildJsonObject {
                    put("pool_id", "resenha-fc")
                    put("profile_id", currentUserId)
                })
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
