import React, { useState } from 'react';
import { LeaderboardUser } from '../types';
import { LEADERBOARD_USERS } from '../data/forumData';
import { Trophy, Award, Flame, Search, UserCheck } from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [tabFilter, setTabFilter] = useState<'global' | 'friends'>('global');

  const filteredUsers = LEADERBOARD_USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            Глобальный Рейтинг Участников (Leaderboard)
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Соревнуйтесь в знаниях кибербезопасности, накапливайте XP, поддерживайте непрерывные серии занятий и поднимайтесь в топ защитников.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setTabFilter('global')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${tabFilter === 'global' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Мировой Топ
          </button>
          <button
            onClick={() => setTabFilter('friends')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${tabFilter === 'friends' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Друзья & Коллеги
          </button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LEADERBOARD_USERS.slice(0, 3).map((usr, idx) => (
          <div
            key={usr.id}
            className={`p-6 rounded-2xl border flex flex-col items-center text-center space-y-3 relative shadow-2xl ${
              idx === 0 ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/50' :
              idx === 1 ? 'bg-gradient-to-b from-slate-800/40 via-slate-900 to-slate-950 border-slate-400/50' :
              'bg-gradient-to-b from-amber-900/20 via-slate-900 to-slate-950 border-amber-700/40'
            }`}
          >
            <div className={`absolute -top-3 px-3 py-0.5 rounded-full text-xs font-mono font-bold ${
              idx === 0 ? 'bg-amber-500 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-950' : 'bg-amber-700 text-white'
            }`}>
              #{usr.rank} место
            </div>

            <img src={usr.avatar} alt={usr.name} className="w-16 h-16 rounded-full border-2 border-slate-700 object-cover mt-2" />

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">{usr.name}</h3>
              <p className="text-[11px] text-cyan-400 font-mono">{usr.badgeTitle}</p>
            </div>

            <div className="flex items-center space-x-3 text-xs text-slate-300 font-mono pt-1">
              <span className="text-amber-400 font-bold">{usr.xp} XP</span>
              <span>• Уровень {usr.level}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск участников по имени..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
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
                  <td className="py-3.5 flex items-center space-x-3">
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
      </div>
    </div>
  );
};
