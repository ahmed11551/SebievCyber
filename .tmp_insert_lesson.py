from pathlib import Path
p = Path('src/data/coursesData.ts')
text = p.read_text()
marker = "id: 'course-malware-basics',"
idx = text.find(marker)
if idx == -1:
    raise SystemExit('course not found')
ls = text.find('lessons: [', idx)
if ls == -1:
    raise SystemExit('lessons array not found')
brace = 0
le = None
for i in range(ls, len(text)):
    if text[i] == '[': brace += 1
    elif text[i] == ']':
        brace -= 1
        if brace == 0:
            le = i
            break
if le is None:
    raise SystemExit('no matching bracket')

new_lesson = '''
      {
        id: 'les-malware-3',
        title: 'Урок 3. YARA, IOC и отчет по вредоносному ПО',
        durationMinutes: 24,
        xpReward: 160,
        description: 'YARA правила, IOC формат, Arkime/Suricata интеграция и блокировка индикаторов.',
        contentMarkdown: `
### YARA basics
- Rule structure: meta/strings/condition
### IOC format
- file hash, domain, ip, yara rules
        `,
        quiz: [
          {
            id: 'q-malware-3',
            question: 'Какой формат чаще используют для описания IOC?',
            options': ['YAML', 'STIX/TAXII', 'Markdown', 'PNG'],
            'correctAnswer': 1,
            'explanation': 'STIX/TAXII — стандарты описания и обмена IOC.'
          }
        ]
      }'''

text = text[:le] + new_lesson + text[le:]
p.write_text(text)
print('inserted les-malware-3 successfully')
