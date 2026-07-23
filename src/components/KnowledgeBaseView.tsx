import React, { useState } from 'react';
import { KnowledgeArticle } from '../types';
import { KNOWLEDGE_ARTICLES } from '../data/knowledgeData';
import { BookOpen, Search, Tag, Clock, ShieldCheck, Download, WifiOff, Eye } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';

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
    <div className={`space-y-8 transition-colors duration-300 ${nightMode ? 'bg-amber-950/20 p-4 rounded-2xl border border-amber-900/40 text-amber-100' : ''}`}>
      {/* Search Header Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="relative z-10 p-6 md:p-8 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-300">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Knowledge Base & Compliance</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                База <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">знаний</span>
              </h1>
              <p className="text-slate-300 text-sm max-w-2xl">
                Справочник регламентов 152-ФЗ, методов противодействия вымогателям и экспертной аналитики.
              </p>
            </div>

            <Card variant="glass" padding="md" className="flex items-center gap-3">
              <WifiOff className="w-5 h-5 text-emerald-400" />
              <div className="text-xs">
                <div className="text-slate-400 font-mono uppercase tracking-wider">Режим</div>
                <div className="text-white font-bold">Офлайн Доступен</div>
              </div>
            </Card>
          </div>

          <Input
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Поиск по статьям, ГОСТам, 152-ФЗ, OWASP, тэгам..."
            className="max-w-2xl"
          />

          <div className="flex flex-wrap gap-2 pt-2 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white border-cyan-400'
                    : 'bg-slate-950 text-slate-300 hover:text-white border-slate-800'
                }`}
              >
                {cat === 'all' ? 'Все категории' : cat}
              </button>
            ))}
          </div>
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
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
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
            <Card
              key={art.id}
              variant="glass"
              padding="lg"
              className="group cursor-pointer"
              onClick={() => setActiveArticle(art)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 bg-slate-950 text-cyan-300 border border-slate-800 rounded font-mono text-[10px]">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readingTimeMin} мин</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mt-1">{art.summary}</p>
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
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
