import React from 'react';
import { UserProgress, CourseModule, ThreatItem } from '../types';
import { Flame, Award, ShieldCheck, Zap, ArrowRight, Play, CheckCircle2, TrendingUp, AlertTriangle, UserCheck, Sparkles, Star, Terminal } from 'lucide-react';

interface DashboardViewProps {
  user: UserProgress;
  courses: CourseModule[];
  threats: ThreatItem[];
  onNavigateTab: (tab: string, itemData?: any) => void;
  onOpenCertificate: (cert: any) => void;
  onOpenVipModal: () => void;
  onOpenTrojanArena: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  courses,
  threats,
  onNavigateTab,
  onOpenCertificate,
  onOpenVipModal,
  onOpenTrojanArena
}) => {
  const currentCourse = courses[0];
  const nextLesson = currentCourse?.lessons.find(l => !user.completedLessonIds.includes(l.id)) || currentCourse?.lessons[0];

  return (
    <div className="space-y-8">
      {/* Top Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950 p-6 md:p-8 border border-cyan-500/30 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Платформа Активирована • Уровень {user.level}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Добро пожаловать, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">{user.fullName}</span>!
            </h1>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Ваша текущая серия обучения составляет <strong className="text-amber-400 font-mono">{user.streakDays} дней подряд</strong>.
              Завершите сегодняшний интерактивный модуль для поддержания уровня защиты!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onOpenTrojanArena}
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-950/80 flex items-center justify-center space-x-2 transition-transform hover:scale-105"
            >
              <Terminal className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Кибер-Арена "Троянский Конь"</span>
            </button>

            <button
              onClick={() => onNavigateTab('courses')}
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-950/80 flex items-center justify-center space-x-2 transition-transform hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Продолжить Обучение</span>
            </button>
          </div>
        </div>
      </div>

      {/* Founder & Chief Security Mentor Banner — Ахмед Себиев */}
      <div className="p-6 md:p-8 bg-slate-900/90 border border-amber-500/40 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-cyan-500 p-1 shadow-xl">
                <div className="w-full h-full bg-slate-950 rounded-[12px] flex flex-col items-center justify-center p-2 text-center">
                  <UserCheck className="w-8 h-8 text-amber-400 mb-0.5" />
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">Ахмед Себиев</span>
                  <span className="text-[8px] text-amber-300">Основатель & Гуру</span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                <Star className="w-2.5 h-2.5 fill-black" /> CISO
              </div>
            </div>

            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Главный Ментор & Основатель Академии: Ахмед Себиев</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Авторская Методика Обучения & Индивидуальное Развитие
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Моя цель — вырастить из вас востребованных специалистов по кибербезопасности, готовых отражать реальные атаки 0-day, защищать КИИ и обеспечивать полное соответствие 152-ФЗ."
              </p>
            </div>
          </div>

          <button
            onClick={onOpenVipModal}
            className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs rounded-xl shadow-xl shadow-amber-950/80 flex items-center justify-center space-x-2 transition-transform hover:scale-105 flex-shrink-0"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>Записаться на Менторство к Ахмеду</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Опыт (XP)</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{user.xp} <span className="text-xs text-slate-400">XP</span></div>
          <div className="text-[11px] text-cyan-400">До уровня {user.level + 1}: {300 - (user.xp % 300)} XP</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Пройдено Уроков</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{user.completedLessonIds.length}</div>
          <div className="text-[11px] text-emerald-400">Интерактивных модулей</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Точность Тестов</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {Object.keys(user.quizScores).length > 0
              ? Math.round((Object.values(user.quizScores) as number[]).reduce((a, b) => a + b, 0) / Object.keys(user.quizScores).length)
              : 100}%
          </div>
          <div className="text-[11px] text-cyan-300">Средний бал аттестации</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Сертификаты</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{user.certificates.length}</div>
          <div className="text-[11px] text-amber-300">Официальных квалификаций</div>
        </div>
      </div>

      {/* Main Grid: Recommended Course & Latest Threats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Next Step */}
        <div className="lg:col-span-2 p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Текущий Образовательный Модуль
            </h2>
            <button
              onClick={() => onNavigateTab('courses')}
              className="text-xs text-cyan-400 hover:underline flex items-center space-x-1"
            >
              <span>Все курсы</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-cyan-300">{currentCourse?.title}</span>
              <span> Награда: +{nextLesson?.xpReward || 100} XP</span>
            </div>
            <h3 className="text-base font-bold text-white">{nextLesson?.title || 'Урок подготовлен'}</h3>
            <p className="text-xs text-slate-300 line-clamp-2">{nextLesson?.description}</p>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-xs text-slate-400">Длительность: ~{nextLesson?.durationMinutes || 15} мин</div>
              <button
                onClick={() => onNavigateTab('courses')}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                Начать Урок
              </button>
            </div>
          </div>

          {/* User Certificates Showcase */}
          {user.certificates.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Ваши Полученные Сертификаты
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.certificates.map(cert => (
                  <div
                    key={cert.id}
                    onClick={() => onOpenCertificate(cert)}
                    className="p-3 bg-slate-950 border border-amber-500/30 rounded-xl cursor-pointer hover:border-amber-400 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">{cert.courseTitle}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Выдан: {cert.issueDate}</div>
                    </div>
                    <Award className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Real-time Cyber Threat Feed Sidebar */}
        <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Мониторинг Угроз
            </h2>
            <button
              onClick={() => onNavigateTab('threats')}
              className="text-xs text-cyan-400 hover:underline"
            >
              Сводка CVE
            </button>
          </div>

          <div className="space-y-3">
            {threats.slice(0, 3).map(threat => (
              <div
                key={threat.id}
                onClick={() => onNavigateTab('threats')}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded font-mono ${
                    threat.severity === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800' :
                    threat.severity === 'HIGH' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {threat.severity}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{threat.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 line-clamp-2">{threat.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{threat.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
