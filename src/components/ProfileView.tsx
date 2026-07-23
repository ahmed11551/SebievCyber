import React, { useState } from 'react';
import { UserProgress, Certificate } from '../types';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData';
import { exportUserProgressPDF } from '../utils/pdfExporter';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { User, Award, Flame, Zap, Download, Share2, ShieldCheck, Settings, RefreshCw, CheckCircle2, ExternalLink, Lock } from 'lucide-react';

interface ProfileViewProps {
  user: UserProgress;
  setUser: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenCertificate: (cert: Certificate) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, setUser, onOpenCertificate }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncSuccess(false);

    try {
      await fetch('/api/sync/user-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.userId,
          progressData: user
        })
      });
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    } catch (e) {
      console.warn('Sync error:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Radar performance data
  const radarData = [
    { subject: '152-ФЗ', A: 95 },
    { subject: 'OWASP', A: 85 },
    { subject: 'Фишинг', A: 90 },
    { subject: 'Шифрование', A: 75 },
    { subject: 'Сетевая защита', A: 80 },
  ];

  return (
    <div className="space-y-8">
      {/* USER CARD HEADER */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-20 h-20 rounded-full border-2 border-cyan-400 shadow-xl object-cover"
          />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-white">{user.fullName}</h1>
              <span className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full text-xs font-mono font-bold">
                Уровень {user.level}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            <div className="flex items-center space-x-3 pt-1 text-xs text-amber-400 font-mono">
              <span className="flex items-center space-x-1"><Flame className="w-4 h-4 fill-amber-400/20" /> {user.streakDays} дн. подряд</span>
              <span className="text-cyan-400">{user.xp} XP всего</span>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-lg text-[11px] font-mono font-bold">
                Ментор: Ахмед Себиев (Основатель & ИБ Гуру)
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportUserProgressPDF(user)}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl flex items-center space-x-2 transition-colors shadow-lg shadow-cyan-950"
          >
            <Download className="w-4 h-4" />
            <span>Экспорт PDF Отчета</span>
          </button>

          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center space-x-2 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{syncSuccess ? 'Синхронизировано!' : 'Синхронизация'}</span>
          </button>
        </div>
      </div>

      {/* ANALYTICS & ACTIVITY CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* XP Gains Bar Chart */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Динамика Активности & Заработка XP
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={user.activityLog}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#38bdf8' }}
                />
                <Bar dataKey="xpGained" name="Получено XP" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Competency Radar */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Радар Компетенций Безопасности
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <Radar name="Навыки" dataKey="A" stroke="#38bdf8" fill="#06b6d4" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CERTIFICATES SHOWCASE */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Галерея Сертификатов
        </h2>

        {user.certificates.length === 0 ? (
          <p className="text-xs text-slate-400">У вас пока нет активных сертификатов. Завершите все уроки любого курса для получения диплома.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.certificates.map(cert => (
              <div
                key={cert.id}
                onClick={() => onOpenCertificate(cert)}
                className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl cursor-pointer hover:border-amber-400 transition-all flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{cert.courseTitle}</h4>
                  <div className="text-[11px] text-slate-400 font-mono">Код: {cert.verificationCode} • Выдан: {cert.issueDate}</div>
                </div>
                <Award className="w-6 h-6 text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACHIEVEMENTS GRID */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          Система Достижений & Наград
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS_DATA.map(ach => {
            const isUnlocked = user.unlockedAchievementIds.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-xl border transition-all flex items-start space-x-3 ${
                  isUnlocked
                    ? 'bg-slate-950 border-cyan-500/40 text-slate-100'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60'
                }`}
              >
                <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-600'}`}>
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>{ach.title}</span>
                    <span className="text-[10px] text-amber-400 font-mono">+{ach.rewardXP} XP</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
