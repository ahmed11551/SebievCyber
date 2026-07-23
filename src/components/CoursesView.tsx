import React, { useState } from 'react';
import { CourseModule, Lesson, UserProgress, Certificate } from '../types';
import { InteractiveLabs } from './InteractiveLabs';
import {
  BookOpen, CheckCircle2, Award, ArrowLeft, ArrowRight, ShieldCheck,
  HelpCircle, Sparkles, Lock, Play, Target, Flame
} from 'lucide-react';
import { Box } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface CoursesViewProps {
  courses: CourseModule[];
  user: UserProgress;
  setUser: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenCertificate: (cert: Certificate) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  user,
  setUser,
  onOpenCertificate
}) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseModule | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleStartLesson = (course: CourseModule, lesson: Lesson) => {
    setSelectedCourse(course);
    setActiveLesson(lesson);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!activeLesson || quizSubmitted) return;

    let correctCount = 0;
    activeLesson.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const scorePercent = Math.round((correctCount / activeLesson.quiz.length) * 100);
    setQuizScore(scorePercent);
    setQuizSubmitted(true);

    const isFirstTime = !user.completedLessonIds.includes(activeLesson.id);
    const xpEarned = isFirstTime ? activeLesson.xpReward : 20;

    setUser(prev => {
      const updatedLessons = isFirstTime ? [...prev.completedLessonIds, activeLesson.id] : prev.completedLessonIds;
      const updatedScores = { ...prev.quizScores, [activeLesson.id]: scorePercent };

      let updatedCerts = [...prev.certificates];
      if (selectedCourse) {
        const allCourseLessonIds = selectedCourse.lessons.map(l => l.id);
        const isCourseFullyCompleted = allCourseLessonIds.every(id => updatedLessons.includes(id));
        const alreadyHasCert = updatedCerts.some(c => c.courseId === selectedCourse.id);

        if (isCourseFullyCompleted && !alreadyHasCert) {
          const newCert: Certificate = {
            id: `cert_${Date.now()}`,
            courseId: selectedCourse.id,
            courseTitle: selectedCourse.title,
            userFullName: prev.fullName,
            issueDate: new Date().toISOString().split('T')[0],
            score: scorePercent,
            verificationCode: `CS-${selectedCourse.category.toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            skills: ['OWASP Top 10', '152-ФЗ Compliance', 'Penetration Testing', 'Defensive Security']
          };
          updatedCerts.push(newCert);
          setTimeout(() => onOpenCertificate(newCert), 500);
        }
      }

      return {
        ...prev,
        xp: prev.xp + xpEarned,
        completedLessonIds: updatedLessons,
        quizScores: updatedScores,
        certificates: updatedCerts
      };
    });
  };

  const categoryAccent = (category: string) => {
    if (category === 'beginner') return { badge: 'emerald' as const, border: 'border-emerald-500/40', text: 'text-emerald-300' };
    if (category === 'intermediate') return { badge: 'cyan' as const, border: 'border-cyan-500/40', text: 'text-cyan-300' };
    return { badge: 'slate' as const, border: 'border-indigo-500/40', text: 'text-indigo-300' };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      {!activeLesson && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-300">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Образовательный Контур</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Каталог <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">курсов</span>
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              Выберите траекторию: от основ к продвинутому пентесту. Каждый курс состоит из модулей, лаборантских симуляций и итоговой аттестации.
            </p>
          </div>

          <Card variant="glass" padding="md" className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-amber-400" />
            <div className="text-xs">
              <div className="text-slate-400 font-mono uppercase tracking-wider">Завершено модулей</div>
              <div className="text-white font-bold text-base">{user.completedLessonIds.length}</div>
            </div>
          </Card>
        </div>
      )}

      {!activeLesson && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => {
            const completedCount = course.lessons.filter(l => user.completedLessonIds.includes(l.id)).length;
            const progressPercent = Math.round((completedCount / course.lessons.length) * 100);
            const hasCertificate = user.certificates.some(c => c.courseId === course.id);
            const accent = categoryAccent(course.category);

            return (
              <Card key={course.id} variant="glass" padding="lg" className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-24 -mt-24 transition-transform group-hover:scale-150" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={accent.badge} size="md">{course.category}</Badge>
                    {hasCertificate && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30">
                        <Award className="w-3.5 h-3.5" />
                        <span>Сертификат</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{course.description}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>Прогресс курса</span>
                      <span>{completedCount} / {course.lessons.length} • {progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Структура</div>
                    <div className="space-y-2">
                      {course.lessons.slice(0, 3).map(les => {
                        const isDone = user.completedLessonIds.includes(les.id);
                        return (
                          <div
                            key={les.id}
                            onClick={() => handleStartLesson(course, les)}
                            className="p-3 bg-slate-950/80 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                              ) : (
                                <Play className="w-4 h-4 text-cyan-400 flex-shrink-0 fill-cyan-400/20" />
                              )}
                              <div>
                                <div className="text-xs font-bold text-slate-200">{les.title}</div>
                                <div className="text-[10px] text-slate-400 font-mono">+{les.xpReward} XP • ~{les.durationMinutes} мин</div>
                              </div>
                            </div>
                            {!isDone && <ArrowRight className="w-4 h-4 text-slate-500" />}
                          </div>
                        );
                      })}
                      {course.lessons.length > 3 && (
                        <div className="text-[11px] text-slate-500 font-mono">+{course.lessons.length - 3} модулей в курсе</div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => handleStartLesson(course, course.lessons[0])}>
                      <Target className="w-3.5 h-3.5" />
                      <span>{progressPercent > 0 ? 'Продолжить обучение' : 'Начать курс'}</span>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* ACTIVE LESSON READER */}
      {activeLesson && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveLesson(null)}
                className="flex items-center space-x-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Вернуться к каталогу курсов</span>
              </button>
              <div className="text-xs text-slate-400 font-mono">
                Курс: <span className="text-white">{selectedCourse?.title}</span>
              </div>
            </div>

            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-xs text-cyan-400 font-mono uppercase tracking-widest">Интерактивный Модуль</span>
              <h2 className="text-2xl font-extrabold text-white">{activeLesson.title}</h2>
              <p className="text-sm text-slate-300">{activeLesson.description}</p>
            </div>

            <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line">
              {activeLesson.contentMarkdown}
            </div>

            {activeLesson.interactiveLabType && (
              <InteractiveLabs
                labType={activeLesson.interactiveLabType}
                onLabComplete={(bonusXp) => {
                  setUser(prev => ({ ...prev, xp: prev.xp + bonusXp }));
                }}
              />
            )}
          </div>

          <div className="p-6 md:p-8 bg-slate-900 border border-cyan-500/30 rounded-2xl space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  Итоговое Тестирование Знаний
                </h3>
                <p className="text-xs text-slate-400">Ответьте на контрольные вопросы для зачета результатов и получения XP</p>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 font-mono text-xs rounded border border-amber-500/30 font-bold">
                +{activeLesson.xpReward} XP
              </span>
            </div>

            <div className="space-y-6">
              {activeLesson.quiz.map((q, qIdx) => (
                <div key={q.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-slate-100">{qIdx + 1}. {q.question}</h4>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === optIdx;
                      const isCorrect = q.correctAnswer === optIdx;

                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (quizSubmitted) {
                        if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                        else if (isSelected && !isCorrect) btnStyle = 'bg-red-950/80 border-red-500 text-red-200';
                      } else if (isSelected) {
                        btnStyle = 'bg-cyan-950 border-cyan-500 text-cyan-200 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300">
                      <strong>Объяснение:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!quizSubmitted ? (
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < activeLesson.quiz.length}
              >
                <Sparkles className="w-4 h-4" />
                <span>Завершить Тест и Проверить Ответы</span>
              </Button>
            ) : (
              <Card variant="glass" padding="lg" className="text-center space-y-3">
                <div className="text-lg font-bold text-emerald-400">Тест успешно завершен! Результат: {quizScore}%</div>
                <p className="text-xs text-slate-300">Ваши знания успешно зафиксированы в личном профиле и отправлены в облако.</p>
                <Button variant="secondary" size="sm" onClick={() => setActiveLesson(null)}>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Вернуться к списку уроков</span>
                </Button>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
