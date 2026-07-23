import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, X, UserCheck, Zap, Lock, CreditCard, Award, MessageSquare, Star } from 'lucide-react';
import { UserProgress } from '../types';

interface VipMentorshipModalProps {
  user: UserProgress;
  setUser: React.Dispatch<React.SetStateAction<UserProgress>>;
  onClose: () => void;
}

export const VipMentorshipModal: React.FC<VipMentorshipModalProps> = ({
  user,
  setUser,
  onClose
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'vip' | 'corporate'>('vip');
  const [isSuccess, setIsSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'ahmed' || promoCode.trim().toLowerCase() === 'sebiev' || promoCode.trim().toLowerCase() === 'cyber') {
      setDiscountApplied(true);
    } else {
      alert('Неверный промокод! Попробуйте промокод AHMED для скидки 20%');
    }
  };

  const handleSubscribe = () => {
    setIsSuccess(true);
    // Grant VIP badge / bonus XP to user
    setTimeout(() => {
      setUser(prev => ({
        ...prev,
        xp: prev.xp + 1000,
        level: Math.max(prev.level, 5),
        preferences: {
          ...prev.preferences,
          accentColor: '#06b6d4'
        }
      }));
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-cyan-500/50 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border-b border-cyan-500/30">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Mentor Photo / Avatar Banner */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-1 shadow-xl shadow-cyan-950">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex flex-col items-center justify-center text-center p-2">
                  <UserCheck className="w-10 h-10 text-cyan-400 mb-1" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Ахмед Себиев</span>
                  <span className="text-[8px] text-cyan-300">CISO & Founder</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-black" /> GURU
              </div>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Главный Эксперт по ИБ: Ахмед Себиев</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Премиум Доступ & Личное Менторство от Ахмеда Себиева
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Перейдите от базовых знаний к уровню Senior Security Engineer. Получите прямые консультации, личное код-ревью и подтвержденный сертифицированный статус.
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        {!isSuccess ? (
          <div className="p-6 sm:p-8 space-y-8">
            {/* Mentor Credentials Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">12+ Лет Опыта</div>
                  <div className="text-[10px] text-slate-400">Offensive & Defense Architect</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">500+ Выпускников</div>
                  <div className="text-[10px] text-slate-400">В топ финтех & ИТ компаниях</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">1-on-1 Чат</div>
                  <div className="text-[10px] text-slate-400">Прямая связь с Ахмедом</div>
                </div>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* PRO Tier */}
              <div
                onClick={() => setSelectedPlan('pro')}
                className={`relative p-6 rounded-2xl border cursor-pointer transition-all ${
                  selectedPlan === 'pro'
                    ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-950/50 scale-[1.02]'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">Курсант PRO</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">
                    {discountApplied ? '2 390' : '2 990'} ₽
                  </span>
                  <span className="text-xs text-slate-400">/ месяц</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">Доступ ко всем курсам и официальным дипломам</p>

                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" /> Доступ ко всем 8+ курсам
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" /> Дипломы с QR и реестром
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" /> Доступ к симулятору атак
                  </li>
                </ul>
              </div>

              {/* VIP Mentor Tier (Featured) */}
              <div
                onClick={() => setSelectedPlan('vip')}
                className={`relative p-6 rounded-2xl border cursor-pointer transition-all ${
                  selectedPlan === 'vip'
                    ? 'bg-slate-900 border-amber-400 shadow-2xl shadow-amber-950/60 scale-[1.03] ring-2 ring-amber-400/30'
                    : 'bg-slate-900/60 border-slate-700 hover:border-amber-500/50'
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow">
                  ★ ВЫБОР АХМЕДА СЕБИЕВА
                </div>

                <div className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">VIP Менторство</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">
                    {discountApplied ? '7 990' : '9 990'} ₽
                  </span>
                  <span className="text-xs text-slate-400">/ месяц</span>
                </div>
                <p className="mt-2 text-xs text-slate-300">Личный разбор с Ахмедом Себиевым + Трудоустройство</p>

                <ul className="mt-6 space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2 font-semibold text-amber-300">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0" /> Личные 1-on-1 сессии с Ахмедом
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0" /> Индивидуальный Код-Ревью
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0" /> Закрытый Telegram чат с Ахмедом
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0" /> Прямая рекомендация HR топовых компаний
                  </li>
                </ul>
              </div>

              {/* Corporate Tier */}
              <div
                onClick={() => setSelectedPlan('corporate')}
                className={`relative p-6 rounded-2xl border cursor-pointer transition-all ${
                  selectedPlan === 'corporate'
                    ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-950/50 scale-[1.02]'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-wider">B2B / Команда</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">49 000 ₽</span>
                  <span className="text-xs text-slate-400">/ разово</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">Аудит безопасности компании + Обучение команды</p>

                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" /> Экспресс-аудит инфраструктуры
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" /> Тестирование 10+ сотрудников
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" /> Отчет соответствия 152-ФЗ
                  </li>
                </ul>
              </div>
            </div>

            {/* Promo Code & Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Промокод (введите AHMED)"
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 w-full sm:w-48"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl transition-colors"
                >
                  Применить
                </button>
                {discountApplied && (
                  <span className="text-xs text-emerald-400 font-bold">Скидка -20% применилась!</span>
                )}
              </div>

              <button
                onClick={handleSubscribe}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-sm rounded-xl shadow-xl shadow-amber-950 flex items-center justify-center space-x-2 transition-transform hover:scale-105"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Получить VIP Доступ к Ахмеду Себиеву</span>
              </button>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-10 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">
                ПОЗДРАВЛЯЕМ! VIP ДОСТУП АКТИВИРОВАН 🎉
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                Вам начислен <strong className="text-amber-400">+1000 XP</strong> и приоритетный статус в системе. Ахмед Себиев уже подготовил для вас персональные материалы и индивидуальный план развития!
              </p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-cyan-500/40 text-xs text-cyan-300 max-w-md mx-auto space-y-1">
              <div className="font-bold">Инструкция для связи с Ахмедом Себиевым:</div>
              <p className="text-slate-300">Напишите в закрытый Telegram-бот или воспользуйтесь боковым ИИ-ассистентом с меткой VIP.</p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl"
            >
              Вернуться в Личный Кабинет
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
