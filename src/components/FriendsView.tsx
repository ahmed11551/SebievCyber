import React, { useState } from 'react';
import { UserPlus, MessageCircle, Crown, Flame } from 'lucide-react';
import { FRIENDS_DATA } from '../data/socialData';
import { Friend } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';

export const FriendsView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [friends, setFriends] = useState<Friend[]>(FRIENDS_DATA);

  const filtered = friends.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-cyan-500/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-cyan-400" />
            Друзья и Сообщество
          </h1>
          <p className="text-xs text-slate-300 mt-1">Управляйте контактами, совместными задачами и общением.</p>
        </div>

        <Input value={query} onChange={setQuery} placeholder="Поиск по имени..." className="max-w-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(f => (
          <Card key={f.id} variant="glass" padding="lg" className="flex items-center gap-4">
            <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full border border-slate-700" />
            <div className="flex-1">
              <div className="text-sm font-bold text-white">{f.name} {f.isCurrentUser && '(Вы)'}</div>
              <div className="text-[11px] text-slate-400 font-mono">Уровень {f.level} • {f.xp} XP</div>
              <div className="flex items-center gap-2 mt-1 text-[10px]">
                <span className={`inline-flex items-center gap-1 ${f.status === 'online' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${f.status === 'online' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                  {f.status === 'online' ? 'онлайн' : 'офлайн'}
                </span>
                <span className="text-slate-500">• {f.lastActive}</span>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
