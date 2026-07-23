export type ThemeMode = 'cyber-dark' | 'midnight-slate' | 'oled-black' | 'clean-light' | 'matrix-green';

export interface UserProgress {
  userId: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessonIds: string[];
  passedQuizIds: string[];
  quizScores: Record<string, number>; // quizId -> score %
  unlockedAchievementIds: string[];
  certificates: Certificate[];
  preferences: {
    theme: ThemeMode;
    nightReadingMode: boolean;
    notificationsEnabled: boolean;
    dailyReminderTime: string;
    offlineModeEnabled: boolean;
    syncCloudEnabled: boolean;
    accentColor: string;
  };
  activityLog: { date: string; xpGained: number; lessonsCompleted: number; testsTaken: number }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string;
  codeSnippet?: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  xpReward: number;
  description: string;
  contentMarkdown: string;
  interactiveLabType?: 'phishing-detector' | 'password-analyzer' | 'sqli-simulator' | 'encryption-lab' | 'header-checker' | 'xss-lab' | 'ssrf-lab' | 'phishing-simulator' | 'token-analyzer';
  quiz: QuizQuestion[];
}

export interface CourseModule {
  id: string;
  title: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'compliance';
  description: string;
  iconName: string;
  lessons: Lesson[];
  certificateTitle: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  userFullName: string;
  issueDate: string;
  score: number;
  verificationCode: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rewardXP: number;
  maxProgress: number;
  category: 'learning' | 'streak' | 'tests' | 'community' | 'security';
}

export interface ThreatItem {
  id: string;
  cveId?: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  summary: string;
  vectorDetails: string;
  date: string;
  mitigation: string;
  affectedSystems: string[];
  isRealTimePush?: boolean;
}

export interface ForumThread {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: number;
    badge: string;
  };
  title: string;
  category: string;
  content: string;
  createdAt: string;
  upvotes: number;
  commentsCount: number;
  tags: string[];
  isSolved: boolean;
  comments: {
    id: string;
    author: { name: string; avatar: string; level: number };
    content: string;
    createdAt: string;
    upvotes: number;
    isSolution?: boolean;
  }[];
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streakDays: number;
  certificatesCount: number;
  badgesCount: number;
  badgeTitle: string;
  isCurrentUser?: boolean;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  readingTimeMin: number;
  summary: string;
  content: string;
  tags: string[];
  difficulty: 'Базовый' | 'Продвинутый' | 'Эксперт';
  lastUpdated: string;
  cachedOffline: boolean;
}
