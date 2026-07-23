import { Friend, ChatRoom, CollabTask } from '../types';

export const FRIENDS_DATA: Friend[] = [
  { id: 'u1', name: 'Алексей Петров', avatar: 'https://i.pravatar.cc/150?u=a1', level: 5, status: 'online', xp: 1340, lastActive: 'сейчас' },
  { id: 'u2', name: 'Мария Соколова', avatar: 'https://i.pravatar.cc/150?u=m2', level: 8, status: 'online', xp: 2410, lastActive: '5 мин назад' },
  { id: 'u3', name: 'Иван Лебедев', avatar: 'https://i.pravatar.cc/150?u=i3', level: 4, status: 'offline', xp: 870, lastActive: '2 часа назад' },
  { id: 'u4', name: 'Ольга Крылова', avatar: 'https://i.pravatar.cc/150?u=o4', level: 6, status: 'online', xp: 1560, lastActive: '1 часа назад' }
];

export const CHAT_ROOMS_DATA: ChatRoom[] = [
  {
    id: 'room-general',
    participants: ['u1', 'u2'],
    messages: [
      { id: 'm1', senderId: 'u2', text: 'Привет! Как успехи по OWASP?', timestamp: '10:42', type: 'text' },
      { id: 'm2', senderId: 'u1', text: 'Прошел SQLi, завтра XSS.', timestamp: '10:44', type: 'text' }
    ]
  }
];

export const COLLAB_TASKS_DATA: CollabTask[] = [
  { id: 't1', title: 'Провести разбор фишинговой кампании', description: 'Собрать заголовки, ссылки и вывод по phishing sample.', assignees: ['u1', 'u2'], status: 'in_progress', tags: ['Разбор', 'Phishing'] },
  { id: 't2', title: 'Написать YARA-правило для IOC', description: 'На основе предоставленного IOC сделать минимально рабочее правило.', assignees: ['u1'], status: 'open', tags: ['YARA', 'IoC'] },
  { id: 't3', title: 'Составить отчёт по CTF', description: 'Сформировать письменный отчёт с уникальными находками.', assignees: ['u1', 'u2', 'u3'], status: 'done', tags: ['CTF', 'Отчёт'] }
];
