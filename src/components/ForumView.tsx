import React, { useState } from 'react';
import { ForumThread, UserProgress } from '../types';
import { FORUM_THREADS_DATA } from '../data/forumData';
import { MessageSquare, ThumbsUp, CheckCircle, Plus, Search, Tag, Send, User } from 'lucide-react';

interface ForumViewProps {
  user: UserProgress;
  onAwardXP: (amount: number) => void;
}

export const ForumView: React.FC<ForumViewProps> = ({ user, onAwardXP }) => {
  const [threads, setThreads] = useState<ForumThread[]>(FORUM_THREADS_DATA);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Thread State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Анализ Фишинга & Угроз');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Угроза, Разбор');

  // Selected thread discussion view
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
    onAwardXP(150); // Reward XP for community contribution
  };

  const handleUpvote = (threadId: string) => {
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return { ...t, upvotes: t.upvotes + 1 };
      }
      return t;
    }));
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
    <div className="space-y-6">
      {/* HEADER */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            Форум Киберугроз & Обсуждения
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Площадка обмена опытом, разбора фишинговых писем, уязвимостей и экспертных ответов.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl flex items-center space-x-2 transition-colors shadow-lg shadow-cyan-950"
        >
          <Plus className="w-4 h-4" />
          <span>Создать Новую Тему (+150 XP)</span>
        </button>
      </div>

      {/* DETAILED THREAD VIEW OR LIST */}
      {selectedThread ? (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6 shadow-2xl">
          <button
            onClick={() => setSelectedThread(null)}
            className="text-xs text-cyan-400 hover:underline font-semibold"
          >
            ← Вернуться к списку обсуждений
          </button>

          <div className="space-y-4 border-b border-slate-800 pb-6">
            <div className="flex items-center space-x-3">
              <img src={selectedThread.author.avatar} alt={selectedThread.author.name} className="w-10 h-10 rounded-full border border-slate-700" />
              <div>
                <div className="text-sm font-bold text-white">{selectedThread.author.name}</div>
                <div className="text-[11px] text-slate-400 font-mono">Уровень {selectedThread.author.level} • {selectedThread.createdAt}</div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white">{selectedThread.title}</h2>
            <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">{selectedThread.content}</p>

            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={() => handleUpvote(selectedThread.id)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 rounded-lg text-xs text-cyan-400 border border-slate-800 font-mono"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{selectedThread.upvotes} Голосов</span>
              </button>
            </div>
          </div>

          {/* COMMENTS LIST */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Ответы Экспертов ({selectedThread.comments.length})</h3>

            <div className="space-y-3">
              {selectedThread.comments.map(c => (
                <div key={c.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-200">{c.author.name}</span>
                      <span className="text-slate-500 font-mono text-[10px]">• Уровень {c.author.level}</span>
                    </div>
                    {c.isSolution && (
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px] font-mono">
                        ✓ Решение проблемы
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.content}</p>
                </div>
              ))}
            </div>

            {/* ADD COMMENT BAR */}
            <div className="pt-4 flex items-center space-x-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                placeholder="Напишите ваш ответ или рекомендацию..."
                className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по темам, фишинговым атакам, уязвимостям..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-3">
            {filteredThreads.map(th => (
              <div
                key={th.id}
                onClick={() => setSelectedThread(th)}
                className="p-5 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl cursor-pointer transition-all space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <img src={th.author.avatar} alt={th.author.name} className="w-6 h-6 rounded-full border border-slate-700" />
                    <span className="font-bold text-slate-200">{th.author.name}</span>
                    <span className="text-slate-500 font-mono text-[10px]">• {th.createdAt}</span>
                  </div>
                  {th.isSolved && (
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px] font-mono">
                      ✓ Решено
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white hover:text-cyan-300 transition-colors">{th.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{th.content}</p>

                <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-800/80">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleUpvote(th.id); }}
                      className="flex items-center space-x-1 hover:text-cyan-300"
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE THREAD MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Создать Тему в Сообществе (+150 XP)</h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Заголовок темы:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Заголовок вопроса или уязвимости..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Подробное описание:</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                placeholder="Опишите ситуацию, предоставьте заголовки писем или фрагменты кода..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg"
              >
                Отмена
              </button>
              <button
                onClick={handleCreateThread}
                className="px-4 py-2 bg-cyan-600 text-white text-xs font-bold rounded-lg"
              >
                Опубликовать Тему
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
