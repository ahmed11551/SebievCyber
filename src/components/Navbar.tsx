import React from 'react';
import { UserProgress, ThemeMode } from '../types';
import { ShieldCheck, Flame, Award, BookOpen, AlertCircle, MessageSquare, Trophy, User, Sun, Moon, CloudCheck, Palette, Bell, Sparkles, Zap, UserPlus, MessageCircle } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: UserProgress;
  setUser: React.Dispatch<React.SetStateAction<UserProgress>>;
  unreadThreatsCount: number;
  onOpenNotifications: () => void;
  onOpenVipModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  setUser,
  unreadThreatsCount,
  onOpenNotifications,
  onOpenVipModal
}) => {
  const [showThemeMenu, setShowThemeMenu] = React.useState(false);

  const handleThemeChange = (theme: ThemeMode) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        theme
      }
    }));
    setShowThemeMenu(false);
  };

  const toggleNightReading = () => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        nightReadingMode: !prev.preferences.nightReadingMode
      }
    }));
  };

  const navItems = [
    { id: 'dashboard', label: 'Обзор', icon: ShieldCheck },
    { id: 'courses', label: 'Курсы & Тесты', icon: BookOpen },
    { id: 'knowledge', label: 'База Знаний', icon: Award },
    { id: 'threats', label: 'Мониторинг Угроз', icon: AlertCircle, badge: unreadThreatsCount },
    { id: 'forum', label: 'Форум', icon: MessageSquare },
    { id: 'leaderboard', label: 'Рейтинг', icon: Trophy },
    { id: 'friends', label: 'Друзья', icon: UserPlus },
    { id: 'chat', label: 'Чат', icon: MessageCircle },
    { id: 'collab', label: 'Задачи', icon: Flame },
    { id: 'profile', label: 'Личный Кабинет', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-200 to-indigo-300">
                CyberShield
              </span>
              <span className="hidden sm:inline-block text-xs font-mono text-cyan-400/80 ml-1.5 uppercase tracking-widest">
                Academy
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium flex items-center space-x-2 transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 ? (
                    <span className="px-1.5 py-0.5 text-[10px] bg-red-500 text-white font-bold rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Right Status Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* VIP Mentorship Button */}
            <button
              onClick={onOpenVipModal}
              className="flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-black rounded-full shadow-lg shadow-amber-950/60 transition-transform hover:scale-105"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span className="hidden sm:inline">VIP Ментор Ахмед</span>
              <span className="sm:hidden">VIP</span>
            </button>

            {/* Streak Counter */}
            <div
              title={`Серия обучения: ${user.streakDays} дней подряд!`}
              className="flex items-center space-x-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30 animate-bounce" />
              <span>{user.streakDays} дн</span>
            </div>

            {/* Level & XP Badge */}
            <div
              onClick={() => setCurrentTab('profile')}
              className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer hover:border-cyan-500/50 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs flex items-center justify-center font-bold">
                {user.level}
              </div>
              <span className="text-xs font-mono text-slate-300">{user.xp} XP</span>
            </div>

            {/* Cloud Sync Status */}
            <div
              title="Синхронизация прогресса с облачным хранилищем включена"
              className="hidden md:flex items-center text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-2 py-1 rounded"
            >
              <CloudCheck className="w-3.5 h-3.5 mr-1" />
              <span>Облако</span>
            </div>

            {/* Night Mode Toggle */}
            <button
              onClick={toggleNightReading}
              title={user.preferences.nightReadingMode ? 'Выключить ночной режим для чтения' : 'Включить ночной режим'}
              className={`p-2 rounded-lg border transition-colors ${
                user.preferences.nightReadingMode
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {user.preferences.nightReadingMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Theme Selector Button */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                title="Сменить цветовую тему"
                className="p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                <Palette className="w-4 h-4" />
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 space-y-1 text-xs">
                  <div className="text-[10px] text-slate-400 font-mono px-2 py-1 uppercase">Выберите Тему:</div>
                  <button
                    onClick={() => handleThemeChange('cyber-dark')}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 text-cyan-300 flex items-center justify-between"
                  >
                    <span>Cyber Dark</span>
                    {user.preferences.theme === 'cyber-dark' && '✓'}
                  </button>
                  <button
                    onClick={() => handleThemeChange('midnight-slate')}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 text-blue-300 flex items-center justify-between"
                  >
                    <span>Midnight Slate</span>
                    {user.preferences.theme === 'midnight-slate' && '✓'}
                  </button>
                  <button
                    onClick={() => handleThemeChange('oled-black')}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 text-slate-100 flex items-center justify-between"
                  >
                    <span>OLED Night Black</span>
                    {user.preferences.theme === 'oled-black' && '✓'}
                  </button>
                  <button
                    onClick={() => handleThemeChange('matrix-green')}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 text-emerald-400 flex items-center justify-between"
                  >
                    <span>Matrix Green</span>
                    {user.preferences.theme === 'matrix-green' && '✓'}
                  </button>
                  <button
                    onClick={() => handleThemeChange('clean-light')}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 text-amber-200 flex items-center justify-between"
                  >
                    <span>Clean Light</span>
                    {user.preferences.theme === 'clean-light' && '✓'}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadThreatsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Row */}
        <div className="flex lg:hidden overflow-x-auto py-2 border-t border-slate-800/80 gap-1 no-scrollbar text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 whitespace-nowrap ${
                  isActive ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
