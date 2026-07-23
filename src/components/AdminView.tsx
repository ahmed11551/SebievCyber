import React, { useState } from 'react';
import { ShieldCheck, Users, BookOpen, Activity } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';

const ADMIN_USERS = [
  { id: 'u1', name: 'Алексей Петров', email: 'alexey@example.com', level: 5, xp: 1340, status: 'active' },
  { id: 'u2', name: 'Мария Соколова', email: 'maria@example.com', level: 8, xp: 2410, status: 'active' },
  { id: 'u3', name: 'Иван Лебедев', email: 'ivan@example.com', level: 4, xp: 870, status: 'blocked' }
];

const ADMIN_COURSES = [
  { id: 'course-cyber-hygiene', title: 'Основы Кибергигиены', students: 1240, published: true },
  { id: 'course-owasp-top10', title: 'OWASP Top 10 & API', students: 860, published: true },
  { id: 'course-pentest-basics', title: 'Penetration Testing Basics', students: 640, published: false }
];

const ADMIN_LOGS = [
  { id: 'l1', event: 'user.login', user: 'Алексей Петров', time: '10:42', ok: true },
  { id: 'l2', event: 'quiz.passed', user: 'Мария Соколова', time: '10:40', ok: true },
  { id: 'l3', event: 'payment.failed', user: 'Иван Лебедев', time: '10:38', ok: false }
];

type Tab = 'users' | 'courses' | 'logs';

export const AdminView: React.FC = () => {
  const [tab, setTab] = useState<Tab>('users');
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-amber-500/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            Админка
          </h1>
          <p className="text-xs text-slate-300 mt-1">Управление пользователями, курсами и логами.</p>
        </div>

        <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {([
            { id: 'users', label: 'Пользователи', icon: Users },
            { id: 'courses', label: 'Курсы', icon: BookOpen },
            { id: 'logs', label: 'Логи', icon: Activity }
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-2 ${tab === t.id ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <Card variant="glass" padding="md">
        <Input value={search} onChange={setSearch} placeholder="Поиск..." className="max-w-sm" />
      </Card>

      {tab === 'users' && (
        <Card variant="glass" padding="lg">
          <div className="space-y-3">
            {ADMIN_USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <div className="text-sm font-bold text-white">{u.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{u.email} • Уровень {u.level}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={u.status === 'active' ? 'emerald' : 'red'} size="sm">{u.status === 'active' ? 'Активен' : 'Заблокирован'}</Badge>
                  <span className="text-xs text-cyan-300 font-mono">{u.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'courses' && (
        <Card variant="glass" padding="lg">
          <div className="space-y-3">
            {ADMIN_COURSES.filter(c => c.title.toLowerCase().includes(search.toLowerCase())).map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <div className="text-sm font-bold text-white">{c.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.students} студентов • {c.published ? 'Опубликован' : 'Черновик'}</div>
                </div>
                <Button variant="secondary" size="sm">{c.published ? 'Снять' : 'Опубликовать'}</Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'logs' && (
        <Card variant="glass" padding="lg">
          <div className="space-y-3">
            {ADMIN_LOGS.filter(l => l.event.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase())).map(l => (
              <div key={l.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="text-sm font-bold text-white">{l.event}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{l.user} • {l.time}</div>
                </div>
                <Badge variant={l.ok ? 'emerald' : 'red'} size="sm">{l.ok ? 'OK' : 'FAIL'}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
