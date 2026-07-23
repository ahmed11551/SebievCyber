from pathlib import Path

p = Path('src/data/coursesData.ts')
text = p.read_text()

# Find course-info-security-basics lessons array end
marker = "id: 'course-info-security-basics',"
idx = text.find(marker)
if idx == -1:
    print('course not found')
    exit(1)

ls = text.find('lessons: [', idx)
if ls == -1:
    print('lessons array not found')
    exit(1)

# Find matching closing bracket
brace = 0
le = None
for i in range(ls, len(text)):
    if text[i] == '[':
        brace += 1
    elif text[i] == ']':
        brace -= 1
        if brace == 0:
            le = i
            break

if le is None:
    print('no matching bracket')
    exit(1)

new_lesson = '''
      {
        id: 'les-infosec-3',
        title: 'Урок 3. Управление инцидентами и SOC базовые практики',
        durationMinutes: 18,
        xpReward: 110,
        description: 'Классификация инцидентов, escalation, triage, блокировка учеток, коммуникация.',
        contentMarkdown: `
### Классификация инцидентов
- Confidentiality breach
- Integrity violation
- Availability loss
### SOC baseline
1. Identify и classify
2. Contain
3. Eradicate
4. Recover
5. Lessons learned
        `,
        quiz: [
          {
            id: 'q-infosec-3',
            question: 'Что первое делают при инциденте утечки данных?',
            options: ['Удаляют все логи', 'Classify, triage и contain', 'Оповещают конкурентов', 'Перезагружают сервера'],
            correctAnswer: 1,
            explanation: 'Сначала classify/triage, потом contain, чтобы ограничить blast radius.'
          }
        ]
      }'''

text = text[:le] + new_lesson + text[le:]
p.write_text(text)
print('inserted les-infosec-3 successfully')
