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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.lifecycleScope
import io.github.jan_tennert.supabase.auth.auth
import io.github.jan_tennert.supabase.auth.providers.builtin.Email
import kotlinx.coroutines.launch
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

class LoginActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState);
        
        // Initialize Supabase Client
        SupabaseManager.initialize(applicationContext);

        // Check if user is already logged in
        val currentSession = SupabaseManager.client.auth.currentSessionOrNull()
        if (currentSession != null) {
            startActivity(Intent(this, MainActivity::class.java));
            finish();
            return;
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
                LoginScreen()
            }
        }
    }

    @Composable
    fun LoginScreen() {
        var isLoginTab by remember { mutableStateOf(true) }
        var email by remember { mutableStateOf("") }
        var password by remember { mutableStateOf("") }
        var username by remember { mutableStateOf("") }
        var fullName by remember { mutableStateOf("") }
        var loading by remember { mutableStateOf(false) }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFF0B111A))
                .padding(24.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Header Logo
            Text(
                text = "🏆 CRAVACOPA",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF10B981),
                fontFamily = FontFamily.SansSerif,
                modifier = Modifier.padding(bottom = 8.dp)
            )
            
            Text(
                text = "Bolão Copa do Mundo 2026",
                fontSize = 14.sp,
                color = Color(0xFF9CA3AF),
                modifier = Modifier.padding(bottom = 32.dp)
            )

            // Auth Card
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFF121B26), shape = RoundedCornerShape(16.dp))
                    .border(1.5.dp, Color(0xFF1F2937), shape = RoundedCornerShape(16.dp))
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Tab Headers
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 24.dp)
                ) {
                    Text(
                        text = "Entrar",
                        color = if (isLoginTab) Color(0xFF10B981) else Color(0xFF9CA3AF),
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center,
                        modifier = Modifier
                            .weight(1f)
                            .clickable { isLoginTab = true }
                            .padding(vertical = 8.dp)
                    )
                    Text(
                        text = "Cadastrar",
                        color = if (!isLoginTab) Color(0xFF10B981) else Color(0xFF9CA3AF),
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center,
                        modifier = Modifier
                            .weight(1f)
                            .clickable { isLoginTab = false }
                            .padding(vertical = 8.dp)
                    )
                }

                // Input fields
                if (!isLoginTab) {
                    OutlinedTextField(
                        value = username,
                        onValueChange = { username = it },
                        label = { Text("Nome de Usuário", color = Color(0xFF9CA3AF)) },
                        colors = TextFieldDefaults.colors(
                            focusedTextColor = Color.White,
                            unfocusedTextColor = Color.White,
                            focusedContainerColor = Color.Transparent,
                            unfocusedContainerColor = Color.Transparent,
                            focusedIndicatorColor = Color(0xFF10B981),
                            unfocusedIndicatorColor = Color(0xFF1F2937)
                        ),
                        modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp)
                    )
                    OutlinedTextField(
                        value = fullName,
                        onValueChange = { fullName = it },
                        label = { Text("Nome Completo", color = Color(0xFF9CA3AF)) },
                        colors = TextFieldDefaults.colors(
                            focusedTextColor = Color.White,
                            unfocusedTextColor = Color.White,
                            focusedContainerColor = Color.Transparent,
                            unfocusedContainerColor = Color.Transparent,
                            focusedIndicatorColor = Color(0xFF10B981),
                            unfocusedIndicatorColor = Color(0xFF1F2937)
                        ),
                        modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp)
                    )
                }

                OutlinedTextField(
                    value = email,
                    onValueChange = { email = it },
                    label = { Text("Email", color = Color(0xFF9CA3AF)) },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                    colors = TextFieldDefaults.colors(
                        focusedTextColor = Color.White,
                        unfocusedTextColor = Color.White,
                        focusedContainerColor = Color.Transparent,
                        unfocusedContainerColor = Color.Transparent,
                        focusedIndicatorColor = Color(0xFF10B981),
                        unfocusedIndicatorColor = Color(0xFF1F2937)
                    ),
                    modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp)
                )

                OutlinedTextField(
                    value = password,
                    onValueChange = { password = it },
                    label = { Text("Senha", color = Color(0xFF9CA3AF)) },
                    visualTransformation = PasswordVisualTransformation(),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    colors = TextFieldDefaults.colors(
                        focusedTextColor = Color.White,
                        unfocusedTextColor = Color.White,
                        focusedContainerColor = Color.Transparent,
                        unfocusedContainerColor = Color.Transparent,
                        focusedIndicatorColor = Color(0xFF10B981),
                        unfocusedIndicatorColor = Color(0xFF1F2937)
                    ),
                    modifier = Modifier.fillMaxWidth().padding(bottom = 24.dp)
                )

                // Submit Button
                Button(
                    onClick = {
                        if (email.isBlank() || password.isBlank()) {
                            Toast.makeText(this@LoginActivity, "Preencha todos os campos!", Toast.LENGTH_SHORT).show()
                            return@Button
                        }
                        loading = true
                        lifecycleScope.launch {
                            try {
                                val auth = SupabaseManager.client.auth
                                if (isLoginTab) {
                                    auth.signInWith(Email) {
                                        this.email = email
                                        this.password = password
                                    }
                                    Toast.makeText(this@LoginActivity, "Login efetuado!", Toast.LENGTH_SHORT).show()
                                    startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                                    finish()
                                } else {
                                    auth.signUpWith(Email) {
                                        this.email = email
                                        this.password = password
                                        data = buildJsonObject {
                                            put("username", username.ifBlank { email.substringBefore("@") })
                                            put("full_name", fullName.ifBlank { email.substringBefore("@") })
                                        }
                                    }
                                    Toast.makeText(this@LoginActivity, "Cadastro realizado! Faça login.", Toast.LENGTH_LONG).show()
                                    isLoginTab = true
                                }
                            } catch (e: Exception) {
                                Toast.makeText(this@LoginActivity, e.message ?: "Erro na autenticação", Toast.LENGTH_LONG).show()
                            } finally {
                                loading = false
                            }
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981)),
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier.fillMaxWidth().height(48.dp),
                    disabled = loading
                ) {
                    if (loading) {
                        CircularProgressIndicator(color = Color.White, modifier = Modifier.size(24.dp))
                    } else {
                        Text(
                            text = if (isLoginTab) "Entrar no Bolão" else "Finalizar Cadastro",
                            color = Color.White,
                            fontWeight = FontWeight.Bold,
                            fontSize = 16.sp
                        )
                    }
                }
            }
        }
    }
}
