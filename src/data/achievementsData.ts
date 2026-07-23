import { Achievement } from '../types';

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach-first-step',
    title: 'Первый Рубикон',
    description: 'Завершите свой самый первый урок по кибербезопасности',
    icon: 'GraduationCap',
    rewardXP: 50,
    maxProgress: 1,
    category: 'learning'
  },
  {
    id: 'ach-streak-3',
    title: 'Страж Постоянства',
    description: 'Учитесь 3 дня подряд без перерывов',
    icon: 'Flame',
    rewardXP: 100,
    maxProgress: 3,
    category: 'streak'
  },
  {
    id: 'ach-streak-7',
    title: 'Кибер-Страж 7 Дней',
    description: 'Сохраняйте серию обучения в течение недели',
    icon: 'Zap',
    rewardXP: 250,
    maxProgress: 7,
    category: 'streak'
  },
  {
    id: 'ach-quiz-master',
    title: 'Гений Тестирования',
    description: 'Пройдите 5 тестов на максимальный балл (100%)',
    icon: 'Award',
    rewardXP: 200,
    maxProgress: 5,
    category: 'tests'
  },
  {
    id: 'ach-cert-collector',
    title: 'Сертифицированный Защитник',
    description: 'Получите свой первый официальный сертификат',
    icon: 'FileCheck',
    rewardXP: 300,
    maxProgress: 1,
    category: 'learning'
  },
  {
    id: 'ach-lab-expert',
    title: 'Хакинг в Песочнице',
    description: 'Успешно выполните 3 интерактивные лабораторные работы',
    icon: 'Terminal',
    rewardXP: 220,
    maxProgress: 3,
    category: 'security'
  },
  {
    id: 'ach-forum-hero',
    title: 'Голос Сообщества',
    description: 'Опубликуйте тему или полезный ответ на форуме угрозоведения',
    icon: 'MessageSquare',
    rewardXP: 150,
    maxProgress: 1,
    category: 'community'
  }
];
