import { CourseModule } from '../types';

export const ADDITIONAL_COURSES_IDS = {
  infosec: 'course-info-security-basics',
  networks: 'course-network-basics',
  pentest: 'course-pentest-basics',
  malware: 'course-malware-basics',
  redteam: 'course-red-teaming',
  blueteam: 'course-blue-team',
  compliance: 'course-compliance',
  webapp: 'course-webapp-security',
  cloud: 'course-cloud-security',
  mobile: 'course-mobile-security',
};

export const COURSES_DATA: CourseModule[] = [
  {
    id: 'course-cyber-hygiene',
    title: 'Основы Кибергигиены и Защита Персональных Данных',
    category: 'beginner',
    description: 'Изучите ключевые правила цифровой безопасности, стандарт 152-ФЗ, стойкие пароли, двухфакторную аутентификацию и безопасную работу с устройствами.',
    iconName: 'ShieldCheck',
    certificateTitle: 'Сертификат Специалиста по Цифровой Гигиене',
    lessons: [
      {
        id: 'les-hygiene-1',
        title: 'Урок 1. Создание стойких паролей и менеджеры паролей',
        durationMinutes: 15,
        xpReward: 100,
        description: 'Почему простые пароли взламываются за секунды и как создавать парольные фразы с высокой энтропией.',
        interactiveLabType: 'password-analyzer',
        contentMarkdown: `
### Зачем нужна высокая энтропия пароля?

Более 80% инцидентов утечек данных происходят из-за слабости или компрометации паролей. Современные кластеры видеокарт (GPU) могут перебирать до **100 миллиардов комбинаций NTLM-хэшей в секунду**.

#### Ключевые критерии надежного пароля:
1. **Длина имеет ключевое значение**: Длина более 14-16 символов экспоненциально увеличивает время подбора методом перебора (Brute-force).
2. **Разнообразие символов**: Используйте заглавные и строчные буквы, цифры и спецсимволы (\`!@#$%^&*\`).
3. **Уникальность**: Никогда не используйте один и тот же пароль на разных сервисах.
4. **Менеджеры паролей**: Используйте Bitwarden, KeePassXC или 1Password вместо сохранения паролей в нешифрованном виде в браузере.
        `,
        quiz: [
          {
            id: 'q-hyg-1',
            question: 'Какая атака используется для подбора пароля по словарю с комбинациями символов?',
            options: ['DDoS атака', 'Brute-force / Dictionary Attack', 'Man-in-the-Middle', 'SQL Injection'],
            correctAnswer: 1,
            explanation: 'Атака перебором (Brute-force) и атака по словарю последовательно проверяют миллионы комбинаций паролей.'
          },
          {
            id: 'q-hyg-2',
            question: 'Какой пароль является наиболее устойчивым к перебору?',
            options: ['P@ssword2025!', 'Korova-Litala-V-Kosmos-2026#', 'Admin12345678', 'm0skva2026'],
            correctAnswer: 1,
            explanation: 'Парольная фраза из нескольких несвязанных слов длиной 25+ символов обладает высочайшей энтропией.'
          }
        ]
      },
      {
        id: 'les-hygiene-2',
        title: 'Урок 2. Двухфакторная аутентификация (2FA) и Passkeys',
        durationMinutes: 20,
        xpReward: 120,
        description: 'Разбор вариантов 2FA: SMS, TOTP-приложения (Google Authenticator), YubiKey и технология FIDO2 Passkeys.',
        contentMarkdown: `
### Иерархия надежности способов 2FA

Двухфакторная аутентификация требует подтверждения личности по двум разным факторам:
* **Знание** (что вы знаете) — Пароль или PIN-код.
* **Владение** (что у вас есть) — TOTP-токен в приложении или аппаратный ключ.
* **Биометрия** (кто вы) — Отпечаток пальца или Face ID.

#### Сравнение способов подтверждения:
1. **SMS / Звонок (Слабый)**: Уязвим к SIM-Swapping и перехвату сигнального протокола SS7.
2. **TOTP Приложения (Хороший)**: Google Authenticator, Aegis, 2FA. Генерирует 6-значный одноразовый код каждые 30 секунд.
3. **Hardware FIDO2 / YubiKey / Passkeys (Экстремальный)**: Физический USB/NFC ключ или FIDO2 бинарная пара. Полностью защищен от фишинга.
        `,
        quiz: [
          {
            id: 'q-hyg-3',
            question: 'Почему 2FA через SMS считается наименее надежным способом?',
            options: [
              'SMS слишком долго отправляется',
              'SMS подлежит перехвату из-за уязвимостей протоколов SS7 и подмены SIM-карт у оператора',
              'SMS работает только без интернета',
              'SMS нельзя использовать на компьютерах'
            ],
            correctAnswer: 1,
            explanation: 'Уязвимости сотовых сетей SS7 и подмена SIM-карты у оператора позволяют злоумышленникам перехватывать SMS-коды.'
          }
        ]
      },
      {
        id: 'les-hygiene-3',
        title: 'Урок 3. Безопасность мобильных устройств, публичный Wi-Fi и VPN',
        durationMinutes: 18,
        xpReward: 110,
        description: 'Защита смартфонов, шифрование накопителей BitLocker/FileVault, риски публичных точек доступа и выбор VPN-протокола.',
        contentMarkdown: `
### Опасности открытых Wi-Fi сетей в аэропортах и кафе

В открытых сетях без пароля (Open WPA2/WPA3) злоумышленники могут развернуть поддельную точку доступа (Rogue AP / Evil Twin) и осуществлять перехват трафика (Man-in-the-Middle).

#### Чек-лист безопасности мобильного устройства:
1. **Шифрование накопителя**: Включенный BitLocker на Windows, FileVault на macOS или встроенное шифрование Android/iOS.
2. **Отключение автоподключения к Wi-Fi**: Отключите опцию "Подключаться автоматически к открытым сетям".
3. **Использование шифрованных туннелей**: Подключайтесь через WireGuard, OpenVPN или IPsec при работе вне дома и офиса.
4. **Управление разрешениями приложений**: Ограничьте доступ сторонних приложений к геолокации, микрофону и контактам.
        `,
        quiz: [
          {
            id: 'q-hyg-4',
            question: 'Что такое атака Evil Twin в беспроводных сетях?',
            options: [
              'Создание мошеннической точки Wi-Fi с одинаковым SSID для перехвата данных пользователей',
              'Взлом пароля от роутера через брутфорс',
              'Отключение интернета во всем здании',
              'Подмена IP-адреса сайта в файле hosts'
            ],
            correctAnswer: 0,
            explanation: 'Evil Twin клонирует имя легитимной сети (например, Cafe_Free_WiFi), заставляя устройства подключаться к мошенническому роутеру.'
          }
        ]
      },
      {
        id: 'les-hygiene-4',
        title: 'Урок 4. Обновление ПО и Patch Management',
        durationMinutes: 12,
        xpReward: 90,
        description: 'Зачем важны обновления, автоматические патчи и личные данные в операционных системах.',
        contentMarkdown: `
### Patch Management

Актуальные обновления закрывают известные уязвимости. Включите автоматическое обновление ОС и браузера.

#### Чек-лист
- Windows Update / macOS Software Update
- Обновление firmware роутера
- Удаление неиспользуемых пакетов
        `,
        quiz: [
          {
            id: 'q-hyg-5',
            question: 'Почему важно своевременно устанавливать обновления?',
            options: ['Для удобства', 'Для закрытия известных уязвимостей', 'Чтобы чаще перезагружаться', 'Чтобы увеличить объем диска'],
            correctAnswer: 1,
            explanation: 'Обновления содержат исправления известных уязвимостей.'
          }
        ]
      },
      {
        id: 'les-hygiene-5',
        title: 'Урок 5. 152-ФЗ и права субъекта',
        durationMinutes: 16,
        xpReward: 110,
        description: 'Основные положения 152-ФЗ, права на доступ к данным, удаление и обезличивание.',
        contentMarkdown: `
### Права субъекта

152-ФЗ дает права на получение информации об обработке ПДн, на удаление или уточнение данных.

#### Основные права
- Доступ к своим данным
- Требование об удалении
- Отзыв согласия
- Обжалование действий оператора
        `,
        quiz: [
          {
            id: 'q-hyg-6',
            question: 'Один из основных principles 152-ФЗ?',
            options: ['Сбор всех данных', 'Ограничение доступа', 'Обезличивание исключено', 'Прав subjects нет'],
            correctAnswer: 1,
            explanation: '152-ФЗ требует ограничивать обработку только целями, указанными оператором.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-owasp-top10',
    title: 'Веб-уязвимости и безопасность приложений (OWASP Top 10 & API)',
    category: 'intermediate',
    description: 'Глубокое погружение в OWASP Top 10: SQL-инъекции, Cross-Site Scripting (XSS), обход авторизации, SSRF и безопасная разработка API.',
    iconName: 'Code',
    certificateTitle: 'Сертификат Специалиста OWASP & Web Security',
    lessons: [
      {
        id: 'les-owasp-1',
        title: 'Урок 1. SQL-инъекции (SQLi) и подготавливаемые запросы',
        durationMinutes: 25,
        xpReward: 150,
        description: 'Механика проникновения через неэкранированный ввод данных в базу данных и предотвращение через Parameterized Queries.',
        interactiveLabType: 'sqli-simulator',
        contentMarkdown: `
### Что такое SQL Injection (SQLi)?

SQL-инъекция возникает, когда пользовательский ввод напрямую конкатенируется в строку SQL-запроса без валидации или параметризации.

#### Пример уязвимого кода (Node.js/Express):
\`\`\`sql
-- Уязвимый запрос:
SELECT * FROM users WHERE username = '\` + req.body.user + \`' AND password = '\` + req.body.pass + \`'
\`\`\`
Если атакующий введет в поле логина: \`admin' --\`, запрос превратится в:
\`\`\`sql
SELECT * FROM users WHERE username = 'admin' --' AND password = ''
\`\`\`
Символы \`--\` закомментируют оставшуюся часть проверки пароля!

#### Единственно верное решение — Prepared Statements (Параметризация):
\`\`\`javascript
// Безопасный запрос с заполнителями $1, $2:
const query = 'SELECT * FROM users WHERE username = $1 AND password_hash = $2';
await db.query(query, [username, hashedPassword]);
\`\`\`
        `,
        quiz: [
          {
            id: 'q-owasp-1',
            question: 'Какой основной метод полностью защищает веб-приложение от SQL-инъекций?',
            options: [
              'Использование только метода POST вместо GET',
              'Использование подготавливаемых запросов (Prepared Statements) и параметризованных SQL-вызовов',
              'Шифрование базы данных на диске',
              'Ограничение длины ввода до 10 символов'
            ],
            correctAnswer: 1,
            explanation: 'Параметризованные запросы разделяют код SQL и передаваемые данные на уровне драйвера СУБД.'
          }
        ]
      },
      {
        id: 'les-owasp-2',
        title: 'Урок 2. Cross-Site Scripting (XSS) и заголовки Content Security Policy (CSP)',
        durationMinutes: 25,
        xpReward: 150,
        description: 'Внедрение вредоносного JavaScript в браузер жертвы: Stored, Reflected и DOM-based XSS.',
        interactiveLabType: 'header-checker',
        contentMarkdown: `
### Типы Cross-Site Scripting (XSS)

XSS позволяет атакующему выполнять произвольный JS-код в сессии другого пользователя, красть \`document.cookie\` и токен авторизации.

1. **Reflected XSS (Отраженный)**: Вредоносный скрипт передается в URL-параметрах и сразу отображается на странице.
2. **Stored XSS (Хранимый)**: Вредоносный код сохраняется в базе данных (например, в комментарии) и выполняется у каждого посетителя.
3. **DOM-based XSS**: Происходит на стороне клиента при небезопасной манипуляции с \`innerHTML\` или \`eval()\`.

#### Настройка защиты с помощью заголовка Content Security Policy (CSP):
\`\`\`http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trustedscripts.com; object-src 'none';
\`\`\`
Заголовок CSP запрещает выполнение inline-скриптов (\`<script>alert(1)</script>\`) и загрузку кода с незнакомых доменов.
        `,
        quiz: [
          {
            id: 'q-owasp-2',
            question: 'Какой HTTP-флаг для Cookie предотвращает их кражу через вредоносные скрипты XSS?',
            options: ['Secure', 'HttpOnly', 'SameSite=Lax', 'Domain=.com'],
            correctAnswer: 1,
            explanation: 'Флаг HttpOnly полностью запрещает доступ к Cookie из JavaScript через document.cookie.'
          }
        ]
      },
      {
        id: 'les-owasp-3',
        title: 'Урок 3. Broken Access Control (IDOR) и Server-Side Request Forgery (SSRF)',
        durationMinutes: 22,
        xpReward: 140,
        description: 'Разбор косвенных ссылок на объекты (IDOR) и уязвимости генерации межсерверных запросов (SSRF).',
        contentMarkdown: `
### Уязвимость IDOR (Insecure Direct Object References)

IDOR возникают, когда приложение предоставляет прямой доступ к объектам на основе ввода пользователя без надлежащей проверки авторизации на сервере.

#### Пример:
Запрос \`GET /api/documents/invoice_8829.pdf\` позволяет злоумышленнику перебрать номер и скачать \`invoice_8830.pdf\`.

### Server-Side Request Forgery (SSRF)
SSRF происходит, когда сервер веб-приложения по запросу пользователя обращается к внутренним незащищенным веб-ресурсам (например, metadata сервисам AWS \`http://169.254.169.254\`).
        `,
        quiz: [
          {
            id: 'q-owasp-3',
            question: 'Как предотвратить IDOR уязвимости в REST API?',
            options: [
              'Шифровать URL-адреса в Base64',
              'Всегда осуществлять проверку прав текущего пользователя (Session/JWT) на стороне сервера перед отдачей документа',
              'Скрыть ссылки в CSS файлах',
              'Переименовать файлы на сервере'
            ],
            correctAnswer: 1,
            explanation: 'Только явная проверка прав авторизованного пользователя на объект гарантирует защиту от IDOR.'
          }
        ]
      },
      {
        id: 'les-owasp-4',
        title: 'Урок 4. Безопасность API (OWASP API Top 10) и подпись JWT токенов',
        durationMinutes: 24,
        xpReward: 160,
        description: 'Защита REST и GraphQL API: BOLA, BFLA, валидация JWT подписей (алгоритм RS256 vs HS256) и ограничение частоты запросов (Rate Limiting).',
        contentMarkdown: `
### Защита JSON Web Tokens (JWT)

JWT токены состоят из трех частей: Header, Payload и Signature.

#### Частые ошибки реализаций JWT:
1. **Алгоритм "none"**: Сервер принимает токены, у которых заголовок содержит \`{"alg": "none"}\`, не проверяя подпись!
2. **Подмена алгоритма (RS256 на HS256)**: Атакующий использует публичный RSA ключ сервера как секретный ключ HS256.
3. **Отсутствие проверки expiration (exp)**: Токен остается валидным вечно после утечки.

#### Защита API через Rate Limiting:
Ограничение количества запросов (например, 100 запросов в минуту с одного IP/пользователя) защищает от перебора паролей и DDoS-атак.
        `,
        quiz: [
          {
            id: 'q-owasp-4',
            question: 'В чем ключевая опасность использования алгоритма HS256 для JWT в микросервисной архитектуре?',
            options: [
              'Токены занимают слишком много места',
              'HS256 использует один и тот же секретный ключ для генерации и проверки, который приходится передавать всем микросервисам',
              'HS256 работает медленнее, чем RS256',
              'HS256 не поддерживается в JavaScript'
            ],
            correctAnswer: 1,
            explanation: 'В симметричном HS256 любая система, умеющая проверять токен, имеет и ключ для сфабрикования любого токена. Для распределенных систем лучше использовать асимметричный RS256.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-social-eng',
    title: 'Социальная Инженерия и Распознавание Фишинга',
    category: 'intermediate',
    description: 'Научитесь моментально определять поддельные сайты, вредоносные почтовые вложения, методы психологии и противостоять целевым атакам.',
    iconName: 'MailWarning',
    certificateTitle: 'Сертификат Аналитика Фишинговых Угроз',
    lessons: [
      {
        id: 'les-soc-1',
        title: 'Урок 1. Анатомия фишингового письма и спуфинг доменов',
        durationMinutes: 20,
        xpReward: 130,
        description: 'Разбор DKIM, SPF, DMARC записей и методов распознавания поддельных URL (тайпосквоттинг).',
        interactiveLabType: 'phishing-detector',
        contentMarkdown: `
### Как распознать фишинговое сообщение?

Фишинг остаётся самым популярным вектором первичного проникновения в корпоративные сети (более 90% всех атак).

#### Красные флаги фишинга:
1. **Срочность и давление на эмоции**: *"Ваш аккаунт заблокируют через 2 часа, если вы не подтвердите пароль!"*
2. **Тайпосквоттинг и похожие домены**: \`g00gle.com\`, \`paypaI-security.com\`, \`bank-login-verify.ru\`.
3. **Несоответствие служебных заголовков**: Поле \`From:\` указывает известный бренд, но \`Return-Path:\` ведет на бесплатный или взломанный сервер.
4. **Вредоносные вложения**: Использование двойных расширений, например \`Invoice_2026.pdf.exe\` или макросов в файлах \`.xlsm\`.
        `,
        quiz: [
          {
            id: 'q-soc-1',
            question: 'Что означает подделка доменных имен методом Typosquatting?',
            options: [
              'Создание домена с опечаткой или похожими символами (например, ар0le.com вместо apple.com)',
              'Взлом официального сервера компании',
              'Отправка писем без указания темы',
              'Шифрование текста письма'
            ],
            correctAnswer: 0,
            explanation: 'Тайпосквоттинг использует домены, визуально близкие к известным брендам, рассчитывая на невнимательность пользователя.'
          }
        ]
      },
      {
        id: 'les-soc-2',
        title: 'Урок 2. Целевой фишинг (Spear Phishing), Вишинг, Смишинг и Deepfake',
        durationMinutes: 22,
        xpReward: 140,
        description: 'Разбор телефонного мошенничества (Vishing), смс-атак (Smishing) и применения генеративного ИИ и подделки голосов.',
        contentMarkdown: `
### Эволюция фишинга: Генеративный ИИ и Deepfake

Современные злоумышленники используют алгоритмы машинного обучения для составления персональных писем на базе информации из социальных сетей (OSINT).

#### Разновидности атак:
* **Spear Phishing**: Письмо составляется под конкретную должность и фамилию сотрудника (например, запрос финансового отчета бухгалтеру от имени генерального директора).
* **Vishing (Голосовой фишинг)**: Телефонные звонки с подменой номера (Caller ID Spoofing) и использованием синтезатора речи генерального директора.
* **Smishing**: SMS со ссылками на поддельные страницы доставки или банков.
        `,
        quiz: [
          {
            id: 'q-soc-2',
            question: 'В чем ключевое отличие Spear Phishing от обычного массового фишинга?',
            options: [
              'Spear Phishing отправляется только по выходным',
              'Spear Phishing нацелен на конкретную персону с использованием предварительно собранных персональных данных (OSINT)',
              'Spear Phishing не содержит ссылок',
              'Spear Phishing используется только против военных'
            ],
            correctAnswer: 1,
            explanation: 'Целевой фишинг персонализируется под конкретную жертву, имя, должность и текущие рабочие задачи.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-crypto-net',
    title: 'Сетевая Безопасность и Криптография',
    category: 'advanced',
    description: 'Основы асимметричного шифрования (RSA, ECC), протоколы TLS 1.3, устройства сетевой защиты (WAF, IDS/IPS) и сегментация.',
    iconName: 'Lock',
    certificateTitle: 'Сертификат Эксперта по Сетевой Защите и Криптографии',
    lessons: [
      {
        id: 'les-crypto-1',
        title: 'Урок 1. Симметричное и Асимметричное шифрование в TLS',
        durationMinutes: 30,
        xpReward: 180,
        description: 'Как работает TLS-рукопожатие (Handshake) и объединяет алгоритмы RSA/ECDHE с симметричным AES-GCM.',
        interactiveLabType: 'encryption-lab',
        contentMarkdown: `
### Симметричное vs Асимметричное Шифрование

Криптографическая защита данных базируется на двух классах алгоритмов:

#### 1. Симметричное шифрование (AES-256, ChaCha20, Кузнечик):
* Использует **один и тот же ключ** для зашифрования и расшифрования.
* Работает чрезвычайно быстро, применяется для шифрования больших массивов данных на диске и в потоке HTTP/2.

#### 2. Асимметричное шифрование (RSA, ECC / Ed25519):
* Использует парные ключи: **Публичный ключ** (для зашифрования) и **Приватный ключ** (для расшифрования).
* Позволяет безопасно обменяться сеансовым ключом по незащищенному каналу (алгоритм Диффи-Хеллмана).
        `,
        quiz: [
          {
            id: 'q-cr-1',
            question: 'Какая роль у Публичного Ключа в асимметричной криптосистеме?',
            options: [
              'Он держится в секрете и используется для расшифрования сообщений',
              'Он открыто распространяется и применяется для зашифрования данных или проверки электронной подписи',
              'Он используется только для аутентификации в файловой системе',
              'Он периодически уничтожается каждые 5 минут'
            ],
            correctAnswer: 1,
            explanation: 'Публичный ключ виден всем; им любой желающий может зашифровать письмо, которое сможет открыть только владелец Приватного ключа.'
          }
        ]
      },
      {
        id: 'les-crypto-2',
        title: 'Урок 2. Протоколы TLS 1.3, HTTPS, HSTS и Инфраструктура PKI',
        durationMinutes: 25,
        xpReward: 160,
        description: 'Разбор работы цепочки доверия X.509 сертификатов, ролей Root CA и механизма принудительного HTTPS через HSTS.',
        contentMarkdown: `
### Архитектура PKI и заголовок HSTS

Инфраструктура открытых ключей (Public Key Infrastructure) позволяет браузеру доверять веб-сайтам через подпись цепочки Корневых Удостоверяющих Центров.

#### Заголовок HTTP Strict Transport Security (HSTS):
\`\`\`http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
\`\`\`
Заголовок HSTS сообщает браузеру, что к данному домену разрешено обращаться **исключительно по протоколу HTTPS**. Это полностью блокирует атаки понижения протокола (SSL Strip / Downgrade attacks).
        `,
        quiz: [
          {
            id: 'q-cr-2',
            question: 'Какую главную угрозу нейтрализует заголовок HSTS?',
            options: [
              'SQL-инъекции в формы обратной связи',
              'Атаки SSL Strip / Downgrade attack (попытки перенаправить пользователя с HTTPS на защищенный незашифрованный HTTP)',
              'Переполнение буфера на сервере',
              'Утечку паролей из памяти процессора'
            ],
            correctAnswer: 1,
            explanation: 'HSTS заставляет браузер отклонять любые соединение по обычному HTTP без HTTPS.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-devsecops',
    title: 'DevSecOps: Интеграция Безопасности в CI/CD Pipeline',
    category: 'advanced',
    description: 'Освойте Shift-Left подход, статический и динамический анализ (SAST, DAST, SCA), поиск секретов и безопасность Docker/Kubernetes.',
    iconName: 'Terminal',
    certificateTitle: 'Сертификат Инженера DevSecOps & Cloud Security',
    lessons: [
      {
        id: 'les-dso-1',
        title: 'Урок 1. Концепция Shift-Left и Моделирование Угроз по модели STRIDE',
        durationMinutes: 25,
        xpReward: 170,
        description: 'Почему обнаружение багов на этапе проектирования в 100 раз дешевле, чем после релиза, и методология STRIDE.',
        contentMarkdown: `
### Методология моделирования угроз STRIDE

Модель STRIDE разработана для систематической оценки архитектуры приложений:

* **S (Spoofing)**: Фальсификация личности (подмена IP, токена, куки).
* **T (Tampering)**: Фальсификация данных (модификация запроса в процессе передачи).
* **R (Repudiation)**: Отказ от авторства (отсутствие аудита действий в логах).
* **I (Information Disclosure)**: Утечка информации (вывод стека ошибок в HTTP-ответе).
* **D (Denial of Service)**: Отражение обслуживания (исчерпание CPU, RAM или сокетов).
* **E (Elevation of Privilege)**: Повышение привилегий (получение прав root/admin).
        `,
        quiz: [
          {
            id: 'q-dso-1',
            question: 'Что означает буквенный символ "I" в моделирования угроз STRIDE?',
            options: [
              'Identity Theft (Кража паспорта)',
              'Information Disclosure (Утечка конфиденциальной информации)',
              'Input Validation (Валидация ввода)',
              'IP Spoofing (Спуфинг адреса)'
            ],
            correctAnswer: 1,
            explanation: 'I в STRIDE отвечает за Information Disclosure — несанкционированное раскрытие секретных или приватных данных.'
          }
        ]
      },
      {
        id: 'les-dso-2',
        title: 'Урок 2. SAST, DAST, SCA и Сканирование секретов в Git',
        durationMinutes: 30,
        xpReward: 180,
        description: 'Настройка автоматических проверок Semgrep, TruffleHog и Trivy в пайплайнах GitLab CI / GitHub Actions.',
        contentMarkdown: `
### Автоматизация сканирования в CI/CD

Интеграция утилит сканирования позволяет автоматически отклонять Pull Request при обнаружении уязвимостей критического уровня (Severity: Critical).

#### Пример конфигурации step в CI/CD для сканирования Docker образ утилитой Trivy:
\`\`\`yaml
scan_container:
  stage: test
  script:
    - trivy image --exit-code 1 --severity CRITICAL myapp:latest
\`\`\`
Флаг \`--exit-code 1\` остановит сборку, если в образе найдены уязвимости класса CRITICAL!
        `,
        quiz: [
          {
            id: 'q-dso-2',
            question: 'Чем отличает сканер SAST от сканера DAST?',
            options: [
              'SAST сканирует исходный код без запуска приложения, а DAST тестирует работающее приложение снаружи',
              'SAST тестирует только базы данных, а DAST проверяет файлы',
              'SAST работает только для языка Python',
              'Разницы между ними нет'
            ],
            correctAnswer: 0,
            explanation: 'SAST (Static) анализирует исходный код, а DAST (Dynamic) генерирует HTTP-запросы к запущенному веб-серверу.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-soc-analyst',
    title: 'SOC Analyst & Incident Response: Анализ Атак и Расследование',
    category: 'advanced',
    description: 'Анализ логов в SIEM, работа с EDR/NTA, форензика памяти, детектирование по матрице MITRE ATT&CK и написание YARA правил.',
    iconName: 'Activity',
    certificateTitle: 'Сертификат Аналитика Центра Мониторинга (SOC Analyst)',
    lessons: [
      {
        id: 'les-soc-an-1',
        title: 'Урок 1. Архитектура SOC, корреляция логов в SIEM и модель MITRE ATT&CK',
        durationMinutes: 30,
        xpReward: 190,
        description: 'Сбор журналов Windows Event Logs, Sysmon, Nginx и составление правил корреляции в SIEM.',
        contentMarkdown: `
### Роль SIEM и Sysmon в Центре Мониторинга (SOC)

Утилита Sysmon (System Monitor) от Microsoft расширяет стандартный журнал событий Windows, логируя:
* Event ID 1: Создание новых процессов с полной командной строкой и хэшами SHA256.
* Event ID 3: Сетевые соединения, инициированные процессами.
* Event ID 11: Создание и модификация файлов на диске.

Сбор этих событий в единую систему SIEM (Elastic, Splunk, MaxPatrol) позволяет выявлять аномальное поведение атак (например, запуск cmd.exe из процесса Word).
        `,
        quiz: [
          {
            id: 'q-soc-an-1',
            question: 'Какое событие Sysmon (Event ID) отвечает за регистрацию создания нового процесса с командной строкой?',
            options: ['Event ID 1', 'Event ID 5', 'Event ID 10', 'Event ID 4624'],
            correctAnswer: 0,
            explanation: 'Event ID 1 в Sysmon обозначает Process Creation и содержит полную командную строку и родительский процесс.'
          }
        ]
      },
      {
        id: 'les-soc-an-2',
        title: 'Урок 2. Разработка YARA правил и Поиск Индикаторов Компрометации (IoC)',
        durationMinutes: 28,
        xpReward: 180,
        description: 'Написание сигнатур YARA для поиска вредоносных бинарных файлов в оперативке и файловой системе.',
        contentMarkdown: `
### Написание правил YARA

YARA позволяет классифицировать вредоносное ПО на основе текстовых и шестнадцатеричных сигнатур.

\`\`\`yara
rule WebShell_PHP_Generic {
    meta:
        description = "Детект веб-шеллов PHP"
        author = "SOC Team"
    strings:
        $php = "<?php"
        $eval = "eval(base64_decode("
        $system = "system($_POST"
    condition:
        $php and ($eval or $system)
}
\`\`\`
        `,
        quiz: [
          {
            id: 'q-soc-an-2',
            question: 'Для чего в сфере кибербезопасности применяются YARA правила?',
            options: [
              'Для ускорения загрузки сайтов',
              'Для идентификации и классификации образцов вредоносного ПО на основе паттернов и сигнатур',
              'Для автоматической генерации паролей',
              'Для настройки роутеров Cisco'
            ],
            correctAnswer: 1,
            explanation: 'YARA сигнатуры сканируют файлы и память на наличие конкретных строк, хешей и структур вредоносного кода.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-compliance',
    title: 'Законодательство & Комплаенс (152-ФЗ, КИИ 187-ФЗ, ISO 27001)',
    category: 'compliance',
    description: 'Официальные стандарты, моделирование угроз ФСТЭК, аттестация информационных систем, ГОСТы и международные стандарты ИБ.',
    iconName: 'FileText',
    certificateTitle: 'Сертификат Эксперта по Нормативно-Правовому Обеспечению ИБ',
    lessons: [
      {
        id: 'les-comp-1',
        title: 'Урок 1. Требования 152-ФЗ, Уровни защищенности ПДн и Реестр Роскомнадзора',
        durationMinutes: 25,
        xpReward: 150,
        description: 'Разбор обязательных документов, политик обработки ПДн, штрафов и порядка проведения аудитов.',
        contentMarkdown: `
### Организационные требования 152-ФЗ

Каждая организация, обрабатывающая данные клиентов или сотрудников, обязана:

1. **Разработать Положение об обработке ПДн** и опубликовать его в свободном доступе на сайте.
2. **Получать явное Согласие на обработку** с галочкой, которая НЕ должна быть предзаполнена.
3. **Обеспечить уничтожение ПДн** по истечении срока обработки или по отзыву согласия в течение 30 дней.
        `,
        quiz: [
          {
            id: 'q-comp-1',
            question: 'В течение какого срока оператор обязан уничтожить персональные данные по требованию субъекта, если иное не предусмотрено договором?',
            options: ['В течение 24 часов', 'В течение 30 дней', 'В течение 1 года', 'Срок не ограничен'],
            correctAnswer: 1,
            explanation: 'Согласно ст. 21 закона № 152-ФЗ оператор обязан прекратить обработку и уничтожить данные в срок, не превышающий 30 дней.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-info-security-basics',
    title: 'Основы информационной безопасности',
    category: 'beginner',
    description: 'CIA, типы угроз, регуляторика РФ: 152-ФЗ, 187-ФЗ, ФСБ/ФСТЭК. Базовый курс для новичков.',
    iconName: 'ShieldCheck',
    certificateTitle: 'Сертификат Основ ИБ',
    lessons: [
      {
        id: 'les-infosec-1',
        title: 'Урок 1. CIA и типы угроз',
        durationMinutes: 20,
        xpReward: 120,
        description: 'Конфиденциальность, целостность, доступность. Классификация угроз: люди, ПО, сеть, физический доступ.',
        contentMarkdown: `
### CIA Triad

Информационная безопасность строится на трех столпах:
- **Confidentiality**: защита от несанкционированного доступа.
- **Integrity**: защита от несанкционированного изменения.
- **Availability**: доступность для авторизованных пользователей.

### Типы угроз

1. **Люди**: социальная инженерия, ошибки сотрудников, инсайдеры.
2. **ПО**: вредоносное ПО, уязвимости, обновления.
3. **Сеть**: DDoS, MITM, перехват трафика.
4. **Физический доступ**: кража устройств, неавторизованный доступ к серверной.
        `,
        quiz: [
          {
            id: 'q-infosec-1',
            question: 'Что означает "I" в CIA triad?',
            options: ['Integration', 'Integrity', 'Isolation', 'Incident'],
            correctAnswer: 1,
            explanation: 'Integrity — целостность: защита от несанкционированного изменения.'
          }
        ]
      }
    
      ,      {
        id: 'les-infosec-2',
        title: 'Урок 2. Регуляторика и нормативные акты РФ',
        durationMinutes: 20,
        xpReward: 120,
        description: '152-ФЗ, 187-ФЗ, требования ФСТЭК/ФСБ, baseline документы.',
        contentMarkdown: `
### Нормативная база

1. **152-ФЗ** — персональные данные.
2. **187-ФЗ** — критическая информационная инфраструктура.
3. **ФСТЭК/ФСБ** — отраслевые требования.
`,
        quiz: [{"id": "q-info-2", "question": "Какой закон регулирует персональные данные?", "options": ["187-ФЗ", "152-ФЗ", "115-ФЗ", "126-ФЗ"], "correctAnswer": 1, "explanation": "152-ФЗ регулирует обработку персональных данных."}]
      }
      ,      {
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
        quiz: [{"id": "q-infosec-3", "question": "Что первое делают при инциденте утечки данных?", "options": ["Удаляют все логи", "Classify, triage и contain", "Оповещают конкурентов", "Перезагружают сервера"], "correctAnswer": 1, "explanation": "Сначала classify/triage, потом contain, чтобы ограничить blast radius."}]
      }
      ]
  },
  {
    id: 'course-network-basics',
    title: 'Сети и протоколы',
    category: 'beginner',
    description: 'OSI/TCP-IP, DNS, HTTP/S, TLS, VPN. Практика: анализ трафика Wireshark.',
    iconName: 'Network',
    certificateTitle: 'Сертификат По Сетям И Протоколам',
    lessons: [
      {
        id: 'les-net-1',
        title: 'Урок 1. OSI и TCP/IP',
        durationMinutes: 25,
        xpReward: 130,
        description: '7 уровней OSI, стек TCP/IP, порты, сокеты.',
        contentMarkdown: `
### Модель OSI

1. Physical
2. Data Link
3. Network
4. Transport
5. Session
6. Presentation
7. Application

### TCP/IP

Практический стек:
- Ethernet / Wi-Fi
- IP
- TCP/UDP
- DNS/HTTP/TLS
        `,
        quiz: [
          {
            id: 'q-net-1',
            question: 'Какой уровень OSI отвечает за маршрутизацию?',
            options: ['Data Link', 'Network', 'Transport', 'Session'],
            correctAnswer: 1,
            explanation: 'Network layer отвечает за IP-адресацию и маршрутизацию.'
          }
        ]
      }
    
      ,      {
        id: 'les-net-2',
        title: 'Урок 2. DNS, HTTP/S и TLS',
        durationMinutes: 22,
        xpReward: 130,
        description: 'Как работает DNS, структура HTTP, роли TLS 1.3 и основные заголовки.',
        contentMarkdown: `
### DNS

Иерархия корневых серверов, recursive resolver, authoritative server. Атаки: cache poisoning.

### TLS 1.3
Удалены старые cipher suites, 1-RTT handshake, ключевые преимущества: скорость и безопасность.
`,
        quiz: [{"id": "q-net-2", "question": "Какой протокол обеспечивает шифрование веб-трафика?", "options": ["HTTP", "DNS", "TLS", "FTP"], "correctAnswer": 2, "explanation": "TLS шифрует транспортный уровень, обеспечивая HTTPS."}]
      }
      ,      {
        id: 'les-net-3',
        title: 'Урок 3. VPN, Wireshark и анализ сетевых угроз',
        durationMinutes: 20,
        xpReward: 130,
        description: 'VPN типы, туннелирование, анализ capture в Wireshark, порты IOC.',
        contentMarkdown: `

### VPN типы
- Site-to-Site
- Remote Access
### Wireshark quick start
1. Capture на интерфейсе
2. Фильтр: ip.addr == X
3. Follow TCP stream
4. Ищем IOC по портам и DNS
        `,
        quiz: [{"id": "q-net-3", "question": "Какой фильтр Wireshark покажет только трафик к IP?", "options": ["tcp.flags.syn == 1", "ip.addr == x.x.x.x", "http", "dns"], "correctAnswer": 1, "explanation": "ip.addr фильтрует по источнику/назначению IP."}]
      }
      ,      {
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
      }]
  },
  {
    id: 'course-pentest-basics',
    title: 'Penetration Testing Basics',
    category: 'intermediate',
    description: 'Passive/active reconnaissance, Nmap, Burp Suite, OWASP ZAP, этика и документация.',
    iconName: 'Crosshair',
    certificateTitle: 'Сертификат Penetration Tester',
    lessons: [
      {
        id: 'les-pentest-1',
        title: 'Урок 1. Reconnaissance и Nmap',
        durationMinutes: 28,
        xpReward: 160,
        description: 'Пассивная и активная разведка, сканирование портов, версий, ОС.',
        contentMarkdown: `
### Passive Reconnaissance

WHOIS, DNS, Shodan, Censys, Google dorks.

### Active Reconnaissance

Nmap:
- SYN scan
- Version detection
- OS detection
        `,
        quiz: [
          {
            id: 'q-pentest-1',
            question: 'Какой тип сканирования Nmap менее заметен?',
            options: ['TCP connect', 'SYN stealth', 'UDP scan', 'Ping sweep'],
            correctAnswer: 1,
            explanation: 'SYN stealth не завершает полное TCP-рукопожатие.'
          }
        ]
      }
    
      ,      {
        id: 'les-pentest-2',
        title: 'Урок 2. Burp Suite, OWASP ZAP, этика и правила тестирования',
        durationMinutes: 25,
        xpReward: 150,
        description: 'Настройка прокси, intercept, repeater, scanner. Правила поведения при пентесте.',
        contentMarkdown: `
### Орудия
- Burp Suite Professional / Community
- OWASP ZAP
- MITM proxy

### Правила
Никогда не тестируйте без письменного разрешения. Сохраняйте доказательства и пишите отчет.
`,
        quiz: [{"id": "q-pent-2", "question": "Что требуется перед тестированием production?", "options": ["Ничего", "Четкий письменный scope и RoE", "Пароль от root", "Достаточно интернета"], "correctAnswer": 1, "explanation": "Пентест всегда требует письменного Rules of Engagement и scope."}]
      }
      ,      {
        id: 'les-pentest-3',
        title: 'Урок 3. Постинтеграция, постэксплуатация и чистка следов',
        durationMinutes: 22,
        xpReward: 140,
        description: 'Persistence, lateral movement, evidence collection, cleanup, secure reporting.',
        contentMarkdown: `

### Постинтеграция
- Сбор credentials
- Сканирование внутренней сети
- Документирование findings
### Cleanup
Удаление временных файлов, reverting config changes, comments в history.
        `,
        quiz: [{"id": "q-pentest-3", "question": "Зачем нужен cleanup после пентеста?", "options": ["Чтобы ускорить сеть", "Чтобы устранить риски и не оставлять следы", "Чтобы удалить отчет", "Чтобы перезагрузить firewall"], "correctAnswer": 1, "explanation": "Cleanup предотвращает инциденты и сохраняет trust."}]
      }
      ]
  },
  {
    id: 'course-malware-basics',
    title: 'Malware Analysis Basics',
    category: 'intermediate',
    description: 'Статический и динамический анализ, песочницы, IOC, YARA.',
    iconName: 'Bug',
    certificateTitle: 'Сертификат Аналитика Вредоносного ПО',
    lessons: [
      {
        id: 'les-malware-1',
        title: 'Урок 1. Статический анализ',
        durationMinutes: 24,
        xpReward: 150,
        description: 'Строки, секции, импорты, хэши. Динамика: Procmon, Wireshark, Cuckoo.',
        contentMarkdown: `
### Статический анализ

- Хэши MD5/SHA256
- Строки и секции PE/ELF
- Импорты и экспорты
- YARA сигнатуры

### Динамический анализ

- Песочницы: Cuckoo, Any.Run
- Procmon, Process Hacker
- Wireshark, Regshot
        `,
        quiz: [
          {
            id: 'q-malware-1',
            question: 'Что такое IOC в аналитике вредоносного ПО?',
            options: ['Input/Output Controller', 'Indicator of Compromise', 'Internal Object Code', 'Internet Operations Center'],
            correctAnswer: 1,
            explanation: 'Indicator of Compromise — артефакт, указывающий на заражение.'
          }
        ]
      },
      {
        id: 'les-malware-2',
        title: 'Урок 2. Динамический анализ и поведение вредоносного ПО',
        durationMinutes: 26,
        xpReward: 160,
        description: 'Procmon, Wireshark, Any.Run. Сетевой IOC, вирусные экс weer, LNK persistence.',
        contentMarkdown: `
### Динамика в песочнице

Собираем поведенческие IOC: registry keys, network calls, startup paths.
        `,
        quiz: [
          {
            id: 'q-malware-2',
            question: 'Какой инструмент чаще всего используют для динамического анализа установленных сервисов и автозапуска?',
            options: ['Burp Suite', 'Wireshark', 'Procmon', 'Nmap'],
            correctAnswer: 2,
            explanation: 'Process Monitor показывает файлы, реестр и сетевые события.'
          }
        ]
      },
      {
        id: 'les-malware-3',
        title: 'Урок 3. YARA правила и отчетность по инцидентам',
        durationMinutes: 22,
        xpReward: 140,
        description: 'Написание YARA правил, формат отчета SOC2/ISO. Эскалация инцидента.',
        contentMarkdown: `
### YARA rule basics

Минимизируем false positives, ограничиваем по mime и extensions.
        `,
        quiz: [
          {
            id: 'q-malware-3',
            question: 'Для чего создают YARA rule?',
            options: ['Для шифрования файлов', 'Для классификации вредоносных образцов по строкам/behavior', 'Для отправки email', 'Для развертывания ботов'],
            correctAnswer: 1,
            explanation: 'YARA позволяет детектировать вредоносные файлы по статическим признакам.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-webapp-security',
    title: 'Web Application Security',
    category: 'advanced',
    description: 'XSS, SQLi, SSRF, CSRF, XXE, secure coding, Burp Suite.',
    iconName: 'Globe',
    certificateTitle: 'Сертификат Web Security Specialist',
    lessons: [
      {
        id: 'les-web-1',
        title: 'Урок 1. Защита от XSS и SQLi',
        durationMinutes: 25,
        xpReward: 160,
        description: 'Типы XSS, CSP, output encoding, prepared statements, ORM.',
        contentMarkdown: `
### XSS Protection

- Output encoding
- CSP
- HttpOnly/SameSite
- Input validation

### SQLi Protection

- Prepared statements
- ORM
- Least privilege DB
        `,
        quiz: [
          {
            id: 'q-web-1',
            question: 'Какой флаг предотвращает доступ JS к cookie?',
            options: ['Secure', 'HttpOnly', 'SameSite', 'Domain'],
            correctAnswer: 1,
            explanation: 'HttpOnly запрещает document.cookie.'
          },
          {
            id: 'q-web-2',
            question: 'Что лучше всего защищает от CSRF на уровне приложения?',
            options: ['CORS only', 'Anti-CSRF токены', 'Отключение cookies', 'Rate limiting'],
            correctAnswer: 1,
            explanation: 'С勻ochastic anti-CSRF токен в формах защищает от подделки запросов.'
          }
        ]
      },
      {
        id: 'les-web-2',
        title: 'Урок 2. SSRF, CSRF и безопасные заголовки',
        durationMinutes: 24,
        xpReward: 150,
        description: 'Объяснение SSRF, SSRF в облаке, CSRF токены, SameSite cookies, secure headers.',
        contentMarkdown: `
### SSRF

Пример: загрузка изображения по URL, сервер обращается к внутреннему адресу.
        `,
        quiz: [
          {
            id: 'q-web-3',
            question: 'Какой заголовок помогает ограничить SSRF?',
            options: ['X-XSS-Protection', 'Content-Type', 'Fetch Metadata / DNS-pinning / allowlist', 'User-Agent'],
            correctAnswer: 2,
            explanation: 'Используйте allowlist разрешенных доменов и prevent SSRF.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-cloud-security',
    title: 'Cloud Security',
    category: 'advanced',
    description: 'AWS/Azure/Yandex Cloud безопасность, IAM, S3, VPC, guardrails.',
    iconName: 'Cloud',
    certificateTitle: 'Сертификат Cloud Security Specialist',
    lessons: [
      {
        id: 'les-cloud-1',
        title: 'Урок 1. Shared Responsibility Model',
        durationMinutes: 22,
        xpReward: 150,
        description: 'Ответственность провайдера и клиента, IAM, encryption, logging.',
        contentMarkdown: `
### Shared Responsibility Model

- Provider: физическая безопасность, гипервизоры, сеть
- Client: IAM, данные, ОС, доступ

### S3 Security

- Block public access
- Bucket policies
- Encryption at rest
- Versioning + MFA delete
        `,
        quiz: [
          {
            id: 'q-cloud-1',
            question: 'Кто отвечает за шифрование данных в S3?',
            options: ['Только AWS', 'Только клиент', 'Оба: AWS и клиент', 'Nobody'],
            correctAnswer: 2,
            explanation: 'Shared Responsibility: AWS обеспечивает инфраструктуру, клиент — данные.'
          }
        ]
      }
    
      ,      {
        id: 'les-cloud-2',
        title: 'Урок 2. S3, IAM, Guardrails и Compromise Detection',
        durationMinutes: 22,
        xpReward: 150,
        description: 'Bucket policies, Deny principals, CloudTrail, GuardDuty, incident simulation.',
        contentMarkdown: `

### S3 guardrails
- Block Public Access
- Bucket policy Deny unencrypted uploads
### IAM
- Least privilege
- Conditional access
### Detection
CloudTrail + GuardDuty + Security Hub alerts.
        `,
        quiz: [{"id": "q-cloud-2", "question": "Какой сервис AWS фокусируется на threat detection?", "options": ["EC2", "GuardDuty", "S3", "IAM"], "correctAnswer": 1, "explanation": "Amazon GuardDuty анализирует logs на угрозы."}]
      }
      ]
  },
  {
    id: 'course-mobile-security',
    title: 'Mobile Security',
    category: 'advanced',
    description: 'Android/iOS угрозы, reversing, obfuscation, MobSF, APKTool.',
    iconName: 'Smartphone',
    certificateTitle: 'Сертификат Mobile Security Specialist',
    lessons: [
      {
        id: 'les-mobile-1',
        title: 'Урок 1. Угрозы мобильных ОС',
        durationMinutes: 22,
        xpReward: 140,
        description: 'Песочницы, разрешения, реверс, сниффинг, secure coding.',
        contentMarkdown: `
### Android

- APK decompilation
- Root detection bypass
- SSL pinning bypass
- Intent sniffing

### iOS

- Jailbreak detection
- Keychain analysis
- IPA reversing
        `,
        quiz: [
          {
            id: 'q-mobile-1',
            question: 'Что такое APK?',
            options: ['Apple Package', 'Android Package', 'Application Protocol Key', 'Advanced Protocol Kernel'],
            correctAnswer: 1,
            explanation: 'APK — формат пакета приложения Android.'
          }
        ]
      },
      {
        id: 'les-mobile-2',
        title: 'Урок 2. Статический разбор APK и MobSF',
        durationMinutes: 24,
        xpReward: 150,
        description: 'Decompilation APKTool, JADX, MobSF отчеты, пермишены, коды шифрования.',
        contentMarkdown: `
### Инструменты

- APKTool: декомпиляция ресурсов.
- JADX: Java/smali анализ.
- MobSF: автоматический отчет по permissions и vulnerabilities.
        `,
        quiz: [
          {
            id: 'q-mobile-2',
            question: 'Что чаще всего считают критичным при статическом анализе APK?',
            options: ['Цвет иконки','Небезопасные permissions и hardcoded secrets','Размер APK','Количество Aktivitet'],
            correctAnswer: 1,
            explanation: 'Permissions и embedded secrets — основные критичные findings.'
          }
        ]
      },
      {
        id: 'les-mobile-3',
        title: 'Урок 3. SSL Pinning, Runtime Protection и обфускация',
        durationMinutes: 26,
        xpReward: 160,
        description: 'SSL pinning bypass, Frida, anti-debug/anti-tampering, obfuscation ProGuard/R8.',
        contentMarkdown: `
### SSL Pinning

Проверка fingerprints сертификата внутри приложения.
        `,
        quiz: [
          {
            id: 'q-mobile-3',
            question: 'Какой инструмент используют для SSL pinning bypass?',
            options: ['Wireshark','Frida','Burp Passive','Nmap'],
            correctAnswer: 1,
            explanation: 'Frida позволяет hooking и обходить runtime protections.'
          }
        ]
      }
    
      ,      {
        id: 'les-mobile-4',
        title: 'Урок 4. Reverse engineering iOS и Android практика',
        durationMinutes: 24,
        xpReward: 150,
        description: 'Smali, Frida scripts, runtime tracing, jailbreak/root detection анализ.',
        contentMarkdown: `

### Android
- apktool + JADX
- Frida trace
- SSL pinning bypass
### iOS
- class-dump
- Frida on iOS
- jailbreak checks bypass
        `,
        quiz: [{"id": "q-mobile-4", "question": "Что такое IPA в контексте iOS?", "options": ["iOS Application Archive", "iOS App Store Package", "Internet Packet Analyzer", "Internal Password Archive"], "correctAnswer": 0, "explanation": "IPA — формат приложения iOS для установки/анализа."}]
      }
      ]
  },
  {
    id: 'course-red-teaming',
    title: 'Пентест & Этичный Хакинг: Методология и Инструменты',

    category: 'advanced',
    description: 'Изучите этапы проведения тестирования на проникновение: разведка (OSINT), сканирование Nmap, эксплуатация уязвимостей и составительный отчёт.',
    iconName: 'Crosshair',
    certificateTitle: 'Сертификат Специалиста по Тестированию на Проникновение (Penetration Tester)',
    lessons: [
      {
        id: 'les-red-1',
        title: 'Урок 1. Разведка (OSINT) и Сканирование портов с помощью Nmap',
        durationMinutes: 28,
        xpReward: 170,
        description: 'Методы поиска поддоменов, сканирование портов SYN Stealth Scan (-sS) и определение версий сервисов (-sV).',
        contentMarkdown: `
### Сетевая разведка с Nmap

Nmap является стандартом де-факто для исследования сетевой инфраструктуры.

#### Популярные ключи запуска Nmap:
\`\`\`bash
# Быстрое скрытное SYN-сканирование 1000 популярных портов с определением версий ОС и сервисов:
nmap -sS -sV -O -T4 192.168.1.1/24

# Сканирование всех 65535 TCP-портов:
nmap -p- -T4 target.com
\`\`\`
        `,
        quiz: [
          {
            id: 'q-red-1',
            question: 'Какое преимущество дает флаг -sS (SYN Stealth Scan) при сканировании Nmap?',
            options: [
              'Сканирование выполняется мгновенно за 1 миллисекунду',
              'Сканирование не завершает полное TCP-рукопожатие (сообщение RST отправляется вместо ACK), благодаря чему не фиксируется некоторыми простейшими системами логов',
              'Nmap автоматически взламывает найденные сервисы',
              'Запрос отправляется через сеть Tor'
            ],
            correctAnswer: 1,
            explanation: 'SYN-сканирование отправляет SYN-пакет и при получении SYN-ACK ответит RST пакетом, не создавая полноценное установленное соединение.'
          }
        ]
      },
      {
        id: 'les-red-2',
        title: 'Урок 2. Брутфорс паролей Hydra и эксплуатация популярных уязвимостей',
        durationMinutes: 26,
        xpReward: 160,
        description: 'Использование Hydra для проверки учётных записей и методология эксплуатации 5 типов уязвимостей на CTF.',
        contentMarkdown: `
### Hydra: эффективный перебор паролей

Hydra умеет работать с десятками протоколов: SSH, FTP, SMTP, HTTP Basic Auth и другие.
\`\`\`bash
# Пример безопасного тестирования strength пароля на ssh:
hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://127.0.0.1 -V
\`\`\`

#### Методика эксплуатации CTF-задач:
1. Поиск флага в файлах /etc/passwd, /etc/shadow.
2. Подключение к открытым портам и анализ баннеров.
3. Использование Metasploit модулей для критических CVE.
        `,
        quiz: [
          {
            id: 'q-red-2',
            question: 'При использовании Hydra для пентеста какой параметр критически важен для уменьшения шума в логах?',
            options: [
              'Флаг -V для вывода всех попыток',
              'Ограничение количества параллельных задач через -t и выбор более медленных режимов',
              'Использование словаря из 10 млн слов',
              'Тестирование только по локальному адресу 127.0.0.1'
            ],
            correctAnswer: 1,
            explanation: 'Слишком агрессивный перебор заполняет логи и может вызвать блокировку аккаунта.'
          }
        ]
      },
      {
        id: 'les-red-3',
        title: 'Урок 3. Документация пентеста и методы презентации отчётов',
        durationMinutes: 20,
        xpReward: 140,
        description: 'Как структурировать evidence: скриншоты, временные метки, PoC-код и executive summary для заказчика.',
        contentMarkdown: `
### Структура качественного отчёта

Пентест заканчивается не эксплойтом, а понятным документом с рисками и планом исправлений.

#### Оптимальная структура:
1. Executive Summary для руководства.
2. Техническое описание с PoC.
3. Рейтинг рисков: Critical / High / Medium / Low.
4. Рекомендации по remediation.
        `,
        quiz: [
          {
            id: 'q-red-3',
            question: 'Что обязательно должно содержать техническое описание уязвимости в отчёте?',
            options: [
              'Только URL страницы',
              'PoC, risks, affected assets, remediation steps, evidence screenshots',
              'Контактную информацию автора',
              'Пароли администраторов'
            ],
            correctAnswer: 1,
            explanation: 'Полный отчёт содержит доказательства, оценку риска и план исправления.'
          }
        ]
      }
    
      ,      {
        id: 'les-red-4',
        title: 'Урок 4. Методология PTES и структурированный отчёт',
        durationMinutes: 20,
        xpReward: 150,
        description: 'PTES фазы, threat modeling, evidence, executive summary, remediation roadmap.',
        contentMarkdown: `

### PTES phases
1. Pre-engagement
2. Intelligence gathering
3. Threat modeling
4. Vulnerability analysis
5. Exploitation
6. Post exploitation
7. Reporting
        `,
        quiz: [{"id": "q-red-4", "question": "Какой стандарт описывает фазы пентеста структурированно?", "options": ["PTES", "ISO 9001", "PCI DSS", "NIST SP 800-53"], "correctAnswer": 0, "explanation": "PTES — эталонная методология пентеста."}]
      }
      ]
  }
];
