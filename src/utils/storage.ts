import { UserProgress } from '../types';

const STORAGE_KEY = 'cybershield_user_progress_v2';

export const DEFAULT_USER_PROGRESS: UserProgress = {
  userId: 'user_cybershield_101',
  fullName: 'Александр Новиков',
  email: 'alex.novikov@cybershield.ru',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
  xp: 1250,
  level: 5,
  streakDays: 6,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: ['les-hygiene-1'],
  passedQuizIds: ['q-hyg-1'],
  quizScores: {
    'les-hygiene-1': 100
  },
  unlockedAchievementIds: ['ach-first-step', 'ach-streak-3'],
  certificates: [
    {
      id: 'cert-101',
      courseId: 'course-cyber-hygiene',
      courseTitle: 'Основы Кибергигиены и Защита Персональных Данных',
      userFullName: 'Александр Новиков',
      issueDate: '2026-07-20',
      score: 95,
      verificationCode: 'CS-HYG-2026-8841',
      skills: ['152-ФЗ Compliance', 'Password Entropy', '2FA & Passkeys', 'Encryption']
    }
  ],
  preferences: {
    theme: 'cyber-dark',
    nightReadingMode: false,
    notificationsEnabled: true,
    dailyReminderTime: '19:00',
    offlineModeEnabled: false,
    syncCloudEnabled: true,
    accentColor: '#06b6d4'
  },
  activityLog: [
    { date: '2026-07-17', xpGained: 150, lessonsCompleted: 1, testsTaken: 1 },
    { date: '2026-07-18', xpGained: 200, lessonsCompleted: 2, testsTaken: 1 },
    { date: '2026-07-19', xpGained: 100, lessonsCompleted: 1, testsTaken: 1 },
    { date: '2026-07-20', xpGained: 300, lessonsCompleted: 2, testsTaken: 2 },
    { date: '2026-07-21', xpGained: 250, lessonsCompleted: 1, testsTaken: 1 },
    { date: '2026-07-22', xpGained: 250, lessonsCompleted: 1, testsTaken: 1 }
  ]
};

export function loadUserProgress(): UserProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Auto streak check
      const today = new Date().toISOString().split('T')[0];
      if (parsed.lastActiveDate !== today) {
        const last = new Date(parsed.lastActiveDate);
        const curr = new Date(today);
        const diffDays = Math.floor((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 1) {
          parsed.streakDays += 1;
        } else if (diffDays > 1) {
          parsed.streakDays = 1;
        }
        parsed.lastActiveDate = today;
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed loading progress from storage:', e);
  }
  return DEFAULT_USER_PROGRESS;
}

export function saveUserProgress(user: UserProgress): UserProgress {
  // Level recalculation based on XP (every 300 XP = 1 level)
  const calculatedLevel = Math.max(1, Math.floor(user.xp / 300) + 1);
  const updated = {
    ...user,
    level: calculatedLevel
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Async sync with cloud server
    if (updated.preferences.syncCloudEnabled) {
      fetch('/api/sync/user-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: updated.userId,
          progressData: updated
        })
      }).catch(err => console.warn('Cloud sync background error:', err));
    }
  } catch (e) {
    console.error('Failed saving user progress:', e);
  }

  return updated;
}
