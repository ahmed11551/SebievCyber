import React, { useState } from 'react';
import { ListTodo } from 'lucide-react';
import { COLLAB_TASKS_DATA } from '../data/socialData';
import { CollabTask } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';

export const CollabView: React.FC = () => {
  const [tasks, setTasks] = useState<CollabTask[]>(COLLAB_TASKS_DATA);
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');

  const filtered = tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())));

  const create = () => {
    if (!title.trim() || !desc.trim()) return;
    const t: CollabTask = {
      id: `t${Date.now()}`,
      title: title.trim(),
      description: desc.trim(),
      assignees: ['me'],
      status: 'open',
      tags: tags.split(',').map(x => x.trim()).filter(Boolean)
    };
    setTasks(prev => [t, ...prev]);
    setTitle('');
    setDesc('');
    setTags('');
  };

  const move = (id: string, status: CollabTask['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-4 shadow-2xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ListTodo className="w-6 h-6 text-amber-400" />
            Совместные задачи
          </h1>
          <p className="text-xs text-slate-300 mt-1">Распределяйте задачи, ставьте теги и закрывайте работы вместе.</p>
        </div>

        <Input value={query} onChange={setQuery} placeholder="Поиск задач..." className="max-w-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['open', 'in_progress', 'done'] as const).map(status => (
          <Card key={status} variant="glass" padding="lg" className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <Badge variant={status === 'done' ? 'emerald' : status === 'in_progress' ? 'amber' : 'cyan'} size="sm">
                {status === 'open' ? 'Открыта' : status === 'in_progress' ? 'В работе' : 'Готово'}
              </Badge>
              <span className="text-slate-400 font-mono">{filtered.filter(t => t.status === status).length}</span>
            </div>

            <div className="space-y-2">
              {filtered.filter(t => t.status === status).map(t => (
                <div key={t.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-sm font-bold text-white">{t.title}</div>
                  <p className="text-xs text-slate-300 line-clamp-2">{t.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {t.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-900 text-slate-300 rounded text-[10px]">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {status !== 'open' && (
                      <Button variant="secondary" size="sm" onClick={() => move(t.id, 'open')}>
                        Открыть
                      </Button>
                    )}
                    {status !== 'in_progress' && status !== 'done' && (
                      <Button variant="primary" size="sm" onClick={() => move(t.id, 'in_progress')}>
                        Взять
                      </Button>
                    )}
                    {status !== 'done' && (
                      <Button variant="ghost" size="sm" onClick={() => move(t.id, 'done')}>
                        Готово
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card variant="glass" padding="lg" className="space-y-3">
        <h3 className="text-sm font-bold text-white">Создать задачу</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input value={title} onChange={setTitle} placeholder="Название задачи" />
          <Input value={tags} onChange={setTags} placeholder="Теги через запятую" />
        </div>
        <Input value={desc} onChange={setDesc} placeholder="Описание задачи" />
        <Button variant="primary" size="sm" onClick={create}>Создать</Button>
      </Card>
    </div>
  );
};
