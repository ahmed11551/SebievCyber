import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProgress, Certificate, ThreatItem } from './types';
import { loadUserProgress, saveUserProgress } from './utils/storage';
import { COURSES_DATA } from './data/coursesData';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { CoursesView } from './components/CoursesView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { ThreatMonitorView } from './components/ThreatMonitorView';
import { ForumView } from './components/ForumView';
import { LeaderboardView } from './components/LeaderboardView';
import { ProfileView } from './components/ProfileView';
import { FriendsView } from './components/FriendsView';
import { ChatView } from './components/ChatView';
import { CollabView } from './components/CollabView';
import { PricingView } from './components/PricingView';
import { CertificateModal } from './components/CertificateModal';
import { VipMentorshipModal } from './components/VipMentorshipModal';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TrojanHorseArena } from './components/TrojanHorseArena';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { ShieldAlert, X, Bell } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<UserProgress>(loadUserProgress());
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [showVipModal, setShowVipModal] = useState(false);
  const [showTrojanArena, setShowTrojanArena] = useState(false);

  // Real-time Threats feed
  const [threats, setThreats] = useState<ThreatItem[]>([]);
  const [unreadThreatsCount, setUnreadThreatsCount] = useState(2);
  const [pushNotificationToast, setPushNotificationToast] = useState<ThreatItem | null>(null);

  // Load live threats from Express backend
  useEffect(() => {
    fetch('/api/threats')
      .then(res => res.json())
      .then(data => {
        if (data.threats) {
          setThreats(data.threats);
        }
      })
      .catch(err => console.warn('Backend threat fetch fallback:', err));
  }, []);

  // Save progress state whenever user updates
  useEffect(() => {
    saveUserProgress(user);
  }, [user]);

  // Simulated push notification trigger every 45 seconds for critical threats
  useEffect(() => {
    if (!user.preferences.notificationsEnabled) return;

    const interval = setInterval(() => {
      const mockPush: ThreatItem = {
        id: `push_${Date.now()}`,
        cveId: 'CVE-2026-9912',
        title: 'КРИТИЧЕСКАЯ УГРОЗА: Нулевой День (0-Day) в браузерных движках',
        severity: 'CRITICAL',
        category: 'Zero-Day Vulnerability',
        summary: 'Обнаружено активное использование уязвимости выполнения кода через парсинг WebAssembly.',
        vectorDetails: 'Некорректная обработка спекулятивных инструкций v8 JS Engine.',
        date: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        mitigation: 'Обновите ваш браузер до последней стабильной сборки.',
        affectedSystems: ['All Chromium Browsers', 'Webmail Clients']
      };

      setPushNotificationToast(mockPush);
      setUnreadThreatsCount(prev => prev + 1);
    }, 45000);

    return () => clearInterval(interval);
  }, [user.preferences.notificationsEnabled]);

  const handleToggleNotifications = () => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notificationsEnabled: !prev.preferences.notificationsEnabled
      }
    }));
  };

  const handleAwardXP = (amount: number) => {
    setUser(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  // Determine container theme background class
  const getThemeClass = () => {
    switch (user.preferences.theme) {
      case 'midnight-slate': return 'bg-slate-950 text-slate-100';
      case 'oled-black': return 'bg-black text-slate-100';
      case 'matrix-green': return 'bg-zinc-950 text-emerald-400 font-mono';
      case 'clean-light': return 'bg-slate-50 text-slate-900';
      default: return 'bg-slate-950 text-slate-100';
    }
  };

  const handleAuth = () => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: true,
      fullName: 'Алексей Петров',
      email: 'alexey@example.com'
    }));
  };

  if (!user.isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleAuth} />} />
          <Route path="/register" element={<RegisterPage onRegister={handleAuth} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${getThemeClass()} flex flex-col font-sans selection:bg-cyan-500 selection:text-white`}>
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        setUser={setUser}
        unreadThreatsCount={unreadThreatsCount}
        onOpenNotifications={() => {
          setCurrentTab('threats');
          setUnreadThreatsCount(0);
        }}
        onOpenVipModal={() => setShowVipModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Render Trojan Horse Cyber Arena if toggled */}
        {showTrojanArena && (
          <TrojanHorseArena
            user={user}
            setUser={setUser}
            onOpenVipModal={() => setShowVipModal(true)}
            onClose={() => setShowTrojanArena(false)}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            user={user}
            courses={COURSES_DATA}
            threats={threats}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
            onOpenVipModal={() => setShowVipModal(true)}
            onOpenTrojanArena={() => setShowTrojanArena(true)}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesView
            courses={COURSES_DATA}
            user={user}
            setUser={setUser}
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
          />
        )}

        {currentTab === 'knowledge' && (
          <KnowledgeBaseView nightMode={user.preferences.nightReadingMode} />
        )}

        {currentTab === 'threats' && (
          <ThreatMonitorView
            threats={threats}
            notificationsEnabled={user.preferences.notificationsEnabled}
            onToggleNotifications={handleToggleNotifications}
          />
        )}

        {currentTab === 'forum' && (
          <ForumView
            user={user}
            onAwardXP={handleAwardXP}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView />
        )}

        {currentTab === 'friends' && <FriendsView />}

        {currentTab === 'chat' && <ChatView />}

        {currentTab === 'collab' && <CollabView />}

        {currentTab === 'pricing' && <PricingView />}

        {currentTab === 'profile' && (
          <ProfileView
            user={user}
            setUser={setUser}
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
          />
        )}
      </main>

      {/* Real-time Push Notification Alert Overlay Toast */}
      {pushNotificationToast && (
        <div className="fixed top-20 right-4 z-50 max-w-md w-full bg-red-950 border-2 border-red-500/80 rounded-2xl p-4 shadow-2xl animate-bounce text-red-100 flex items-start space-x-3">
          <ShieldAlert className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <div className="text-xs font-mono font-bold text-red-400 uppercase">
              ⚡ Push-Уведомление Об Угрозе
            </div>
            <h4 className="text-xs font-bold text-white">{pushNotificationToast.title}</h4>
            <p className="text-[11px] text-red-200">{pushNotificationToast.summary}</p>
          </div>
          <button
            onClick={() => setPushNotificationToast(null)}
            className="p-1 text-red-300 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating AI Security Assistant Drawer */}
      <AIAssistantDrawer />

      {/* Certificate Viewer Modal */}
      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
          userProgressData={user}
        />
      )}

      {/* VIP Mentorship Modal */}
      {showVipModal && (
        <VipMentorshipModal
          user={user}
          setUser={setUser}
          onClose={() => setShowVipModal(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 CyberShield Academy • Платформа Обучения Кибербезопасности & Защите Данных (152-ФЗ)</span>
          <span className="font-mono text-cyan-400">Облачная Синхронизация Активна • PWA / Offline Mode</span>
        </div>
      </footer>
      </div>
    </BrowserRouter>
  );
}
