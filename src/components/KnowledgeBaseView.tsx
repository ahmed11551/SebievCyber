import React, { useState } from 'react';
import { KnowledgeArticle } from '../types';
import { KNOWLEDGE_ARTICLES } from '../data/knowledgeData';
import { BookOpen, Search, Tag, Clock, ShieldCheck, Download, WifiOff, Eye } from 'lucide-react';

interface KnowledgeBaseViewProps {
  nightMode: boolean;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({ nightMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(null);

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(KNOWLEDGE_ARTICLES.map(a => a.category)))];
  const difficulties = ['all', 'Базовый', 'Продвинутый', 'Эксперт'];

  const filteredArticles = KNOWLEDGE_ARTICLES.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'all' || art.difficulty === selectedDifficulty;
    return matchesSearch && matchesCat && matchesDiff;
  });

  return (
    <div className={`space-y-6 transition-colors duration-300 ${nightMode ? 'bg-amber-950/20 p-4 rounded-2xl border border-amber-900/40 text-amber-100' : ''}`}>
      {/* Search Header Bar */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              База Знаний & Нормативы Защиты Данных
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Справочник регламентов 152-ФЗ, архитекторов безопасности, методов противодействия вымогателям и офлайн-материалов.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg">
            <WifiOff className="w-4 h-4" />
            <span>Поддержка Офлайн-Режима</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по статьям, ГОСТам, 152-ФЗ, OWASP, тэгам..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 pt-2 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'Все категории' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLE READER MODAL OR GRID */}
      {activeArticle ? (
        <div className="p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-6 shadow-2xl">
          <button
            onClick={() => setActiveArticle(null)}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            ← Вернуться к базе знаний
          </button>

          <div className="space-y-3 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
              <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded">{activeArticle.category}</span>
              <span>• Длительность: {activeArticle.readingTimeMin} мин</span>
              <span>• Сложность: {activeArticle.difficulty}</span>
            </div>
            <h2 className="text-2xl font-bold text-white leading-snug">{activeArticle.title}</h2>
          </div>

          <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line">
            {activeArticle.content}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map(art => (
            <div
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="p-6 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl cursor-pointer transition-all space-y-4 shadow-lg flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 bg-slate-950 text-cyan-300 border border-slate-800 rounded font-mono text-[10px]">
                    {art.category}
                  </span>
                  <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readingTimeMin} мин</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{art.summary}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {art.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-950 text-slate-400 rounded text-[10px] font-mono">
                      #{t}
                    </span>
                  ))}
                </div>
                {art.cachedOffline && (
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    ✓ Доступно офлайн
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
