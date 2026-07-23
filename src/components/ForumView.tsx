import React, { useState } from 'react';
import { ForumThread, UserProgress } from '../types';
import { FORUM_THREADS_DATA } from '../data/forumData';
import { MessageSquare, ThumbsUp, CheckCircle, Plus, Search, Tag, Send, User } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';

interface ForumViewProps {
  user: UserProgress;
  onAwardXP: (amount: number) => void;
}

export const ForumView: React.FC<ForumViewProps> = ({ user, onAwardXP }) => {
  const [threads, setThreads] = useState<ForumThread[]>(FORUM_THREADS_DATA);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Анализ Фишинга & Угроз');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Угроза, Разбор');

  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleCreateThread = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const created: ForumThread = {
      id: `th_${Date.now()}`,
      author: {
        name: user.fullName,
        avatar: user.avatarUrl,
        level: user.level,
        badge: 'Аналитик Безопасности'
      },
      title: newTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
      createdAt: new Date().toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }),
      upvotes: 1,
      commentsCount: 0,
      tags: newTags.split(',').map(t => t.trim()),
      isSolved: false,
      comments: []
    };

    setThreads([created, ...threads]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewContent('');
    onAwardXP(150);
  };

  const handleUpvote = (threadId: string) => {
    setThreads(prev => prev.map(t => t.id === threadId ? { ...t, upvotes: t.upvotes + 1 } : t));
    if (selectedThread && selectedThread.id === threadId) {
      setSelectedThread(prev => prev ? { ...prev, upvotes: prev.upvotes + 1 } : null);
    }
  };

  const handleAddComment = () => {
    if (!selectedThread || !commentText.trim()) return;

    const commentObj = {
      id: `c_${Date.now()}`,
      author: {
        name: user.fullName,
        avatar: user.avatarUrl,
        level: user.level
      },
      content: commentText.trim(),
      createdAt: new Date().toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      upvotes: 0
    };

    const updatedThread = {
      ...selectedThread,
      commentsCount: selectedThread.commentsCount + 1,
      comments: [...selectedThread.comments, commentObj]
    };

    setSelectedThread(updatedThread);
    setThreads(prev => prev.map(t => t.id === selectedThread.id ? updatedThread : t));
    setCommentText('');
    onAwardXP(30);
  };

  const filteredThreads = threads.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'all' || t.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-300">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Community & Threat Intel</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Форум <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">киберугроз</span>
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              Площадка обмена опытом, разбора фишинговых писем, уязвимостей и экспертных ответов.
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4" />
            <span>Создать Тему (+150 XP)</span>
          </Button>
        </div>
      </div>

      {/* DETAILED THREAD VIEW OR LIST */}
      {selectedThread ? (
        <div className="p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-6 shadow-2xl">
          <button
            onClick={() => setSelectedThread(null)}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            ← Вернуться к списку обсуждений
          </button>

          <div className="space-y-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <img src={selectedThread.author.avatar} alt={selectedThread.author.name} className="w-10 h-10 rounded-full border border-slate-700" />
              <div>
                <div className="text-sm font-bold text-white">{selectedThread.author.name}</div>
                <div className="text-[11px] text-slate-400 font-mono">Уровень {selectedThread.author.level} • {selectedThread.createdAt}</div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white">{selectedThread.title}</h2>
            <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">{selectedThread.content}</p>

            <div className="flex items-center gap-4 pt-2">
              <Button variant="secondary" size="sm" onClick={() => handleUpvote(selectedThread.id)}>
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{selectedThread.upvotes} Голосов</span>
              </Button>
              {selectedThread.isSolved && (
                <Badge variant="emerald" size="sm">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Решено</span>
                </Badge>
              )}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Ответы Экспертов ({selectedThread.comments.length})</h3>

            <div className="space-y-3">
              {selectedThread.comments.map(c => (
                <Card key={c.id} variant="glass" padding="md" className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold text-slate-200">{c.author.name}</span>
                      <span className="text-slate-500 font-mono text-[10px]">• Уровень {c.author.level}</span>
                    </div>
                    {c.isSolution && (
                      <Badge variant="emerald" size="sm">✓ Решение проблемы</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.content}</p>
                </Card>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-2">
              <Input
                value={commentText}
                onChange={setCommentText}
                placeholder="Напишите ваш ответ или рекомендацию..."
                className="flex-1"
              />
              <Button variant="primary" size="md" onClick={handleAddComment}>
                <Send className="w-4 h-4" />
                <span>Отправить</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card variant="glass" padding="md">
            <Input
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Поиск по темам, фишинговым атакам, уязвимостям..."
              className="max-w-2xl"
            />
          </Card>

          <div className="space-y-4">
            {filteredThreads.map(th => (
              <Card
                key={th.id}
                variant="glass"
                padding="lg"
                className="group cursor-pointer"
                onClick={() => setSelectedThread(th)}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={th.author.avatar} alt={th.author.name} className="w-6 h-6 rounded-full border border-slate-700" />
                    <span className="font-bold text-slate-200">{th.author.name}</span>
                    <span className="text-slate-500 font-mono text-[10px]">• {th.createdAt}</span>
                  </div>
                  {th.isSolved && <Badge variant="emerald" size="sm">✓ Решено</Badge>}
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{th.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mt-1">{th.content}</p>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleUpvote(th.id); }}
                      className="flex items-center gap-1 hover:text-cyan-300"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{th.upvotes}</span>
                    </button>
                    <span>💬 {th.commentsCount} ответов</span>
                  </div>
                  <div className="flex gap-1">
                    {th.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-950 text-slate-400 rounded text-[10px]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* CREATE THREAD MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <Card variant="glass" padding="lg" className="w-full max-w-xl space-y-4">
            <h3 className="text-lg font-bold text-white">Создать Тему в Сообществе (+150 XP)</h3>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Заголовок темы:</label>
              <Input value={newTitle} onChange={setNewTitle} placeholder="Заголовок вопроса или уязвимости..." />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Подробное описание:</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                placeholder="Опишите ситуацию, предоставьте заголовки писем или фрагменты кода..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setShowCreateModal(false)}>
                <span>Отмена</span>
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreateThread}>
                <span>Опубликовать Тему</span>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
