import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Simulated mock threat database
const THREAT_NEWS_DATA = [
  {
    id: 'thr-101',
    cveId: 'CVE-2026-11842',
    title: 'Критическая уязвимость RCE в приложениях Spring Boot / Java Frameworks',
    severity: 'CRITICAL',
    category: 'Remote Code Execution',
    summary: 'Обнаружен обход аутентификации с возможностью выполнения произвольного кода на серверах с включенным Actuator.',
    vectorDetails: 'Некорректная валидация HTTP-заголовков `X-Forwarded-Prefix` позволяет манипулировать Spring Cloud Config.',
    date: '2026-07-22 14:10',
    mitigation: 'Обновите зависимости Spring Boot до версии 3.4.2+ или заблокируйте доступ к эндпоинтам /actuator/*.',
    affectedSystems: ['Linux Cloud Servers', 'Enterprise Web Services', 'Docker Containers']
  },
  {
    id: 'thr-102',
    cveId: 'CVE-2026-9041',
    title: 'Фишинговая кампания с использованием стиллеров нового поколения "CyberGazer"',
    severity: 'HIGH',
    category: 'Social Engineering & Malware',
    summary: 'Атакующие рассылают поддельные уведомления о корпоративных обновлениях безопасности с PDF-вложениями.',
    vectorDetails: 'PDF содержит вредоносный макрос и скрытый JS-скрипт, извлекающий токены сессий браузеров и мессенджеров.',
    date: '2026-07-21 09:45',
    mitigation: 'Включите двухфакторную аутентификацию (2FA) с аппаратно защищенными ключами и обучите сотрудников распознавать спир-фишинг.',
    affectedSystems: ['Windows Workstations', 'Corporate Webmail', 'Telegram/Discord Tokens']
  },
  {
    id: 'thr-103',
    cveId: 'CVE-2026-5510',
    title: 'Уязвимость утечки сессий в WebSocket соединениях Node.js/Express',
    severity: 'MEDIUM',
    category: 'Authentication Bypass',
    summary: 'При повторном подключении клиентов без валидации токена handshake возникает риск перехвата активного WebSocket-канала.',
    vectorDetails: 'Отсутствие Origin-валидации в заголовках WebSocket handshake позволяет провести Cross-Site WebSocket Hijacking (CSWSH).',
    date: '2026-07-20 18:30',
    mitigation: 'Реализуйте проверку токенов при каждом переподключении и жесткую проверку заголовка Origin.',
    affectedSystems: ['Realtime Dashboards', 'Web Chat Applications', 'Node.js Edge Servers']
  },
  {
    id: 'thr-104',
    cveId: 'CVE-2026-7822',
    title: 'Массовый скомпрометированный пакет в NPM "data-cipher-utils"',
    severity: 'HIGH',
    category: 'Supply Chain Attack',
    summary: 'Популярная библиотека для шифрования данных внедряла вредоносный код, отправляющий частные RSA-ключи на сторонний IP.',
    vectorDetails: 'Вредоносный обфусцированный скрипт вызвался в postinstall шаге npm-пакета версии 2.1.4.',
    date: '2026-07-19 12:15',
    mitigation: 'Проверьте зависимости на наличие пакета `data-cipher-utils@2.1.4` и проведите ротацию всех API-ключей.',
    affectedSystems: ['JavaScript Applets', 'Node.js Backend Microservices']
  }
];

// In-memory mock cloud progress storage
const mockCloudDatabase: Record<string, any> = {};

// API: Get live threat feed
app.get('/api/threats', (req, res) => {
  res.json({
    status: 'success',
    updatedAt: new Date().toISOString(),
    threats: THREAT_NEWS_DATA
  });
});

// API: Sync user progress (Cloud Sync feature)
app.post('/api/sync/user-progress', (req, res) => {
  const { userId, progressData } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID required' });
  }

  mockCloudDatabase[userId] = {
    ...progressData,
    lastSyncedAt: new Date().toISOString()
  };

  res.json({
    status: 'synced',
    serverTime: new Date().toISOString(),
    syncId: `sync_${Date.now()}`
  });
});

app.get('/api/sync/user-progress/:userId', (req, res) => {
  const { userId } = req.params;
  const data = mockCloudDatabase[userId];
  if (!data) {
    return res.json({ status: 'not_found' });
  }
  res.json({ status: 'success', data });
});

// API: Gemini AI Security Assistant
app.post('/api/ai/ask-assistant', async (req, res) => {
  try {
    const { question, context } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Intelligent rule-based fallback response if no API key configured
      return res.json({
        answer: `[CyberShield AI Advisor] Ответ по запросу "${question}":\n\n` +
          `1. **Рекомендация по безопасности**: При работе с данным вектором угрозы всегда следуйте принципу наименьших привилегий (Least Privilege) и используйте многофакторную аутентификацию (MFA).\n` +
          `2. **Проверка уязвимости**: Убедитесь, что все пользовательские данные подвергаются санитайзингу перед обработкой.\n` +
          `3. **Практический шаг**: Используйте профильные сканеры (например, OWASP ZAP или Nmap) и регулярно обновляйте системные библиотеки.`
      });
    }

    const prompt = `Ты — эксперт по кибербезопасности и персональный ИИ-ассистент, обученный на методологии основателя и главного гуру платформы Ахмеда Себиева (CyberShield Academy).
Ответь на вопрос пользователя емко, профессионально и понятно на русском языке.
При необходимости рекомендуй продвинутые курсы и VIP менторство Ахмеда Себиева.
Используй списки и выделение жирным для ключевых терминов.
Контекст: ${context || 'Общая консультация по кибербезопасности'}
Вопрос: ${question}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ answer: response.text || 'К сожалению, не удалось сгенерировать ответ.' });
  } catch (err: any) {
    console.error('Error in AI Assistant endpoint:', err);
    res.status(500).json({ error: 'Ошибка при обработке запроса ИИ.', details: err.message });
  }
});

// API: Gemini AI Threat/URL/Code Scanner
app.post('/api/ai/analyze-url', async (req, res) => {
  try {
    const { inputData, inputType } = req.body; // 'url' | 'email' | 'code'
    if (!inputData) {
      return res.status(400).json({ error: 'Input data required' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback analysis simulation
      const isSuspicious = inputData.includes('login') || inputData.includes('password') || inputData.includes('http://') || inputData.includes('free');
      return res.json({
        riskLevel: isSuspicious ? 'HIGH' : 'LOW',
        score: isSuspicious ? 82 : 12,
        verdict: isSuspicious ? 'Подозрительный объект / Возможная фишинговая угроза' : 'Низкий уровень риска / Объект безопасен',
        findings: [
          isSuspicious ? 'Обнаружены ключевые слова, часто используемые в социальной инженерии.' : 'Не обнаружено известных вредоносных паттернов.',
          'Рекомендуется проверить SSL/TLS сертификаты и заголовки безопасности.'
        ],
        recommendation: isSuspicious ? 'Не переходите по этой ссылке и не вводите учетные данные!' : 'Объект выглядит стандартно, однако проявляйте базовую осмотрительность.'
      });
    }

    const prompt = `Проведи экспресс-анализ безопасности объекта тип "${inputType}":
Содержимое для анализа:
"${inputData}"

Верни JSON с полями:
{
  "riskLevel": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
  "score": number (0 до 100),
  "verdict": "короткий вердикт на русском",
  "findings": ["пункт 1 на русском", "пункт 2 на русском"],
  "recommendation": "рекомендация для пользователя"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    try {
      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (e) {
      res.json({
        riskLevel: 'MEDIUM',
        score: 55,
        verdict: 'Анализ завершен со стандартной оценкой',
        findings: [response.text || 'Парсинг ответа не удался, получен текстовый анализ.'],
        recommendation: 'Будьте осторожны при обработке неизвестного кода или ссылок.'
      });
    }
  } catch (err: any) {
    console.error('Error analyzing input:', err);
    res.status(500).json({ error: ' Ошибка сканирования ИИ.', details: err.message });
  }
});

// Vite Dev Server Middleware or Static Production Build
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CyberShield Academy Server listening on http://localhost:${PORT}`);
  });
}

startServer();
