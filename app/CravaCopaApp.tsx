"use client";

import React, { useState, useEffect, useRef } from "react";

interface Todo {
  id: number | string;
  name: string;
}

interface CravaCopaAppProps {
  initialTodos: Todo[];
}

export default function CravaCopaApp({ initialTodos }: CravaCopaAppProps) {
  // Navigation & Menus
  const [activePage, setActivePage] = useState("home");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activePoolTab, setActivePoolTab] = useState<"my" | "all">("my");
  const [activeDetailSubtab, setActiveDetailSubtab] = useState("ranking");
  const [activeMatchesFilter, setActiveMatchesFilter] = useState("todos");

  // Database States
  const [pools, setPools] = useState([
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
  ]);

  const [rankingDestaques, setRankingDestaques] = useState([
    { name: "Rafael S.", points: 1280, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", zicas: 2, pos: "1º" },
    { name: "Juliana M.", points: 1150, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", zicas: 1, pos: "2º" },
    { name: "O Vidente", points: 1070, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", zicas: 0, pos: "3º", isYou: true },
    { name: "Lucas C.", points: 950, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", zicas: 0, pos: "4º" },
    { name: "Amanda R.", points: 880, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", zicas: 0, pos: "5º" },
    { name: "Thiago G.", points: 790, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80", zicas: 1, pos: "6º" },
    { name: "Beatriz L.", points: 650, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80", zicas: 0, pos: "7º" },
    { name: "Felipe A.", points: 610, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80", zicas: 2, pos: "8º" }
  ]);

  const [topZicas, setTopZicas] = useState([
    { name: "Pedro H.", zicas: 3, pos: "1º" },
    { name: "Rafael S.", zicas: 2, pos: "2º" },
    { name: "Thiago G.", zicas: 2, pos: "3º" }
  ]);

  const [matches, setMatches] = useState([
    {
      id: "match-1",
      dateStr: "12/06 - 20:00",
      stadium: "MetLife Stadium",
      phase: "grupo",
      homeTeam: { name: "EUA", flag: "🇺🇸" },
      awayTeam: { name: "CANADÁ", flag: "🇨🇦" },
      userGuess: { home: 2, away: 1 } as { home: number; away: number } | null
    },
    {
      id: "match-2",
      dateStr: "13/06 - 18:00",
      stadium: "AT&T Stadium",
      phase: "grupo",
      homeTeam: { name: "MÉXICO", flag: "🇲🇽" },
      awayTeam: { name: "IRÃ", flag: "🇮🇷" },
      userGuess: null as { home: number; away: number } | null
    },
    {
      id: "match-3",
      dateStr: "14/06 - 16:00",
      stadium: "Hard Rock Stadium",
      phase: "grupo",
      homeTeam: { name: "BRASIL", flag: "🇧🇷" },
      awayTeam: { name: "MARROCOS", flag: "🇲🇦" },
      userGuess: null as { home: number; away: number } | null
    },
    {
      id: "match-4",
      dateStr: "18/06 - 21:00",
      stadium: "SoFi Stadium",
      phase: "grupo",
      homeTeam: { name: "EUA", flag: "🇺🇸" },
      awayTeam: { name: "MÉXICO", flag: "🇲🇽" },
      userGuess: null as { home: number; away: number } | null
    },
    {
      id: "match-5",
      dateStr: "22/06 - 19:00",
      stadium: "BC Place",
      phase: "grupo",
      homeTeam: { name: "CANADÁ", flag: "🇨🇦" },
      awayTeam: { name: "IRÃ", flag: "🇮🇷" },
      userGuess: null as { home: number; away: number } | null
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { sender: "Rafael S.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", time: "Hoje 10:30", text: "Confio no México hoje! 2x0 🇲🇽", isOwn: false },
    { sender: "Juliana M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", time: "Hoje 10:31", text: "EUA vai atropelar! 3x1 🇺🇸", isOwn: false },
    { sender: "O Vidente", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", time: "Hoje 10:32", text: "Pegue leve, Juliana! 😂", isOwn: true },
    { sender: "Pedro H.", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80", time: "Hoje 10:33", text: "Alguém aí usando a zica hoje? 👀", isOwn: false }
  ]);

  // Selected Active Pool state for "Resenha FC"
  const [selectedPoolId, setSelectedPoolId] = useState("resenha-fc");

  // Countdown Ticker State
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 10, minutes: 18, seconds: 45 });

  // Modals Open State
  const [guessModalOpen, setGuessModalOpen] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [tempHomeScore, setTempHomeScore] = useState(0);
  const [tempAwayScore, setTempAwayScore] = useState(0);

  const [createPoolOpen, setCreatePoolOpen] = useState(false);
  const [newPoolName, setNewPoolName] = useState("");
  const [newPoolDesc, setNewPoolDesc] = useState("");
  const [newPoolShield, setNewPoolShield] = useState("green");

  const [zicaOpen, setZicaOpen] = useState(false);
  const [selectedZicaTarget, setSelectedZicaTarget] = useState<string | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{ show: boolean; text: string; type: "success" | "warning" }>({
    show: false,
    text: "",
    type: "success"
  });

  // Chat Refs
  const chatFeedRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState("");

  // ==========================================
  // Timer Countdown Effect
  // ==========================================
  useEffect(() => {
    const targetDate = new Date("2026-06-12T20:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Toast auto-hide
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Scroll chat down on new message or chat page load
  useEffect(() => {
    if (activePage === "resenha" && chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [activePage, chatMessages]);

  // ==========================================
  // Actions
  // ==========================================
  const triggerToast = (text: string, type: "success" | "warning" = "success") => {
    setToast({ show: true, text, type });
  };

  const navigateTo = (pageId: string) => {
    setActivePage(pageId);
    setUserDropdownOpen(false);
  };

  const handleJoinPool = (e: React.MouseEvent, poolId: string) => {
    e.stopPropagation();
    setPools(prev => prev.map(p => {
      if (p.id === poolId) {
        return { ...p, isMember: true, membersCount: p.membersCount + 1, userPoints: 1070, userRank: p.membersCount + 1 };
      }
      return p;
    }));
    triggerToast("Você entrou no bolão!", "success");
  };

  const handleLeavePool = () => {
    if (confirm("Deseja realmente sair deste bolão? Seus pontos serão limpos nesta liga.")) {
      setPools(prev => prev.map(p => {
        if (p.id === "resenha-fc") {
          return { ...p, isMember: false, membersCount: p.membersCount - 1 };
        }
        return p;
      }));
      navigateTo("boloes");
      triggerToast("Você saiu do bolão.", "warning");
    }
  };

  // Guess Modal controllers
  const handleOpenGuessModal = (matchId: string) => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;
    setSelectedMatchId(matchId);
    setTempHomeScore(match.userGuess ? match.userGuess.home : 0);
    setTempAwayScore(match.userGuess ? match.userGuess.away : 0);
    setGuessModalOpen(true);
  };

  const handleSaveGuess = () => {
    if (!selectedMatchId) return;
    setMatches(prev => prev.map(m => {
      if (m.id === selectedMatchId) {
        return { ...m, userGuess: { home: tempHomeScore, away: tempAwayScore } };
      }
      return m;
    }));
    setGuessModalOpen(false);
    triggerToast("Palpite salvo com sucesso!", "success");
  };

  const handleQuickOutcome = (outcome: "win-home" | "draw" | "win-away") => {
    if (outcome === "win-home") {
      setTempHomeScore(2);
      setTempAwayScore(1);
    } else if (outcome === "draw") {
      setTempHomeScore(1);
      setTempAwayScore(1);
    } else if (outcome === "win-away") {
      setTempHomeScore(1);
      setTempAwayScore(2);
    }
  };

  // Pool Creator
  const handleCreatePool = () => {
    if (!newPoolName.trim()) {
      triggerToast("Por favor, insira o nome do bolão!", "warning");
      return;
    }

    const newId = newPoolName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newPoolObj = {
      id: newId,
      name: newPoolName,
      shield: newPoolShield,
      membersCount: 1,
      userPoints: 1070,
      userRank: 1,
      createdBy: "O Vidente",
      createdDate: new Date().toLocaleDateString("pt-BR"),
      type: "Público",
      isMember: true
    };

    setPools([newPoolObj, ...pools]);
    setCreatePoolOpen(false);
    setNewPoolName("");
    setNewPoolDesc("");
    triggerToast(`Bolão "${newPoolName}" criado! Chame seus amigos.`, "success");
  };

  // Zica Mode
  const handleActivateZica = () => {
    if (!selectedZicaTarget) return;

    // Increment in list
    setRankingDestaques(prev => prev.map(u => {
      if (u.name === selectedZicaTarget) {
        return { ...u, zicas: u.zicas + 1 };
      }
      return u;
    }));

    // Update Top Zicas list
    setTopZicas(prev => {
      const exists = prev.find(z => z.name === selectedZicaTarget);
      let updatedList = [...prev];
      if (exists) {
        updatedList = prev.map(z => z.name === selectedZicaTarget ? { ...z, zicas: z.zicas + 1 } : z);
      } else {
        updatedList.push({ name: selectedZicaTarget, zicas: 1, pos: "" });
      }
      updatedList.sort((a, b) => b.zicas - a.zicas);
      return updatedList.map((z, idx) => ({ ...z, pos: `${idx + 1}º` }));
    });

    const target = selectedZicaTarget;
    setZicaOpen(false);
    setSelectedZicaTarget(null);
    triggerToast(`Zica ativada contra ${target}! ⚡`, "warning");
  };

  // Chat message send
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      sender: "O Vidente",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      time: "Hoje " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      text: chatInput,
      isOwn: true
    };

    setChatMessages([...chatMessages, newMsg]);
    setChatInput("");
  };

  const handleCopyInvite = () => {
    navigator.clipboard.writeText("#RESENHA26");
    triggerToast("Código de convite copiado!", "success");
  };

  // Filter pools list
  const activePoolsList = activePoolTab === "my" ? pools.filter(p => p.isMember) : pools;

  // Filter matches list
  const filteredMatches = activeMatchesFilter === "todos" ? matches : matches.filter(m => m.phase === activeMatchesFilter);

  // Active pool for Detail screen
  const activeDetailPool = pools.find(p => p.id === selectedPoolId) || pools[0];

  return (
    <div className="app-container">
      {/* 2. Cabeçalho Global (Header) */}
      <header className="header-global">
        <div className="header-inner">
          <a href="#" className="logo" onClick={() => navigateTo("home")}>
            <i className="fa-solid fa-trophy"></i>
            <span>CRAVA<span className="copa">COPA</span></span>
          </a>

          <nav>
            <ul className="nav-links">
              <li id="nav-home" className={activePage === "home" ? "active" : ""}>
                <a href="#" onClick={() => navigateTo("home")}>
                  <i className="fa-solid fa-house mobile-only"></i>
                  <span>Início</span>
                </a>
              </li>
              <li id="nav-boloes" className={activePage === "boloes" ? "active" : ""}>
                <a href="#" onClick={() => navigateTo("boloes")}>
                  <i className="fa-solid fa-users mobile-only"></i>
                  <span>Bolões</span>
                </a>
              </li>
              <li id="nav-jogos" className={activePage === "jogos" ? "active" : ""}>
                <a href="#" onClick={() => navigateTo("jogos")}>
                  <i className="fa-solid fa-circle-play mobile-only"></i>
                  <span>Jogos</span>
                </a>
              </li>
              <li id="nav-ranking" className={activePage === "detalhes" ? "active" : ""}>
                <a href="#" onClick={() => navigateTo("detalhes")}>
                  <i className="fa-solid fa-ranking-star mobile-only"></i>
                  <span>Ranking</span>
                </a>
              </li>
              <li id="nav-resenha" className={activePage === "resenha" ? "active" : ""}>
                <a href="#" onClick={() => navigateTo("resenha")}>
                  <i className="fa-solid fa-comments mobile-only"></i>
                  <span>Resenha</span>
                </a>
              </li>
              <li id="nav-premios" className={activePage === "premios" ? "active" : ""}>
                <a href="#" onClick={() => navigateTo("premios")}>
                  <i className="fa-solid fa-award mobile-only"></i>
                  <span>Prêmios</span>
                </a>
              </li>
              <li id="nav-comofunciona" className={activePage === "comofunciona" ? "active" : ""}>
                <a href="#" onClick={() => navigateTo("comofunciona")}>
                  <i className="fa-solid fa-circle-question mobile-only"></i>
                  <span>Como Funciona</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="header-user-section">
            <div className="notification-bell" onClick={() => triggerToast("Você não possui novas notificações", "success")}>
              <i className="fa-regular fa-bell"></i>
              <span className="bell-badge"></span>
            </div>

            <div className="user-profile-menu" onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
              <img className="user-avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar Usuário" />
              <span className="user-name">O Vidente</span>
              <i className="fa-solid fa-chevron-down dropdown-arrow"></i>
            </div>

            <div className={`user-dropdown ${userDropdownOpen ? "show" : ""}`}>
              <div className="dropdown-item" onClick={() => navigateTo("detalhes")}>
                <i className="fa-solid fa-user"></i> Meu Perfil
              </div>
              <div className="dropdown-item" onClick={() => triggerToast("Configurações salvas!", "success")}>
                <i className="fa-solid fa-gear"></i> Configurações
              </div>
              <div className="dropdown-item text-red" onClick={() => triggerToast("Sessão encerrada", "warning")}>
                <i className="fa-solid fa-right-from-bracket"></i> Sair
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Pages */}
      <main>
        {/* ==============================================
             3. TELA PRINCIPAL (DASHBOARD / HOME)
             ============================================== */}
        {activePage === "home" && (
          <section className="page">
            <div className="dashboard-grid">
              
              {/* Hero Banner Banner */}
              <div className="hero-banner">
                <div className="hero-content">
                  <h1 className="hero-title">A COPA É NOSSA.<br />A RESENHA TAMBÉM!</h1>
                  <p className="hero-subtitle">Monte seu bolão, chame os amigos e crave seus palpites na Copa do Mundo 2026!</p>
                  <div className="hero-actions">
                    <button className="btn btn-primary" onClick={() => setCreatePoolOpen(true)}>Criar Meu Bolão</button>
                    <button className="btn btn-outline" onClick={() => navigateTo("boloes")}>
                      <i className="fa-solid fa-arrow-right-to-bracket"></i> Entrar em um Bolão
                    </button>
                  </div>
                  
                  <div className="hero-tags">
                    <div className="tag-item"><i className="fa-solid fa-circle-check"></i> 100% GRÁTIS</div>
                    <div className="tag-item"><i className="fa-solid fa-circle-check"></i> SEM APOSTAS</div>
                    <div className="tag-item"><i className="fa-solid fa-circle-check"></i> SÓ RESENHA</div>
                    <div className="tag-item"><i className="fa-solid fa-circle-check"></i> RANKING EM TEMPO REAL</div>
                  </div>
                </div>

                {/* Floating NEXT MATCH card */}
                <div className="next-match-card-wrapper">
                  <div className="next-match-card">
                    <div className="next-match-title">Próximo Jogo</div>
                    
                    <div className="match-teams-vs">
                      <div className="team-flag-col">
                        <span className="flag-icon" style={{ fontSize: "2rem" }}>🇺🇸</span>
                        <span>EUA</span>
                      </div>
                      <span className="vs-divider">X</span>
                      <div className="team-flag-col">
                        <span className="flag-icon" style={{ fontSize: "2rem" }}>🇨🇦</span>
                        <span>CANADÁ</span>
                      </div>
                    </div>

                    <div className="match-details-meta">
                      12/06 - 20:00 • MetLife Stadium
                    </div>

                    <div className="countdown-timer">
                      <div className="timer-block">
                        <span className="timer-number">{String(timeLeft.days).padStart(2, "0")}</span>
                        <span className="timer-label">Dias</span>
                      </div>
                      <div className="timer-block">
                        <span className="timer-number">{String(timeLeft.hours).padStart(2, "0")}</span>
                        <span className="timer-label">Horas</span>
                      </div>
                      <div className="timer-block">
                        <span className="timer-number">{String(timeLeft.minutes).padStart(2, "0")}</span>
                        <span className="timer-label">Min</span>
                      </div>
                      <div className="timer-block">
                        <span className="timer-number">{String(timeLeft.seconds).padStart(2, "0")}</span>
                        <span className="timer-label">Seg</span>
                      </div>
                    </div>

                    <button className="btn btn-outline btn-sm" onClick={() => navigateTo("jogos")}>Ver todos os jogos</button>
                  </div>
                </div>
              </div>

              {/* Dashboard Left Column: MEUS BOLÕES & DESTAQUES */}
              <div className="dashboard-left-col">
                <div className="section-header">
                  <h2 className="section-title">Meus Bolões</h2>
                  <a href="#" className="section-link" onClick={() => navigateTo("boloes")}>Ver todos</a>
                </div>

                <div className="pools-horizontal-row">
                  {pools.filter(p => p.isMember).map(pool => (
                    <div key={pool.id} className="pool-card" onClick={() => { setSelectedPoolId(pool.id); navigateTo("detalhes"); }}>
                      <div className="pool-card-header">
                        <div className={`pool-shield ${pool.shield}`}>
                          <i className="fa-solid fa-shield"></i>
                        </div>
                        <div className="pool-info">
                          <span className="pool-name">{pool.name}</span>
                          <span className="pool-members-count">{pool.membersCount} participantes</span>
                        </div>
                      </div>
                      <div className="pool-card-stats">
                        <div>
                          <div className="pool-stat-label">Meus Pontos</div>
                          <div className="pool-stat-value">{pool.userPoints} pts</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div className="pool-stat-label">Posição</div>
                          <div className="pool-stat-value text-green">{pool.userRank}º</div>
                        </div>
                      </div>
                      <div className="pool-card-action">Ver Bolão</div>
                    </div>
                  ))}
                </div>

                <div className="section-header">
                  <h2 className="section-title">Destaques da Rodada</h2>
                </div>

                <div className="top-ranking-row">
                  {rankingDestaques.slice(0, 5).map((user, idx) => (
                    <div key={idx} className={`ranking-card-mini ${user.isYou ? "highlighted" : ""}`}>
                      <div className="rank-member-details">
                        <span className="rank-position">{user.pos}</span>
                        <img className="rank-avatar" src={user.avatar} alt={user.name} />
                        <div className="rank-name-col">
                          <span className="rank-name">{user.name}</span>
                          {user.isYou && <span className="rank-tag-you">Você</span>}
                        </div>
                      </div>
                      <span className="rank-score">{user.points} pts</span>
                    </div>
                  ))}
                </div>

                {/* Supabase Connection Demo Container */}
                <div className="supabase-demo-panel">
                  <div className="supabase-demo-title">
                    <i className="fa-solid fa-database text-green"></i>
                    <span>Tabela de Tarefas (Todos)</span>
                    <span className="supabase-badge">Supabase SSR</span>
                  </div>
                  <p className="text-muted" style={{ fontSize: "0.8rem", marginBottom: "12px" }}>
                    Os dados abaixo são carregados diretamente do seu banco de dados Supabase via Server Component.
                  </p>
                  {initialTodos.length === 0 ? (
                    <div className="text-muted" style={{ fontSize: "0.85rem", padding: "8px" }}>Nenhum todo localizado ou tabela vazia.</div>
                  ) : (
                    <ul className="todos-list">
                      {initialTodos.map(todo => (
                        <li key={todo.id} className="todo-item">
                          <i className="fa-regular fa-square-check"></i>
                          <span>{todo.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Dashboard Right Column: MODO ZICA */}
              <div className="dashboard-right-col">
                <div className="zica-promo-card">
                  <div className="zica-card-header">
                    <div className="zica-icon-container">
                      <i className="fa-solid fa-bolt"></i>
                    </div>
                    <h3 className="zica-card-title">Modo Zica</h3>
                  </div>
                  <p className="zica-card-desc">Detone o palpite de um amigo e ganhe ainda mais vantagem na pontuação geral!</p>
                  <button className="btn btn-gold" onClick={() => setZicaOpen(true)}>
                    <i className="fa-solid fa-shield-halved"></i> Usar Zica
                  </button>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ==============================================
             4. TELA DE BOLÕES (POOLS LIST)
             ============================================== */}
        {activePage === "boloes" && (
          <section className="page">
            <div className="pools-header-row">
              <div className="pools-header-inner">
                <h1 className="pools-page-title">Bolões</h1>
                <p className="text-muted">Participe ou crie seu bolão e chame a galera!</p>
              </div>
              <button className="btn btn-outline-green" onClick={() => setCreatePoolOpen(true)}>
                <i className="fa-solid fa-plus"></i> Criar Novo Bolão
              </button>
            </div>

            <div className="pools-tabs-container">
              <div className={`tab-pill ${activePoolTab === "my" ? "active" : ""}`} onClick={() => setActivePoolTab("my")}>Meus Bolões</div>
              <div className={`tab-pill ${activePoolTab === "all" ? "active" : ""}`} onClick={() => setActivePoolTab("all")}>Todos os Bolões</div>
            </div>

            <div className="pools-grid">
              {activePoolsList.map(pool => (
                <div key={pool.id} className="pool-card" onClick={() => { if (pool.isMember) { setSelectedPoolId(pool.id); navigateTo("detalhes"); } }}>
                  <div className="pool-card-header">
                    <div className={`pool-shield ${pool.shield}`}>
                      <i className="fa-solid fa-shield"></i>
                    </div>
                    <div className="pool-info">
                      <span className="pool-name">{pool.name}</span>
                      <span className="pool-members-count">{pool.membersCount} participantes</span>
                    </div>
                  </div>

                  {pool.isMember ? (
                    <div className="pool-card-stats">
                      <div>
                        <div className="pool-stat-label">Meus Pontos</div>
                        <div className="pool-stat-value">{pool.userPoints} pts</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="pool-stat-label">Posição</div>
                        <div className="pool-stat-value text-green">{pool.userRank}º</div>
                      </div>
                    </div>
                  ) : (
                    <div className="pool-card-stats" style={{ justifyContent: "center", padding: "14px" }}>
                      <button className="btn btn-outline-green btn-sm" style={{ width: "100%", borderRadius: "6px" }} onClick={(e) => handleJoinPool(e, pool.id)}>
                        Participar
                      </button>
                    </div>
                  )}
                  <div className="pool-card-action">Ver Bolão</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==============================================
             5. TELA DE DETALHES DO BOLÃO
             ============================================== */}
        {activePage === "detalhes" && (
          <section className="page">
            <div className="pool-detail-header-panel">
              <div className="pool-detail-header-info">
                <div className={`pool-detail-shield`} style={{
                  backgroundColor: activeDetailPool.shield === "green" ? "#10B981" : 
                                   activeDetailPool.shield === "red" ? "#EF4444" : 
                                   activeDetailPool.shield === "blue" ? "#2563EB" : "#991B1B"
                }}>
                  <i className="fa-solid fa-shield"></i>
                </div>
                <div className="pool-detail-title-col">
                  <h1 className="pool-detail-name">{activeDetailPool.name}</h1>
                  <p className="text-muted">Código de convite: <span className="text-green" style={{ fontFamily: "monospace", fontWeight: "bold", cursor: "pointer" }} onClick={handleCopyInvite}>#RESENHA26 <i className="fa-regular fa-copy"></i></span></p>
                </div>
              </div>

              <div className="pool-detail-actions">
                <button className="btn btn-outline btn-sm" onClick={handleCopyInvite}><i className="fa-solid fa-share-nodes"></i> Compartilhar convite</button>
                <button className="btn btn-outline btn-sm" style={{ minWidth: "42px" }} onClick={() => triggerToast("Opções adicionais", "success")}><i className="fa-solid fa-ellipsis"></i></button>
              </div>
            </div>

            <div className="pool-detail-subtabs">
              <div className={`subtab-item ${activeDetailSubtab === "ranking" ? "active" : ""}`} onClick={() => setActiveDetailSubtab("ranking")}>Ranking</div>
              <div className="subtab-item" onClick={() => navigateTo("jogos")}>Jogos</div>
              <div className="subtab-item" onClick={() => navigateTo("resenha")}>Resenha</div>
              <div className={`subtab-item ${activeDetailSubtab === "participantes" ? "active" : ""}`} onClick={() => setActiveDetailSubtab("participantes")}>Participantes ({activeDetailPool.membersCount})</div>
              <div className={`subtab-item ${activeDetailSubtab === "config" ? "active" : ""}`} onClick={() => setActiveDetailSubtab("config")}>Configurações</div>
            </div>

            <div className="pool-details-grid">
              
              {/* Tabela do Ranking do Bolão */}
              <div className="pool-ranking-panel">
                <h3 className="ranking-table-title">Ranking do Bolão</h3>
                <table className="ranking-table">
                  <thead>
                    <tr>
                      <th className="table-pos">Pos.</th>
                      <th>Participante</th>
                      <th>Pontos</th>
                      <th>Zicas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankingDestaques.map((user, idx) => (
                      <tr key={idx} className={user.isYou ? "highlighted-row" : ""}>
                        <td className="table-pos">{user.pos}</td>
                        <td>
                          <div className="table-user-cell">
                            <img className="table-avatar" src={user.avatar} alt={user.name} />
                            <span className="table-user-name">{user.name}</span>
                          </div>
                        </td>
                        <td>{user.points}</td>
                        <td className="text-gold" style={{ fontWeight: 700 }}><i className="fa-solid fa-bolt"></i> {user.zicas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Sidebar do Bolão */}
              <div className="pool-sidebar-widgets">
                <div className="sidebar-widget">
                  <h4 className="widget-title">Info do Bolão</h4>
                  <div className="info-list">
                    <div className="info-row">
                      <span className="info-label">Criado por:</span>
                      <span className="info-val">{activeDetailPool.createdBy}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Criado em:</span>
                      <span className="info-val">{activeDetailPool.createdDate}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Participantes:</span>
                      <span className="info-val">{activeDetailPool.membersCount}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Tipo:</span>
                      <span className="info-val">{activeDetailPool.type}</span>
                    </div>
                  </div>
                  <button className="btn btn-outline text-red btn-sm" onClick={handleLeavePool}>
                    <i className="fa-solid fa-right-from-bracket"></i> Sair do Bolão
                  </button>
                </div>

                <div className="sidebar-widget">
                  <h4 className="widget-title">Top Zicas</h4>
                  <div className="top-zicas-list">
                    {topZicas.map((zica, idx) => (
                      <div key={idx} className="top-zica-row">
                        <div className="zica-profile">
                          <span className="zica-pos">{zica.pos}</span>
                          <span className="zica-name">{zica.name}</span>
                        </div>
                        <span className="zica-count"><i className="fa-solid fa-bolt"></i> {zica.zicas}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ==============================================
             6. TELA DE JOGOS (MATCHES LIST)
             ============================================== */}
        {activePage === "jogos" && (
          <section className="page">
            <div className="matches-header">
              <h1 className="matches-page-title">Jogos</h1>
              <p className="text-muted">Faça seus palpites e acompanhe os resultados em tempo real</p>
            </div>

            <div className="matches-filter-row">
              <div className={`filter-pill ${activeMatchesFilter === "todos" ? "active" : ""}`} onClick={() => setActiveMatchesFilter("todos")}>Todos</div>
              <div className={`filter-pill ${activeMatchesFilter === "grupo" ? "active" : ""}`} onClick={() => setActiveMatchesFilter("grupo")}>Fase de Grupos</div>
              <div className={`filter-pill ${activeMatchesFilter === "oitavas" ? "active" : ""}`} onClick={() => setActiveMatchesFilter("oitavas")}>Oitavas</div>
              <div className={`filter-pill ${activeMatchesFilter === "quartas" ? "active" : ""}`} onClick={() => setActiveMatchesFilter("quartas")}>Quartas</div>
              <div className={`filter-pill ${activeMatchesFilter === "semi" ? "active" : ""}`} onClick={() => setActiveMatchesFilter("semi")}>Semi</div>
              <div className={`filter-pill ${activeMatchesFilter === "final" ? "active" : ""}`} onClick={() => setActiveMatchesFilter("final")}>Final</div>
            </div>

            <div className="matches-list">
              {filteredMatches.map(match => {
                const hasGuess = match.userGuess !== null;
                return (
                  <div key={match.id} className="match-row-item">
                    <div className="match-row-meta">
                      <span className="match-time-date">{match.dateStr}</span>
                      <span className="match-stadium">{match.stadium}</span>
                    </div>

                    <div className="match-confrontation">
                      <div className="match-row-team team-home">
                        <span className="match-row-team-name">{match.homeTeam.name}</span>
                        <span style={{ fontSize: "1.7rem" }}>{match.homeTeam.flag}</span>
                      </div>
                      
                      <div className="match-vs-middle">
                        <div className="score-box-display">{hasGuess ? match.userGuess?.home : "-"}</div>
                        <span className="score-vs-text">X</span>
                        <div className="score-box-display">{hasGuess ? match.userGuess?.away : "-"}</div>
                      </div>
                      
                      <div className="match-row-team team-away">
                        <span style={{ fontSize: "1.7rem" }}>{match.awayTeam.flag}</span>
                        <span className="match-row-team-name">{match.awayTeam.name}</span>
                      </div>
                    </div>

                    <div className="match-action-col">
                      {hasGuess ? (
                        <div className="guess-summary" style={{ cursor: "pointer" }} onClick={() => handleOpenGuessModal(match.id)}>
                          <span className="guess-summary-label"><i className="fa-solid fa-pen"></i> Palpite Salvo</span>
                          <span className="guess-summary-score">{match.userGuess?.home} x {match.userGuess?.away}</span>
                        </div>
                      ) : (
                        <button className="btn btn-outline-green btn-sm" onClick={() => handleOpenGuessModal(match.id)}>Fazer Palpite</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==============================================
             8. TELA DE RESENHA (CHAT)
             ============================================== */}
        {activePage === "resenha" && (
          <section className="page">
            <div className="chat-container">
              <div className="chat-header">
                <h2 className="chat-title">Resenha</h2>
                <p className="chat-subtitle">Papo reto e zoeira liberada entre os participantes!</p>
              </div>

              <div className="chat-feed" ref={chatFeedRef}>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`chat-message-item ${msg.isOwn ? "own-message" : ""}`}>
                    <img className="chat-msg-avatar" src={msg.avatar} alt={msg.sender} />
                    <div className="chat-msg-body">
                      <div className="chat-msg-meta">
                        <span className="chat-msg-sender">{msg.sender}</span>
                        <span className="chat-msg-time">{msg.time}</span>
                      </div>
                      <div className="chat-msg-content-box">{msg.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <form className="chat-input-bar" onSubmit={handleSendChatMessage}>
                <input 
                  type="text" 
                  className="chat-input-field" 
                  placeholder="Escreva uma mensagem..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  autoComplete="off" 
                />
                <button type="submit" className="chat-send-btn">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </section>
        )}

        {/* ==============================================
             9. TELA DE PRÊMIOS (AWARDS)
             ============================================== */}
        {activePage === "premios" && (
          <section className="page">
            <div className="prizes-page-header">
              <h1 className="prizes-title">Prêmios</h1>
              <p className="prizes-subtitle">Os melhores colocados levam a resenha (e a glória)!</p>
            </div>

            <div className="podium-scene-container">
              <div className="podium-structure">
                {/* 2º lugar */}
                <div className="podium-col podium-col-second">
                  <div className="podium-card-float">
                    <span className="podium-place-label">2º Lugar</span>
                    <span className="podium-prize-value">R$ 6.000</span>
                    <span className="podium-trophy-type"><i className="fa-solid fa-award text-muted"></i> troféu virtual</span>
                  </div>
                  <div className="podium-block-3d">2</div>
                </div>

                {/* 1º lugar */}
                <div className="podium-col podium-col-first">
                  <div className="podium-card-float">
                    <img className="trophy-podium-img" src="/assets/trophy.png" alt="Taça de Ouro" />
                    <span className="podium-place-label">1º Lugar</span>
                    <span className="podium-prize-value text-gold">R$ 10.000</span>
                    <span className="podium-trophy-type"><i className="fa-solid fa-trophy text-gold"></i> troféu de ouro</span>
                  </div>
                  <div className="podium-block-3d">1</div>
                </div>

                {/* 3º lugar */}
                <div className="podium-col podium-col-third">
                  <div className="podium-card-float">
                    <span className="podium-place-label">3º Lugar</span>
                    <span className="podium-prize-value">R$ 3.000</span>
                    <span className="podium-trophy-type"><i className="fa-solid fa-award text-gold"></i> troféu virtual</span>
                  </div>
                  <div className="podium-block-3d">3</div>
                </div>
              </div>
            </div>

            <p className="prizes-footer-text">4º ao 10º lugar - R$ 600 cada</p>
          </section>
        )}

        {/* COMO FUNCIONA */}
        {activePage === "comofunciona" && (
          <section className="page">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1.5px solid var(--color-border)", borderRadius: "var(--border-radius-lg)", padding: "32px", maxWidth: "700px", margin: "0 auto" }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", marginBottom: "20px" }}>Como Funciona o CravaCopa</h1>
              <p style={{ color: "var(--text-muted-light)", lineHeight: "1.6", marginBottom: "20px" }}>
                O CravaCopa é um bolão gratuito e divertido para acompanhar a Copa do Mundo 2026. Veja abaixo as regras básicas de pontuação:
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", color: "var(--text-muted-light)" }}>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <i className="fa-solid fa-check text-green" style={{ marginTop: "4px" }}></i>
                  <div><strong>Cravada Exata (25 pts):</strong> Você acerta o placar exato da partida (Ex: palpita 2x1 e o jogo termina 2x1).</div>
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <i className="fa-solid fa-check text-green" style={{ marginTop: "4px" }}></i>
                  <div><strong>Vencedor & Saldo de Gols (18 pts):</strong> Você acerta quem venceu e a diferença de gols, mas erra o número de gols (Ex: palpita 3x1 e o jogo termina 2x0).</div>
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <i className="fa-solid fa-check text-green" style={{ marginTop: "4px" }}></i>
                  <div><strong>Apenas Tendência (10 pts):</strong> Você acerta apenas o vencedor ou empate, mas erra o placar e a diferença (Ex: palpita 1x0 e o jogo termina 3x1).</div>
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <i className="fa-solid fa-bolt text-gold" style={{ marginTop: "4px" }}></i>
                  <div><strong>Modo Zica (+10 ou -5 pts):</strong> Use o Modo Zica em um palpite de um amigo. Se o seu amigo errar feio, você ganha 10 pontos extras. Mas se ele cravar o jogo, você perde 5 pontos!</div>
                </li>
              </ul>
            </div>
          </section>
        )}
      </main>

      {/* ==============================================
           MODALS & OVERLAYS
           ============================================== */}

      {/* 7. Palpite Modal */}
      {guessModalOpen && selectedMatchId && (
        (() => {
          const match = matches.find(m => m.id === selectedMatchId);
          if (!match) return null;
          return (
            <div className="modal-overlay active">
              <div className="modal-content">
                <div className="modal-header">
                  <button className="back-btn" onClick={() => setGuessModalOpen(false)}>
                    <i className="fa-solid fa-arrow-left"></i> Voltar
                  </button>
                  <h3 className="modal-title">Palpite de Jogo</h3>
                </div>

                <div className="guess-confrontation-banner">
                  <span className="guess-banner-meta">{match.dateStr} • {match.stadium}</span>
                  <div className="guess-teams-row">
                    <div className="guess-team">
                      <span style={{ fontSize: "2.2rem", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>{match.homeTeam.flag}</span>
                      <span className="guess-team-name">{match.homeTeam.name}</span>
                    </div>
                    <span className="guess-vs-text">X</span>
                    <div className="guess-team">
                      <span style={{ fontSize: "2.2rem", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>{match.awayTeam.flag}</span>
                      <span className="guess-team-name">{match.awayTeam.name}</span>
                    </div>
                  </div>
                </div>

                <h4 className="guess-subtitle">Seu Palpite</h4>
                <div className="guess-score-controller">
                  <div className="score-control-block">
                    <button className="score-btn" onClick={() => setTempHomeScore(Math.max(0, tempHomeScore - 1))}>-</button>
                    <span className="score-value">{tempHomeScore}</span>
                    <button className="score-btn" onClick={() => setTempHomeScore(tempHomeScore + 1)}>+</button>
                  </div>
                  
                  <span className="score-divider-x">X</span>
                  
                  <div className="score-control-block">
                    <button className="score-btn" onClick={() => setTempAwayScore(Math.max(0, tempAwayScore - 1))}>-</button>
                    <span className="score-value">{tempAwayScore}</span>
                    <button className="score-btn" onClick={() => setTempAwayScore(tempAwayScore + 1)}>+</button>
                  </div>
                </div>

                <h4 className="guess-subtitle">Resultado do Jogo</h4>
                <div className="quick-outcome-selection">
                  <button className={`outcome-btn ${tempHomeScore > tempAwayScore ? "active" : ""}`} onClick={() => handleQuickOutcome("win-home")}>
                    Vitória {match.homeTeam.name}
                  </button>
                  <button className={`outcome-btn ${tempHomeScore === tempAwayScore ? "active" : ""}`} onClick={() => handleQuickOutcome("draw")}>
                    Empate
                  </button>
                  <button className={`outcome-btn ${tempHomeScore < tempAwayScore ? "active" : ""}`} onClick={() => handleQuickOutcome("win-away")}>
                    Vitória {match.awayTeam.name}
                  </button>
                </div>

                <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleSaveGuess}>Salvar Palpite</button>
                <p className="modal-footer-info">* Você pode alterar seu palpite até o início da partida.</p>
              </div>
            </div>
          );
        })()
      )}

      {/* Criar Bolão Modal */}
      {createPoolOpen && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-header">
              <button className="back-btn" onClick={() => setCreatePoolOpen(false)}>
                <i className="fa-solid fa-xmark"></i> Fechar
              </button>
              <h3 className="modal-title">Criar Novo Bolão</h3>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="poolNameInput">Nome do Bolão</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Ex: Família Silva, Turma do Bar..." 
                value={newPoolName}
                onChange={(e) => setNewPoolName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="poolDescription">Descrição / Regulamento</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Ex: R$ 20 por participante, cerveja pro campeão..." 
                value={newPoolDesc}
                onChange={(e) => setNewPoolDesc(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ícone do Escudo</label>
              <div style={{ display: "flex", gap: "14px", marginTop: "6px" }}>
                {["green", "red", "blue", "dark-red"].map(color => (
                  <label key={color} style={{ cursor: "pointer" }} onClick={() => setNewPoolShield(color)}>
                    <span className={`pool-shield ${color}`} style={{
                      width: "44px",
                      height: "44px",
                      border: newPoolShield === color ? "2px solid #10B981" : "2px solid transparent",
                      boxShadow: newPoolShield === color ? "0 0 10px rgba(16,185,129,0.5)" : "none"
                    }}>
                      <i className="fa-solid fa-shield"></i>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }} onClick={handleCreatePool}>Criar Bolão</button>
          </div>
        </div>
      )}

      {/* Modo Zica Modal */}
      {zicaOpen && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-header">
              <button className="back-btn" onClick={() => setZicaOpen(false)}>
                <i className="fa-solid fa-xmark"></i> Fechar
              </button>
              <h3 className="modal-title">Ativar Modo Zica</h3>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-muted-light)", marginBottom: "20px", lineHeight: "1.5" }}>
              Selecione um amigo de quem você deseja sabotar o palpite no próximo jogo (<span className="text-green">EUA x CANADÁ</span>). Se ele errar o placar exato, você ganha <strong>10 pts</strong> extras. Se ele cravar, você perde <strong>5 pts</strong>.
            </p>

            <div className="zica-select-list">
              {rankingDestaques.filter(u => !u.isYou).map((friend, idx) => (
                <div 
                  key={idx} 
                  className={`zica-select-item ${selectedZicaTarget === friend.name ? "selected" : ""}`}
                  onClick={() => setSelectedZicaTarget(friend.name)}
                >
                  <div className="friend-profile">
                    <img className="friend-avatar" src={friend.avatar} alt={friend.name} />
                    <span className="friend-name">{friend.name}</span>
                  </div>
                  <span className="friend-guess-tag">Palpite: 2 x 1</span>
                </div>
              ))}
            </div>

            <button 
              className="btn btn-gold" 
              style={{ width: "100%" }} 
              onClick={handleActivateZica}
              disabled={!selectedZicaTarget}
            >
              Confirmar Zica!
            </button>
          </div>
        </div>
      )}

      {/* Toast Banners */}
      <div className={`toast-notification ${toast.show ? "show" : ""}`} style={{
        borderLeftColor: toast.type === "success" ? "var(--color-primary)" : "var(--color-gold)"
      }}>
        <span className={`toast-icon ${toast.type === "success" ? "success text-green fa-solid fa-circle-check" : "warning text-gold fa-solid fa-triangle-exclamation"}`}></span>
        <span className="toast-text">{toast.text}</span>
      </div>
    </div>
  );
}
