import { ForumThread, LeaderboardUser } from '../types';

export const FORUM_THREADS_DATA: ForumThread[] = [
  {
    id: 'th-1',
    author: {
      name: 'Алексей Медведев',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      level: 14,
      badge: 'Red Team Specialist'
    },
    title: 'Анализ поддельного уведомления "Регламентные работы Госуслуг" с фишинговым редиректом',
    category: 'Анализ Фишинга & Угроз',
    content: 'Вчера на почту нескольких сотрудников пришло письмо якобы от службы поддержки Госуслуг с требованием сменить пароль. Ссылка вела на домен `gosuslugi-pass-verify.ru`. Давайте разберем служебные заголовки письма и структуру формы.',
    createdAt: '2026-07-22 11:20',
    upvotes: 28,
    commentsCount: 5,
    tags: ['Фишинг', 'Госуслуги', 'Разбор_Инцидента'],
    isSolved: true,
    comments: [
      {
        id: 'c-101',
        author: {
          name: 'Елена Соколова',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
          level: 18
        },
        content: 'Отличный разбор! Домен уже добавлен в черные списки фильтров NVD и блокируется на уровне DNS-серверов Quad9.',
        createdAt: '2026-07-22 12:05',
        upvotes: 12,
        isSolution: true
      },
      {
        id: 'c-102',
        author: {
          name: 'Дмитрий Волков',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
          level: 9
        },
        content: 'Обратите внимание на DKIM подпись в заголовке — она полностью отсутствовала, что позволяет фильтровать такие сообщения на уровне почтового Gateway.',
        createdAt: '2026-07-22 12:40',
        upvotes: 8
      }
    ]
  },
  {
    id: 'th-2',
    author: {
      name: 'Игорь Смирнов',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      level: 8,
      badge: 'Blue Team Sentinel'
    },
    title: 'Как правильно настроить заголовки Content Security Policy (CSP) для SPA приложений на React?',
    category: 'Вопросы по Курсам',
    content: 'Прохожу модуль OWASP Top 10 на нашей платформе. Возник вопрос: если приложение использует сторонние библиотеки анимаций и шрифты Google Fonts, какую точно директиву `font-src` и `script-src` указывать, чтобы не нарушать безопасность?',
    createdAt: '2026-07-21 16:45',
    upvotes: 14,
    commentsCount: 3,
    tags: ['CSP', 'React', 'OWASP', 'WebSecurity'],
    isSolved: false,
    comments: [
      {
        id: 'c-201',
        author: {
          name: 'Виктор Рыбаков',
          avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
          level: 22
        },
        content: 'Для Google Fonts используйте: `font-src \'self\' https://fonts.gstatic.com; style-src \'self\' https://fonts.googleapis.com;`. А для скриптов желательно использовать хэши или nonce токены.',
        createdAt: '2026-07-21 17:30',
        upvotes: 15,
        isSolution: true
      }
    ]
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    rank: 1,
    id: 'usr-1',
    name: 'Виктор Рыбаков (CyberGhost)',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    level: 22,
    xp: 4850,
    streakDays: 42,
    certificatesCount: 4,
    badgesCount: 7,
    badgeTitle: 'Главный Архитектор Безопасности'
  },
  {
    rank: 2,
    id: 'usr-2',
    name: 'Елена Соколова',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    level: 18,
    xp: 3920,
    streakDays: 28,
    certificatesCount: 3,
    badgesCount: 6,
    badgeTitle: 'Мастер Анализа Угроз'
  },
  {
    rank: 3,
    id: 'usr-3',
    name: 'Алексей Медведев',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    level: 14,
    xp: 2980,
    streakDays: 19,
    certificatesCount: 2,
    badgesCount: 5,
    badgeTitle: 'Исследователь Vulnerabilities'
  },
  {
    rank: 4,
    id: 'usr-current',
    name: 'Александр Новиков (Вы)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    level: 5,
    xp: 1250,
    streakDays: 6,
    certificatesCount: 1,
    badgesCount: 3,
    badgeTitle: 'Страж Постоянства',
    isCurrentUser: true
  },
  {
    rank: 5,
    id: 'usr-5',
    name: 'Дмитрий Волков',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    level: 4,
    xp: 1100,
    streakDays: 5,
    certificatesCount: 1,
    badgesCount: 2,
    badgeTitle: 'Младший Аналитик'
  },
  {
    rank: 6,
    id: 'usr-6',
    name: 'Мария Павлова',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    level: 3,
    xp: 850,
    streakDays: 4,
    certificatesCount: 0,
    badgesCount: 2,
    badgeTitle: 'Новичок КиберЗащиты'
  }
];
