import React, { useState } from 'react';
import { CourseModule, Lesson, UserProgress, Certificate } from '../types';
import { InteractiveLabs } from './InteractiveLabs';
import { BookOpen, CheckCircle2, Award, ArrowLeft, ArrowRight, ShieldCheck, HelpCircle, Sparkles, Lock, Play } from 'lucide-react';

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

  // Quiz state
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

    // Award XP and save progress
    const isFirstTime = !user.completedLessonIds.includes(activeLesson.id);
    const xpEarned = isFirstTime ? activeLesson.xpReward : 20;

    setUser(prev => {
      const updatedLessons = isFirstTime ? [...prev.completedLessonIds, activeLesson.id] : prev.completedLessonIds;
      const updatedScores = { ...prev.quizScores, [activeLesson.id]: scorePercent };

      // Check if entire course is completed to generate a Certificate!
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
          // Trigger cert modal display
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

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      {!activeLesson ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              Интерактивные Курсы Кибербезопасности
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Академическая программа подготовки с интерактивными лабораторными работами и итоговым тестированием.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            Завершено модулей: <span className="text-cyan-400 font-bold">{user.completedLessonIds.length}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl">
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
      )}

      {/* CATALOG GRID */}
      {!activeLesson && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => {
            const completedCount = course.lessons.filter(l => user.completedLessonIds.includes(l.id)).length;
            const progressPercent = Math.round((completedCount / course.lessons.length) * 100);
            const hasCertificate = user.certificates.some(c => c.courseId === course.id);

            return (
              <div
                key={course.id}
                className="p-6 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl transition-all space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded font-mono ${
                      course.category === 'beginner' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      course.category === 'intermediate' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                      'bg-indigo-950 text-indigo-300 border border-indigo-800'
                    }`}>
                      {course.category}
                    </span>
                    {hasCertificate && (
                      <span className="flex items-center space-x-1 text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        <Award className="w-3.5 h-3.5" />
                        <span>Сертификат Выдан</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">{course.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{course.description}</p>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span>Прогресс курса:</span>
                      <span>{completedCount} из {course.lessons.length} уроков ({progressPercent}%)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Lessons list */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {course.lessons.map(les => {
                    const isDone = user.completedLessonIds.includes(les.id);
                    return (
                      <div
                        key={les.id}
                        onClick={() => handleStartLesson(course, les)}
                        className="p-3 bg-slate-950/80 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
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
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ACTIVE LESSON READER */}
      {activeLesson && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-6 shadow-2xl">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-xs text-cyan-400 font-mono uppercase tracking-widest">Интерактивный Модуль</span>
              <h2 className="text-2xl font-extrabold text-white">{activeLesson.title}</h2>
              <p className="text-sm text-slate-300">{activeLesson.description}</p>
            </div>

            {/* Markdown Lesson Content */}
            <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line">
              {activeLesson.contentMarkdown}
            </div>

            {/* Interactive Lab component if present */}
            {activeLesson.interactiveLabType && (
              <InteractiveLabs
                labType={activeLesson.interactiveLabType}
                onLabComplete={(bonusXp) => {
                  setUser(prev => ({ ...prev, xp: prev.xp + bonusXp }));
                }}
              />
            )}
          </div>

          {/* END OF LESSON QUIZ */}
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
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < activeLesson.quiz.length}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors shadow-lg"
              >
                Завершить Тест и Проверить Ответы
              </button>
            ) : (
              <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-xl text-center space-y-3">
                <div className="text-lg font-bold text-emerald-400">
                  Тест успешно завершен! Результат: {quizScore}%
                </div>
                <p className="text-xs text-slate-300">
                  Ваши знания успешно зафиксированы в личном профиле и отправлены в облако.
                </p>
                <button
                  onClick={() => setActiveLesson(null)}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Вернуться к списку уроков
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
