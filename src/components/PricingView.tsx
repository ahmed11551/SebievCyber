import React, { useState } from 'react';
import { CheckCircle2, Crown, Shield } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '0 ₽',
    period: 'навсегда',
    description: 'Доступ к базовым курсам и форуму.',
    features: ['3 базовых курса', 'Форум', 'Leaderboard', 'База знаний'],
    cta: 'Начать',
    variant: 'secondary' as const
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '990 ₽',
    period: '/ мес',
    description: 'Все курсы, лабы и приоритетная поддержка.',
    features: ['Все курсы', 'Интерактивные лабы', 'PDF-отчёты', 'Приоритетная поддержка', 'Offline-режим'],
    cta: 'Оформить Pro',
    variant: 'primary' as const,
    highlighted: true
  },
  {
    id: 'team',
    name: 'Team',
    price: 'от 4990 ₽',
    period: '/ мес',
    description: 'Для команд и корпоративных групп.',
    features: ['Корпоративный доступ', 'Групповые CTF', 'Admin-панель', 'Audit-логи', 'SLA'],
    cta: 'Связаться',
    variant: 'secondary' as const
  }
];

export const PricingView: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelect = (planId: string) => {
    setLoading(planId);
    setTimeout(() => setLoading(null), 800);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-slate-900 border border-cyan-500/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Тарифы и <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">подписка</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mt-2">
            Выберите формат обучения: бесплатный старт, про-доступ или корпоративный режим.
          </p>
        </div>

        <Badge variant="cyan" size="sm">
          <Shield className="w-3 h-3 inline mr-1" />
          152-ФZ compliance billing
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map(plan => (
          <Card key={plan.id} variant={plan.highlighted ? 'glass' : 'default'} padding="lg" className={`space-y-4 ${plan.highlighted ? 'border-cyan-500/40 shadow-2xl shadow-cyan-950/40' : ''}`}>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{plan.name}</h3>
                {plan.highlighted && <Badge variant="cyan" size="sm"><Crown className="w-3 h-3 inline mr-1" />Лучший выбор</Badge>}
              </div>
              <p className="text-xs text-slate-300">{plan.description}</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">{plan.price}</span>
              <span className="text-xs text-slate-400">{plan.period}</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-200">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.variant}
              size="md"
              className="w-full"
              onClick={() => handleSelect(plan.id)}
            >
              {loading === plan.id ? 'Обработка...' : plan.cta}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
