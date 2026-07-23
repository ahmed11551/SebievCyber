import React from 'react';
import { UserProgress, CourseModule, ThreatItem } from '../types';
import {
  Flame, Award, ShieldCheck, Zap, ArrowRight, Play, CheckCircle2,
  TrendingUp, AlertTriangle, UserCheck, Sparkles, Star, Terminal, Rocket, Target, Clock
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

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

  const metrics = [
    {
      label: 'Опыт (XP)',
      value: `${user.xp} XP`,
      sub: `До уровня ${user.level + 1}: ${300 - (user.xp % 300)} XP`,
      icon: Zap,
      accent: 'text-amber-400',
      border: 'border-amber-500/30'
    },
    {
      label: 'Пройдено Уроков',
      value: `${user.completedLessonIds.length}`,
      sub: 'Интерактивных модулей',
      icon: CheckCircle2,
      accent: 'text-emerald-400',
      border: 'border-emerald-500/30'
    },
    {
      label: 'Точность Тестов',
      value: `${Object.keys(user.quizScores).length > 0 ? Math.round((Object.values(user.quizScores) as number[]).reduce((a: number, b: number) => a + b, 0) / Object.keys(user.quizScores).length) : 100}%`,
      sub: 'Средний бал аттестации',
      icon: TrendingUp,
      accent: 'text-cyan-400',
      border: 'border-cyan-500/30'
    },
    {
      label: 'Сертификаты',
      value: `${user.certificates.length}`,
      sub: 'Официальных квалификаций',
      icon: Award,
      accent: 'text-amber-400',
      border: 'border-amber-500/30'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 p-8 md:p-10 border border-cyan-500/30 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Платформа Активирована • Уровень {user.level}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Добро пожаловать, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400">{user.fullName}</span>!
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Ваша текущая серия обучения составляет <strong className="text-amber-400 font-mono">{user.streakDays} дней подряд</strong>.
              Завершите сегодняшний интерактивный модуль для поддержания уровня защиты!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button variant="primary" size="md" onClick={onOpenTrojanArena}>
                <Terminal className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Кибер-Арена "Троянский Конь"</span>
              </Button>
              <Button variant="secondary" size="md" onClick={() => onNavigateTab('courses')}>
                <Play className="w-4 h-4 fill-white" />
                <span>Продолжить Обучение</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-xl">
              <Rocket className="w-5 h-5 text-cyan-400" />
              <div className="text-xs">
                <div className="text-slate-400 font-mono uppercase tracking-wider">Скорость</div>
                <div className="text-white font-bold">x{user.streakDays > 7 ? 2 : 1}</div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-xl">
              <Target className="w-5 h-5 text-amber-400" />
              <div className="text-xs">
                <div className="text-slate-400 font-mono uppercase tracking-wider">Цель</div>
                <div className="text-white font-bold">Уровень {user.level + 1}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <Card key={idx} variant="glass" padding="md" className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">{metric.label}</span>
                <metric.icon className={`w-5 h-5 ${metric.accent}`} />
              </div>
              <div className="text-3xl font-black text-white font-mono tracking-tight">{metric.value}</div>
              <div className="text-[11px] text-slate-400">{metric.sub}</div>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${metric.border} bg-gradient-to-r from-transparent via-current to-transparent opacity-50`} />
          </Card>
        ))}
      </div>

      {/* Bento Grid: Course + Threats + Mentor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Course - spans 8 cols */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Текущий Образовательный Модуль
            </h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigateTab('courses')}>
              <span>Все курсы</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Card variant="glass" padding="lg" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full -mr-32 -mt-32" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="cyan" size="md">{currentCourse?.title}</Badge>
                <span className="text-xs text-slate-400 font-mono">Награда: +{nextLesson?.xpReward || 100} XP</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-1">{nextLesson?.title || 'Урок подготовлен'}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{nextLesson?.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>~{nextLesson?.durationMinutes || 15} мин</span>
                </div>
                <Button variant="primary" size="sm" onClick={() => onNavigateTab('courses')}>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Начать Урок</span>
                </Button>
              </div>
            </div>
          </Card>

          {/* Certificates */}
          {user.certificates.length > 0 && (
            <Card variant="glass" padding="lg">
              <h3 className="text-base font-bold text-slate-300 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Ваши Полученные Сертификаты
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.certificates.map(cert => (
                  <div
                    key={cert.id}
                    onClick={() => onOpenCertificate(cert)}
                    className="p-3 bg-slate-950/80 border border-amber-500/30 rounded-xl cursor-pointer hover:border-amber-400 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">{cert.courseTitle}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Выдан: {cert.issueDate}</div>
                    </div>
                    <Award className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Threats + Mentor */}
        <div className="lg:col-span-4 space-y-6">
          {/* Mentor Card */}
          <Card variant="glass" padding="lg" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-cyan-500 p-[2px]">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Ахмед Себиев</div>
                  <div className="text-[10px] text-amber-300 font-mono uppercase tracking-wider">Главный Ментор & CISO</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Авторская методика обучения. Индивидуальное развитие под реальные атаки 0-day и 152-ФЗ.
              </p>

              <Button variant="secondary" size="sm" className="w-full" onClick={onOpenVipModal}>
                <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Записаться на Менторство</span>
              </Button>
            </div>
          </Card>

          {/* Threats */}
          <Card variant="glass" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Мониторинг Угроз
              </h2>
              <Button variant="ghost" size="sm" onClick={() => onNavigateTab('threats')}>
                <span>Сводка CVE</span>
              </Button>
            </div>

            <div className="space-y-3">
              {threats.slice(0, 3).map(threat => (
                <div
                  key={threat.id}
                  onClick={() => onNavigateTab('threats')}
                  className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        threat.severity === 'CRITICAL' ? 'red' :
                        threat.severity === 'HIGH' ? 'amber' : 'slate'
                      }
                      size="sm"
                    >
                      {threat.severity}
                    </Badge>
                    <span className="text-[10px] text-slate-500 font-mono">{threat.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-2">{threat.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{threat.summary}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
