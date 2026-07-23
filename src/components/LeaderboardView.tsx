import React, { useState } from 'react';
import { LeaderboardUser } from '../types';
import { LEADERBOARD_USERS } from '../data/forumData';
import { Trophy, Award, Flame, Search, UserCheck } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';

export const LeaderboardView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [tabFilter, setTabFilter] = useState<'global' | 'friends'>('global');

  const filteredUsers = LEADERBOARD_USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-amber-500/30 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-mono text-amber-300">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Global Ranking & Seasons</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Рейтинг <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">участников</span>
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              Соревнуйтесь в знаниях кибербезопасности, накапливайте XP, поддерживайте серии занятий и поднимайтесь в топ защитников.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['global', 'friends'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setTabFilter(tab)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  tabFilter === tab ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'global' ? 'Мировой Топ' : 'Друзья & Коллеги'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LEADERBOARD_USERS.slice(0, 3).map((usr, idx) => (
          <Card
            key={usr.id}
            variant="glass"
            padding="lg"
            className="relative text-center space-y-3"
          >
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-mono font-bold ${
              idx === 0 ? 'bg-amber-500 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-950' : 'bg-amber-700 text-white'
            }`}>
              #{usr.rank} место
            </div>

            <img src={usr.avatar} alt={usr.name} className="w-16 h-16 rounded-full border-2 border-slate-700 object-cover mt-2" />

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">{usr.name}</h3>
              <p className="text-[11px] text-cyan-400 font-mono">{usr.badgeTitle}</p>
            </div>

            <div className="flex items-center justify-center gap-3 text-xs text-slate-300 font-mono pt-1">
              <span className="text-amber-400 font-bold">{usr.xp} XP</span>
              <span>• Уровень {usr.level}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Leaderboard Table */}
      <Card variant="glass" padding="lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            Таблица Лидеров
          </h2>
          <Input
            value={search}
            onChange={setSearch}
            placeholder="Поиск участников по имени..."
            className="max-w-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="pb-3 pl-2">Ранг</th>
                <th className="pb-3">Участник</th>
                <th className="pb-3">Уровень</th>
                <th className="pb-3">Серия (Streak)</th>
                <th className="pb-3 text-right pr-2">Опыт (XP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map(u => (
                <tr
                  key={u.id}
                  className={`hover:bg-slate-800/50 transition-colors ${u.isCurrentUser ? 'bg-cyan-950/40 text-cyan-200 font-bold' : 'text-slate-200'}`}
                >
                  <td className="py-3.5 pl-2 font-mono text-cyan-400 font-bold">#{u.rank}</td>
                  <td className="py-3.5 flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full border border-slate-700 object-cover" />
                    <div>
                      <div className="text-xs font-bold">{u.name} {u.isCurrentUser && '(Вы)'}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{u.badgeTitle}</div>
                    </div>
                  </td>
                  <td className="py-3.5 font-mono">Уровень {u.level}</td>
                  <td className="py-3.5 font-mono text-amber-400">🔥 {u.streakDays} дн.</td>
                  <td className="py-3.5 text-right pr-2 font-mono text-cyan-300 font-bold">{u.xp} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
