import React, { useState } from 'react';
import { UserProgress, Certificate } from '../types';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData';
import { exportUserProgressPDF } from '../utils/pdfExporter';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import {
  User, Award, Flame, Zap, Download, Share2, ShieldCheck,
  Settings, RefreshCw, CheckCircle2, ExternalLink, Lock, Target
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

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

  const radarData = [
    { subject: '152-ФЗ', A: 95 },
    { subject: 'OWASP', A: 85 },
    { subject: 'Фишинг', A: 90 },
    { subject: 'Шифрование', A: 75 },
    { subject: 'Сетевая защита', A: 80 },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 p-[2px] shadow-xl">
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-full h-full rounded-[14px] object-cover bg-slate-950"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                {user.level}
              </div>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl font-black text-white">{user.fullName}</h1>
                <Badge variant="cyan" size="md">Уровень {user.level}</Badge>
              </div>
              <p className="text-xs text-slate-400 font-mono">{user.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1 text-xs">
                <span className="flex items-center gap-1.5 text-amber-400 font-mono">
                  <Flame className="w-4 h-4 fill-amber-400/20" /> {user.streakDays} дн. подряд
                </span>
                <span className="text-cyan-400 font-mono">{user.xp} XP всего</span>
              </div>
              <div className="pt-2">
                <Badge variant="amber" size="sm">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Ментор: Ахмед Себиев
                  </span>
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm" onClick={() => exportUserProgressPDF(user)}>
              <Download className="w-4 h-4" />
              <span>Экспорт PDF</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleManualSync}
              disabled={isSyncing}
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{syncSuccess ? 'Синхронизировано!' : 'Синхронизация'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white">Динамика Активности & XP</h3>
          </div>
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
        </Card>

        <Card variant="glass" padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Радар Компетенций</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <Radar name="Навыки" dataKey="A" stroke="#38bdf8" fill="#06b6d4" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Certificates */}
      <Card variant="glass" padding="lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Галерея Сертификатов
          </h2>
          <Badge variant="amber" size="sm">{user.certificates.length}</Badge>
        </div>

        {user.certificates.length === 0 ? (
          <p className="text-xs text-slate-400">У вас пока нет активных сертификатов. Завершите все уроки любого курса для получения диплома.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.certificates.map(cert => (
              <div
                key={cert.id}
                onClick={() => onOpenCertificate(cert)}
                className="p-4 bg-slate-950/80 border border-amber-500/30 rounded-xl cursor-pointer hover:border-amber-400 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{cert.courseTitle}</div>
                  <div className="text-[11px] text-slate-400 font-mono">Код: {cert.verificationCode} • Выдан: {cert.issueDate}</div>
                </div>
                <Award className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Achievements */}
      <Card variant="glass" padding="lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Достижения
          </h2>
          <Badge variant="cyan" size="sm">{user.unlockedAchievementIds.length} / {ACHIEVEMENTS_DATA.length}</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS_DATA.map(ach => {
            const isUnlocked = user.unlockedAchievementIds.includes(ach.id);
            return (
              <Card
                key={ach.id}
                variant={isUnlocked ? 'glass' : 'bordered'}
                padding="md"
                className={`relative overflow-hidden transition-all ${isUnlocked ? '' : 'opacity-60'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-600'}`}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white">{ach.title}</span>
                      <span className="text-[10px] text-amber-400 font-mono">+{ach.rewardXP} XP</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-tight">{ach.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
