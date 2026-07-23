import { jsPDF } from 'jspdf';
import { UserProgress } from '../types';

export function exportUserProgressPDF(user: UserProgress) {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(15, 23, 42); // Dark slate background
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(56, 189, 248); // Cyber blue
  doc.setFontSize(22);
  doc.text('CyberShield Academy', 15, 20);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('Официальный Отчет об Обучении и Активности', 15, 30);

  // User Overview Section
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.text('1. Профиль Участника', 15, 55);

  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.text(`ФИО Пользователя: ${user.fullName}`, 15, 65);
  doc.text(`Email: ${user.email}`, 15, 73);
  doc.text(`Текущий Уровень: ${user.level} (Всего XP: ${user.xp})`, 15, 81);
  doc.text(`Серия обучения (Streak): ${user.streakDays} дней подряд`, 15, 89);
  doc.text(`Дата генерации отчета: ${new Date().toLocaleDateString('ru-RU')}`, 15, 97);

  // Line Divider
  doc.setDrawColor(226, 232, 240);
  doc.line(15, 105, 195, 105);

  // Completed Certificates
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.text('2. Полученные Сертификаты', 15, 120);

  let currentY = 130;
  if (user.certificates.length === 0) {
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text('Сертификаты пока не получены. Завершите все уроки курса для аттестации.', 15, currentY);
    currentY += 15;
  } else {
    user.certificates.forEach((cert, index) => {
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text(`${index + 1}. ${cert.courseTitle}`, 15, currentY);
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`   Дата выдачи: ${cert.issueDate} | Код верификации: ${cert.verificationCode} | Результат: ${cert.score}%`, 15, currentY + 6);
      currentY += 16;
    });
  }

  // Line Divider
  doc.setDrawColor(226, 232, 240);
  doc.line(15, currentY + 5, 195, currentY + 5);
  currentY += 20;

  // Statistics & Activity
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.text('3. Статистика Прогресса Тестирования', 15, currentY);
  currentY += 12;

  const totalQuizzes = Object.keys(user.quizScores).length;
  const avgScore = totalQuizzes > 0
    ? Math.round(Object.values(user.quizScores).reduce((a, b) => a + b, 0) / totalQuizzes)
    : 0;

  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.text(`Пройдено интерактивных уроков: ${user.completedLessonIds.length}`, 15, currentY);
  doc.text(`Пройдено итоговых тестов: ${totalQuizzes}`, 15, currentY + 8);
  doc.text(`Средняя точность ответов: ${avgScore}%`, 15, currentY + 16);
  doc.text(`Разблокировано достижений: ${user.unlockedAchievementIds.length}`, 15, currentY + 24);

  // Footer Verification Note
  doc.setFillColor(241, 245, 249);
  doc.rect(15, 250, 180, 25, 'F');
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(9);
  doc.text('Данный документ сформирован автоматически образовательной платформой CyberShield Academy.', 20, 260);
  doc.text('Для проверки подлинности сертификатов используйте скан кода верификации в личном кабинете.', 20, 267);

  // Download file
  doc.save(`CyberShield_Progress_Report_${user.fullName.replace(/\s+/g, '_')}.pdf`);
}
