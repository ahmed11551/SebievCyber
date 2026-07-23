from pathlib import Path

p = Path('src/data/coursesData.ts')
text = p.read_text()

marker = "id: 'course-network-basics',"
idx = text.find(marker)
if idx == -1:
    raise SystemExit('course not found')

ls = text.find('lessons: [', idx)
if ls == -1:
    raise SystemExit('lessons array not found')

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
    raise SystemExit('no matching bracket')

new_lesson = '''
      {
        id: 'les-net-4',
        title: 'Урок 4. Wireshark в бою и IOC по трафику',
        durationMinutes: 20,
        xpReward: 130,
        description: 'Capture & filters, Follow TCP stream, IOC hunting по портам и DNS.',
        contentMarkdown: `
### Wireshark IOC hunting
1. Capture + save pcapng
2. Filter: ip.addr == X
3. Follow -> TCP stream
4. And search frames: tcp.port == 4444 or dns.qry.name contains ...
        `,
        quiz: [
          {
            id: 'q-net-4',
            question: 'Как экспортировать HTTP объекты из Wireshark?',
            options: ['TCP dump', 'File -> Export Objects -> HTTP', 'DNS export', 'ICMP redirect'],
            correctAnswer: 1,
            explanation: 'Export Objects HTTP извлекает объекты из трафика.'
          }
        ]
      }'''

text = text[:le] + new_lesson + text[le:]
p.write_text(text)
print('inserted les-net-4 successfully')
