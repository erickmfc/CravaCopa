// ==========================================
// 1. Initial State Database
// ==========================================

const STATE = {
  currentUser: {
    name: "O Vidente",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    points: 1070,
    rank: 3
  },
  pools: [
    {
      id: "resenha-fc",
      name: "Resenha FC",
      shield: "green",
      membersCount: 27,
      userPoints: 1070,
      userRank: 3,
      createdBy: "O Vidente",
      createdDate: "01/05/2026",
      type: "Público",
      isMember: true
    },
    {
      id: "familia-amigos",
      name: "Família & Amigos",
      shield: "red",
      membersCount: 18,
      userPoints: 850,
      userRank: 5,
      createdBy: "Tio João",
      createdDate: "10/05/2026",
      type: "Privado",
      isMember: true
    },
    {
      id: "galera-trabalho",
      name: "Galera do Trabalho",
      shield: "blue",
      membersCount: 32,
      userPoints: 1280,
      userRank: 1,
      createdBy: "Chefe Carlos",
      createdDate: "25/04/2026",
      type: "Público",
      isMember: true
    },
    {
      id: "boleiros-plantao",
      name: "Boleiros de Plantão",
      shield: "dark-red",
      membersCount: 41,
      userPoints: 750,
      userRank: 8,
      createdBy: "Rafael S.",
      createdDate: "12/05/2026",
      type: "Público",
      isMember: true
    },
    {
      id: "churras-fds",
      name: "Churrasco de Fim de Semana",
      shield: "blue",
      membersCount: 15,
      userPoints: 0,
      userRank: 15,
      createdBy: "Pedro H.",
      createdDate: "02/06/2026",
      type: "Privado",
      isMember: false
    },
    {
      id: "copa-lovers",
      name: "Copa Lovers 2026",
      shield: "green",
      membersCount: 94,
      userPoints: 0,
      userRank: 80,
      createdBy: "Juliana M.",
      createdDate: "20/04/2026",
      type: "Público",
      isMember: false
    }
  ],
  rankingDestaques: [
    { name: "Rafael S.", points: 1280, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", zicas: 2, pos: "1º" },
    { name: "Juliana M.", points: 1150, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", zicas: 1, pos: "2º" },
    { name: "O Vidente", points: 1070, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", zicas: 0, pos: "3º", isYou: true },
    { name: "Lucas C.", points: 950, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", zicas: 0, pos: "4º" },
    { name: "Amanda R.", points: 880, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", zicas: 0, pos: "5º" },
    { name: "Thiago G.", points: 790, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80", zicas: 1, pos: "6º" },
    { name: "Beatriz L.", points: 650, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80", zicas: 0, pos: "7º" },
    { name: "Felipe A.", points: 610, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80", zicas: 2, pos: "8º" }
  ],
  topZicas: [
    { name: "Pedro H.", zicas: 3, pos: "1º" },
    { name: "Rafael S.", zicas: 2, pos: "2º" },
    { name: "Thiago G.", zicas: 2, pos: "3º" }
  ],
  matches: [
    {
      id: "match-1",
      dateStr: "12/06 - 20:00",
      stadium: "MetLife Stadium",
      phase: "grupo",
      homeTeam: { name: "EUA", flag: "🇺🇸" },
      awayTeam: { name: "CANADÁ", flag: "🇨🇦" },
      userGuess: { home: 2, away: 1 }
    },
    {
      id: "match-2",
      dateStr: "13/06 - 18:00",
      stadium: "AT&T Stadium",
      phase: "grupo",
      homeTeam: { name: "MÉXICO", flag: "🇲🇽" },
      awayTeam: { name: "IRÃ", flag: "🇮🇷" },
      userGuess: null
    },
    {
      id: "match-3",
      dateStr: "14/06 - 16:00",
      stadium: "Hard Rock Stadium",
      phase: "grupo",
      homeTeam: { name: "BRASIL", flag: "🇧🇷" },
      awayTeam: { name: "MARROCOS", flag: "🇲🇦" },
      userGuess: null
    },
    {
      id: "match-4",
      dateStr: "18/06 - 21:00",
      stadium: "SoFi Stadium",
      phase: "grupo",
      homeTeam: { name: "EUA", flag: "🇺🇸" },
      awayTeam: { name: "MÉXICO", flag: "🇲🇽" },
      userGuess: null
    },
    {
      id: "match-5",
      dateStr: "22/06 - 19:00",
      stadium: "BC Place",
      phase: "grupo",
      homeTeam: { name: "CANADÁ", flag: "🇨🇦" },
      awayTeam: { name: "IRÃ", flag: "🇮🇷" },
      userGuess: null
    }
  ],
  chatMessages: [
    { sender: "Rafael S.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", time: "Hoje 10:30", text: "Confio no México hoje! 2x0 🇲🇽", isOwn: false },
    { sender: "Juliana M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", time: "Hoje 10:31", text: "EUA vai atropelar! 3x1 🇺🇸", isOwn: false },
    { sender: "O Vidente", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", time: "Hoje 10:32", text: "Pegue leve, Juliana! 😂", isOwn: true },
    { sender: "Pedro H.", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80", time: "Hoje 10:33", text: "Alguém aí usando a zica hoje? 👀", isOwn: false }
  ],
  zicaTarget: null,
  activePoolTab: "my",
  activePoolDetailsSubtab: "ranking",
  activeMatchesFilter: "todos",
  selectedMatchIdForGuess: null
};

// ==========================================
// 2. SPA Routing Logic
// ==========================================

function navigateTo(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  // Show selected page
  const activePage = document.getElementById(`page-${pageId}`);
  if (activePage) {
    activePage.classList.add('active');
  }

  // Update navigation items active state
  const navItems = document.querySelectorAll('.nav-links li');
  navItems.forEach(item => item.classList.remove('active'));
  
  const activeNav = document.getElementById(`nav-${pageId}`);
  if (activeNav) {
    activeNav.classList.add('active');
  } else if (pageId === 'detalhes') {
    // If details page, also highlight ranking or Bolões depending on design
    document.getElementById('nav-ranking').classList.add('active');
  }

  // Close dropdown if open
  document.getElementById('userDropdown').classList.remove('show');

  // Trigger view renderers
  if (pageId === 'home') {
    renderMyPoolsRow();
    renderDashboardRanking();
  } else if (pageId === 'boloes') {
    renderPoolsGrid();
  } else if (pageId === 'detalhes') {
    renderDetailRanking();
    renderDetailTopZicas();
  } else if (pageId === 'jogos') {
    renderMatchesList();
  } else if (pageId === 'resenha') {
    renderChatFeed();
    scrollChatToBottom();
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// ==========================================
// 3. Next Match Countdown Ticker
// ==========================================

function startCountdown() {
  const targetDate = new Date("2026-06-12T20:00:00").getTime();
  
  function updateTicker() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      document.getElementById('countdownTimer').innerHTML = "<div class='text-green' style='font-weight: 800; font-size: 1.1rem;'>JOGO EM ANDAMENTO</div>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('timer-days').innerText = String(days).padStart(2, '0');
    document.getElementById('timer-hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('timer-mins').innerText = String(minutes).padStart(2, '0');
    document.getElementById('timer-secs').innerText = String(seconds).padStart(2, '0');
  }

  updateTicker(); // initial call
  const timerInterval = setInterval(updateTicker, 1000);
}

// ==========================================
// 4. Render UI Lists & Elements
// ==========================================

// Dashboard: Meus Bolões Row
function renderMyPoolsRow() {
  const container = document.getElementById('myPoolsRow');
  if (!container) return;

  const myPools = STATE.pools.filter(p => p.isMember);
  
  container.innerHTML = myPools.map(pool => `
    <div class="pool-card" onclick="loadPoolDetails('${pool.id}')">
      <div class="pool-card-header">
        <div class="pool-shield ${pool.shield}">
          <i class="fa-solid fa-shield"></i>
        </div>
        <div class="pool-info">
          <span class="pool-name">${pool.name}</span>
          <span class="pool-members-count">${pool.membersCount} participantes</span>
        </div>
      </div>
      <div class="pool-card-stats">
        <div>
          <div class="pool-stat-label">Meus Pontos</div>
          <div class="pool-stat-value">${pool.userPoints} pts</div>
        </div>
        <div style="text-align: right;">
          <div class="pool-stat-label">Posição</div>
          <div class="pool-stat-value text-green">${pool.userRank}º</div>
        </div>
      </div>
      <div class="pool-card-action">Ver Bolão</div>
    </div>
  `).join('');
}

// Dashboard: Top 5 Highlights (Round ranking)
function renderDashboardRanking() {
  const container = document.getElementById('dashboardRanking');
  if (!container) return;

  const top5 = STATE.rankingDestaques.slice(0, 5);

  container.innerHTML = top5.map(user => `
    <div class="ranking-card-mini ${user.isYou ? 'highlighted' : ''}">
      <div class="rank-member-details">
        <span class="rank-position">${user.pos}</span>
        <img class="rank-avatar" src="${user.avatar}" alt="${user.name}">
        <div class="rank-name-col">
          <span class="rank-name">${user.name}</span>
          ${user.isYou ? '<span class="rank-tag-you">Você</span>' : ''}
        </div>
      </div>
      <span class="rank-score">${user.points} pts</span>
    </div>
  `).join('');
}

// Bolões: Grid list page
function renderPoolsGrid() {
  const container = document.getElementById('poolsGrid');
  if (!container) return;

  let poolsToShow = STATE.pools;
  
  if (STATE.activePoolTab === 'my') {
    poolsToShow = STATE.pools.filter(p => p.isMember);
  }

  container.innerHTML = poolsToShow.map(pool => `
    <div class="pool-card" onclick="loadPoolDetails('${pool.id}')">
      <div class="pool-card-header">
        <div class="pool-shield ${pool.shield}">
          <i class="fa-solid fa-shield"></i>
        </div>
        <div class="pool-info">
          <span class="pool-name">${pool.name}</span>
          <span class="pool-members-count">${pool.membersCount} participantes</span>
        </div>
      </div>
      
      ${pool.isMember ? `
        <div class="pool-card-stats">
          <div>
            <div class="pool-stat-label">Meus Pontos</div>
            <div class="pool-stat-value">${pool.userPoints} pts</div>
          </div>
          <div style="text-align: right;">
            <div class="pool-stat-label">Posição</div>
            <div class="pool-stat-value text-green">${pool.userRank}º</div>
          </div>
        </div>
      ` : `
        <div class="pool-card-stats" style="justify-content: center; padding: 14px;">
          <button class="btn btn-outline-green btn-sm" style="width: 100%; border-radius: 6px;" onclick="joinPool(event, '${pool.id}')">Participar</button>
        </div>
      `}
      <div class="pool-card-action">Ver Bolão</div>
    </div>
  `).join('');
}

// Bolões Tab toggler
function switchPoolTab(tab) {
  STATE.activePoolTab = tab;
  document.getElementById('tab-my-pools').classList.toggle('active', tab === 'my');
  document.getElementById('tab-all-pools').classList.toggle('active', tab === 'all');
  renderPoolsGrid();
}

// Detail page loader
function loadPoolDetails(poolId) {
  const pool = STATE.pools.find(p => p.id === poolId);
  if (!pool) return;
  
  if (!pool.isMember) {
    showToast(`Entre no bolão ${pool.name} primeiro!`, 'warning');
    return;
  }

  // Update Detail UI texts
  document.getElementById('detailPoolName').innerText = pool.name;
  document.getElementById('detailPoolMembersCount').innerText = pool.membersCount;
  document.getElementById('detailPoolCreator').innerText = pool.createdBy;
  document.getElementById('detailPoolDate').innerText = pool.createdDate;
  
  const shield = document.getElementById('detailPoolShield');
  shield.className = `pool-detail-shield`;
  shield.style.backgroundColor = pool.shield === 'green' ? '#10B981' : 
                                 pool.shield === 'red' ? '#EF4444' : 
                                 pool.shield === 'blue' ? '#2563EB' : '#991B1B';

  navigateTo('detalhes');
}

// Pool ranking table details
function renderDetailRanking() {
  const tbody = document.getElementById('detailRankingBody');
  if (!tbody) return;

  tbody.innerHTML = STATE.rankingDestaques.map(user => `
    <tr class="${user.isYou ? 'highlighted-row' : ''}">
      <td class="table-pos">${user.pos}</td>
      <td>
        <div class="table-user-cell">
          <img class="table-avatar" src="${user.avatar}" alt="${user.name}">
          <span class="table-user-name">${user.name}</span>
        </div>
      </td>
      <td>${user.points}</td>
      <td class="text-gold" style="font-weight: 700;"><i class="fa-solid fa-bolt"></i> ${user.zicas}</td>
    </tr>
  `).join('');
}

// Pool sidebar: Top Zicas
function renderDetailTopZicas() {
  const container = document.getElementById('detailTopZicas');
  if (!container) return;

  container.innerHTML = STATE.topZicas.map(zica => `
    <div class="top-zica-row">
      <div class="zica-profile">
        <span class="zica-pos">${zica.pos}</span>
        <span class="zica-name">${zica.name}</span>
      </div>
      <span class="zica-count"><i class="fa-solid fa-bolt"></i> ${zica.zicas}</span>
    </div>
  `).join('');
}

// Detail Sub-tabs controller
function switchDetailSubtab(tab) {
  STATE.activePoolDetailsSubtab = tab;
  const subtabs = document.querySelectorAll('.subtab-item');
  subtabs.forEach(item => {
    item.classList.toggle('active', item.innerText.toLowerCase() === tab);
  });
  showToast(`Aba ${tab.toUpperCase()} visualizada`, 'success');
}

// Jogos: Matches view
function renderMatchesList() {
  const container = document.getElementById('matchesList');
  if (!container) return;

  let filtered = STATE.matches;
  if (STATE.activeMatchesFilter !== 'todos') {
    filtered = STATE.matches.filter(m => m.phase === STATE.activeMatchesFilter);
  }

  container.innerHTML = filtered.map(match => {
    const hasGuess = match.userGuess !== null;
    return `
      <div class="match-row-item">
        <!-- Date and Location -->
        <div class="match-row-meta">
          <span class="match-time-date">${match.dateStr}</span>
          <span class="match-stadium">${match.stadium}</span>
        </div>

        <!-- Teams VS -->
        <div class="match-confrontation">
          <div class="match-row-team team-home">
            <span class="match-row-team-name">${match.homeTeam.name}</span>
            <span style="font-size: 1.7rem;">${match.homeTeam.flag}</span>
          </div>
          
          <div class="match-vs-middle">
            <div class="score-box-display">${hasGuess ? match.userGuess.home : '-'}</div>
            <span class="score-vs-text">X</span>
            <div class="score-box-display">${hasGuess ? match.userGuess.away : '-'}</div>
          </div>
          
          <div class="match-row-team team-away">
            <span style="font-size: 1.7rem;">${match.awayTeam.flag}</span>
            <span class="match-row-team-name">${match.awayTeam.name}</span>
          </div>
        </div>

        <!-- Button or Prediction feedback -->
        <div class="match-action-col">
          ${hasGuess ? `
            <div class="guess-summary" style="cursor: pointer;" onclick="openGuessModal('${match.id}')">
              <span class="guess-summary-label"><i class="fa-solid fa-pen"></i> Palpite Salvo</span>
              <span class="guess-summary-score">${match.userGuess.home} x ${match.userGuess.away}</span>
            </div>
          ` : `
            <button class="btn btn-outline-green btn-sm" onclick="openGuessModal('${match.id}')">Fazer Palpite</button>
          `}
        </div>
      </div>
    `;
  }).join('');
}

// Filters for matches list
function filterMatches(phase) {
  STATE.activeMatchesFilter = phase;
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    const label = pill.innerText.toLowerCase();
    const isActive = (phase === 'todos' && label === 'todos') ||
                     (phase === 'grupo' && label.includes('grupos')) ||
                     (phase === 'oitavas' && label === 'oitavas') ||
                     (phase === 'quartas' && label === 'quartas') ||
                     (phase === 'semi' && label === 'semi') ||
                     (phase === 'final' && label === 'final');
    pill.classList.toggle('active', isActive);
  });
  renderMatchesList();
}

// Chat: Resenha Feed renderer
function renderChatFeed() {
  const container = document.getElementById('chatFeed');
  if (!container) return;

  container.innerHTML = STATE.chatMessages.map(msg => `
    <div class="chat-message-item ${msg.isOwn ? 'own-message' : ''}">
      <img class="chat-msg-avatar" src="${msg.avatar}" alt="${msg.sender}">
      <div class="chat-msg-body">
        <div class="chat-msg-meta">
          <span class="chat-msg-sender">${msg.sender}</span>
          <span class="chat-msg-time">${msg.time}</span>
        </div>
        <div class="chat-msg-content-box">${msg.text}</div>
      </div>
    </div>
  `).join('');
}

// Chat scroll helper
function scrollChatToBottom() {
  const container = document.getElementById('chatFeed');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

// ==========================================
// 5. Interactive Guess Modal Logic
// ==========================================

let currentGuessState = { home: 0, away: 0 };

function openGuessModal(matchId) {
  const match = STATE.matches.find(m => m.id === matchId);
  if (!match) return;

  STATE.selectedMatchIdForGuess = matchId;
  currentGuessState = match.userGuess ? { ...match.userGuess } : { home: 0, away: 0 };

  // Set modal details
  document.getElementById('guessModalMeta').innerText = `${match.dateStr} • ${match.stadium}`;
  document.getElementById('guessModalHomeFlag').innerText = match.homeTeam.flag;
  document.getElementById('guessModalHomeName').innerText = match.homeTeam.name;
  document.getElementById('guessModalAwayFlag').innerText = match.awayTeam.flag;
  document.getElementById('guessModalAwayName').innerText = match.awayTeam.name;
  
  // Set quick selector texts
  document.getElementById('outcome-win-home').innerText = `Vitória ${match.homeTeam.name}`;
  document.getElementById('outcome-win-away').innerText = `Vitória ${match.awayTeam.name}`;

  updateGuessModalDisplay();
  
  document.getElementById('guessModal').classList.add('active');
}

function closeGuessModal() {
  document.getElementById('guessModal').classList.remove('active');
  STATE.selectedMatchIdForGuess = null;
}

function adjustScore(side, amount) {
  if (side === 'home') {
    currentGuessState.home = Math.max(0, currentGuessState.home + amount);
  } else {
    currentGuessState.away = Math.max(0, currentGuessState.away + amount);
  }
  updateGuessModalDisplay();
}

function setQuickOutcome(outcome) {
  if (outcome === 'win-home') {
    currentGuessState = { home: 2, away: 1 };
  } else if (outcome === 'draw') {
    currentGuessState = { home: 1, away: 1 };
  } else if (outcome === 'win-away') {
    currentGuessState = { home: 1, away: 2 };
  }
  updateGuessModalDisplay();
}

function updateGuessModalDisplay() {
  document.getElementById('guessHomeScore').innerText = currentGuessState.home;
  document.getElementById('guessAwayScore').innerText = currentGuessState.away;

  // Toggle active styling on outcome buttons
  const isWinHome = currentGuessState.home > currentGuessState.away;
  const isDraw = currentGuessState.home === currentGuessState.away;
  const isWinAway = currentGuessState.home < currentGuessState.away;

  document.getElementById('outcome-win-home').classList.toggle('active', isWinHome);
  document.getElementById('outcome-draw').classList.toggle('active', isDraw);
  document.getElementById('outcome-win-away').classList.toggle('active', isWinAway);
}

function saveGuess() {
  const matchId = STATE.selectedMatchIdForGuess;
  const match = STATE.matches.find(m => m.id === matchId);
  if (!match) return;

  match.userGuess = { ...currentGuessState };
  closeGuessModal();
  renderMatchesList();
  showToast("Palpite salvo com sucesso!", "success");
}

// ==========================================
// 6. Create Pool Modal Logic
// ==========================================

function openCreatePoolModal() {
  // Config selection visual feedback setup
  const radioButtons = document.getElementsByName('poolShieldSelect');
  radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
      // Clear all borders
      document.querySelectorAll('[id^="shieldOpt-"]').forEach(span => {
        span.style.borderColor = 'transparent';
        span.style.boxShadow = 'none';
      });
      // Highlight selected
      const selectedSpan = document.getElementById(`shieldOpt-${this.value}`);
      selectedSpan.style.borderColor = '#10B981';
      selectedSpan.style.boxShadow = '0 0 10px rgba(16,185,129,0.5)';
    });
  });
  
  // Set initial check visual border
  document.getElementById('shieldOpt-green').style.borderColor = '#10B981';
  document.getElementById('shieldOpt-green').style.boxShadow = '0 0 10px rgba(16,185,129,0.5)';

  document.getElementById('createPoolModal').classList.add('active');
}

function closeCreatePoolModal() {
  document.getElementById('createPoolModal').classList.remove('active');
  // Clear inputs
  document.getElementById('poolNameInput').value = '';
  document.getElementById('poolDescription').value = '';
}

function submitCreatePool() {
  const name = document.getElementById('poolNameInput').value.trim();
  const desc = document.getElementById('poolDescription').value.trim();
  const shieldColor = document.querySelector('input[name="poolShieldSelect"]:checked').value;

  if (!name) {
    showToast("Por favor, insira o nome do bolão!", "warning");
    return;
  }

  const newId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const newPool = {
    id: newId,
    name: name,
    shield: shieldColor,
    membersCount: 1, // You are the only one initially
    userPoints: 1070, // Start with your current points
    userRank: 1,
    createdBy: "O Vidente",
    createdDate: new Date().toLocaleDateString('pt-BR'),
    type: "Público",
    isMember: true
  };

  STATE.pools.unshift(newPool);
  closeCreatePoolModal();
  renderMyPoolsRow();
  renderPoolsGrid();
  showToast(`Bolão "${name}" criado! Chame seus amigos.`, "success");
}

// Helper: Join pool from Todos os Bolões
function joinPool(event, poolId) {
  event.stopPropagation();
  const pool = STATE.pools.find(p => p.id === poolId);
  if (!pool) return;

  pool.isMember = true;
  pool.membersCount += 1;
  pool.userPoints = STATE.currentUser.points;
  pool.userRank = pool.membersCount; // start at last place

  renderPoolsGrid();
  renderMyPoolsRow();
  showToast(`Você entrou no bolão "${pool.name}"!`, "success");
}

function confirmLeavePool() {
  if (confirm("Deseja realmente sair deste bolão? Seus pontos serão limpos nesta liga.")) {
    // Leave Resenha FC mock
    const pool = STATE.pools.find(p => p.id === 'resenha-fc');
    if (pool) {
      pool.isMember = false;
      pool.membersCount -= 1;
    }
    navigateTo('boloes');
    showToast("Você saiu do bolão.", "warning");
  }
}

// ==========================================
// 7. Modo Zica Modal Logic
// ==========================================

function openZicaModal() {
  const container = document.getElementById('zicaFriendsList');
  if (!container) return;

  // List friends (everyone in highlights except the user)
  const friends = STATE.rankingDestaques.filter(u => !u.isYou);

  container.innerHTML = friends.map(friend => `
    <div class="zica-select-item" id="zicaFriend-${friend.name.replace(/\s+/g, '')}" onclick="selectZicaFriend('${friend.name}')">
      <div class="friend-profile">
        <img class="friend-avatar" src="${friend.avatar}" alt="${friend.name}">
        <span class="friend-name">${friend.name}</span>
      </div>
      <span class="friend-guess-tag">Palpite: 2 x 1</span>
    </div>
  `).join('');

  document.getElementById('activateZicaBtn').disabled = true;
  STATE.zicaTarget = null;
  
  document.getElementById('zicaModal').classList.add('active');
}

function closeZicaModal() {
  document.getElementById('zicaModal').classList.remove('active');
  STATE.zicaTarget = null;
}

function selectZicaFriend(friendName) {
  // Clear other selections visual class
  document.querySelectorAll('.zica-select-item').forEach(item => {
    item.classList.remove('selected');
  });

  const itemId = `zicaFriend-${friendName.replace(/\s+/g, '')}`;
  const element = document.getElementById(itemId);
  if (element) {
    element.classList.add('selected');
  }

  STATE.zicaTarget = friendName;
  document.getElementById('activateZicaBtn').disabled = false;
}

function activateZica() {
  if (!STATE.zicaTarget) return;

  // Increment zica for selected target in ranking list
  const targetUser = STATE.rankingDestaques.find(u => u.name === STATE.zicaTarget);
  if (targetUser) {
    targetUser.zicas += 1;
  }
  
  // Also increment in sidebar top zicas list if they are in there, or add them
  const sidebarUser = STATE.topZicas.find(z => z.name === STATE.zicaTarget);
  if (sidebarUser) {
    sidebarUser.zicas += 1;
  } else {
    STATE.topZicas.push({ name: STATE.zicaTarget, zicas: 1, pos: `${STATE.topZicas.length + 1}º` });
  }

  // Sort top zicas list
  STATE.topZicas.sort((a, b) => b.zicas - a.zicas);
  STATE.topZicas.forEach((z, index) => {
    z.pos = `${index + 1}º`;
  });

  const target = STATE.zicaTarget;
  closeZicaModal();
  
  // Visual feedbacks
  showToast(`Zica ativada contra ${target}! ⚡`, "warning");
  
  // Re-render
  renderDetailRanking();
  renderDetailTopZicas();
}

// ==========================================
// 8. Chat & Resenha Sending Logic
// ==========================================

function sendChatMessage(event) {
  event.preventDefault();
  const input = document.getElementById('chatInput');
  const text = input.value.trim();

  if (!text) return;

  const newMsg = {
    sender: STATE.currentUser.name,
    avatar: STATE.currentUser.avatar,
    time: "Hoje " + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    text: text,
    isOwn: true
  };

  STATE.chatMessages.push(newMsg);
  input.value = '';
  renderChatFeed();
  scrollChatToBottom();
}

// ==========================================
// 9. Toast Notifications & Menus
// ==========================================

let toastTimeout;
function showToast(message, type = "success") {
  const toast = document.getElementById('toastNotification');
  const icon = document.getElementById('toastIcon');
  const text = document.getElementById('toastText');

  text.innerText = message;
  
  // Set icons classes
  if (type === 'success') {
    toast.style.borderLeftColor = 'var(--color-primary)';
    icon.className = "toast-icon success fa-solid fa-circle-check";
  } else if (type === 'warning') {
    toast.style.borderLeftColor = 'var(--color-gold)';
    icon.className = "toast-icon warning fa-solid fa-triangle-exclamation";
  }

  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function toggleUserMenu() {
  document.getElementById('userDropdown').classList.toggle('show');
}

function toggleNotifications() {
  showToast("Você não possui novas notificações", "success");
}

function copyInviteCode() {
  navigator.clipboard.writeText("#RESENHA26");
  showToast("Código de convite copiado!", "success");
}

// Close dropdowns on outside clicks
window.onclick = function(event) {
  if (!event.target.closest('.user-profile-menu') && !event.target.closest('.user-dropdown')) {
    document.getElementById('userDropdown').classList.remove('show');
  }
}

// ==========================================
// 10. Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Start countdown to match
  startCountdown();

  // Render initial dashboards
  renderMyPoolsRow();
  renderDashboardRanking();
});
