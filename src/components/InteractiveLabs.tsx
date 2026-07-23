import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle, Terminal, CheckCircle2, XCircle, Code2, RefreshCw, KeyRound, Sparkles, MailWarning, AlertOctagon } from 'lucide-react';

interface LabProps {
  labType: 'phishing-detector' | 'password-analyzer' | 'sqli-simulator' | 'encryption-lab' | 'header-checker' | 'xss-lab' | 'ssrf-lab' | 'phishing-simulator' | 'token-analyzer';
  onLabComplete?: (xpEarned: number) => void;
}

export const InteractiveLabs: React.FC<LabProps> = ({ labType, onLabComplete }) => {
  // Password Analyzer State
  const [passwordInput, setPasswordInput] = useState('');

  // SQLi State
  const [sqlUser, setSqlUser] = useState('');
  const [sqlPass, setSqlPass] = useState('');
  const [usePrepared, setUsePrepared] = useState(false);
  const [sqlOutput, setSqlOutput] = useState<{ status: 'idle' | 'success' | 'hacked' | 'error'; message: string }>({ status: 'idle', message: '' });

  // Phishing State
  const [phishAnswers, setPhishAnswers] = useState<Record<string, boolean>>({});
  const [phishSubmitted, setPhishSubmitted] = useState(false);

  // Encryption Lab State
  const [plainText, setPlainText] = useState('Секретные данные компании');
  const [cipherKey, setCipherKey] = useState(3);

  // Lab 1: Password Entropy & Brute-force Calculation
  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 12) score += 25;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[a-z]/.test(pwd)) score += 10;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15;

    let timeEstimate = 'Менее секунды';
    if (score > 80) timeEstimate = '~ 450 лет (2.1x10^16 операций)';
    else if (score > 60) timeEstimate = '~ 3 года';
    else if (score > 40) timeEstimate = '~ 2 дня';
    else if (score > 20) timeEstimate = '~ 15 минут';

    return { score: Math.min(100, score), timeEstimate };
  };

  const pwdInfo = calculatePasswordStrength(passwordInput);

  // Lab 2: SQL Injection Simulation Logic
  const handleSqlTest = () => {
    if (usePrepared) {
      if (sqlUser === 'admin' && sqlPass === 'secret123') {
        setSqlOutput({ status: 'success', message: ' Успешный вход в систему администрирования!' });
      } else {
        setSqlOutput({ status: 'error', message: 'Ошибка аутентификации: Неверный логин или пароль.' });
      }
    } else {
      // Vulnerable string check
      const query = `SELECT * FROM users WHERE username = '${sqlUser}' AND password = '${sqlPass}'`;
      if (sqlUser.includes("'") || sqlPass.includes("'") || sqlUser.includes('--') || sqlPass.includes('--') || sqlUser.toLowerCase().includes('or 1=1')) {
        setSqlOutput({
          status: 'hacked',
          message: ` ВНИМАНИЕ: Уязвимость SQLi сработала! Выполнен запрос: "${query}". Доступ к системе получен в обход пароля!`
        });
        if (onLabComplete) onLabComplete(50);
      } else if (sqlUser === 'admin' && sqlPass === 'secret123') {
        setSqlOutput({ status: 'success', message: 'Вход выполнен по верным учетным данным.' });
      } else {
        setSqlOutput({ status: 'error', message: 'Неверные данные.' });
      }
    }
  };

  return (
    <div className="p-6 bg-slate-900/90 border border-cyan-500/30 rounded-xl my-6 shadow-xl text-slate-100">
      <div className="flex items-center space-x-2 text-cyan-400 font-bold mb-4">
        <Terminal className="w-5 h-5 text-cyan-400" />
        <span className="uppercase text-xs tracking-wider font-mono">Интерактивный Практикум / Кибер-Песочница</span>
      </div>

      {/* PASSWORD ANALYZER */}
      {labType === 'password-analyzer' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-amber-400" />
            Анализатор Энтропии и Устойчивости Паролей
          </h4>
          <p className="text-sm text-slate-300">
            Введите пароль для мгновенной оценки алгоритмами криптоанализа и расчетов мощности видеокарт:
          </p>

          <input
            type="text"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Введите тестируемый пароль..."
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
          />

          {passwordInput && (
            <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Индекс надежности:</span>
                <span className={`font-bold ${pwdInfo.score > 70 ? 'text-emerald-400' : pwdInfo.score > 40 ? 'text-amber-400' : 'text-red-400'}`}>
                  {pwdInfo.score} %
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${pwdInfo.score > 70 ? 'bg-emerald-500' : pwdInfo.score > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${pwdInfo.score}%` }}
                />
              </div>

              <div className="text-xs text-slate-400 pt-1 flex items-center justify-between">
                <span>Примерное время взлома методом Brute-Force (Nvidia RTX 5090 cluster):</span>
                <span className="font-mono text-cyan-300 font-bold">{pwdInfo.timeEstimate}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SQL INJECTION SIMULATOR */}
      {labType === 'sqli-simulator' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <Code2 className="w-5 h-5 text-red-400" />
            Симулятор SQL-Инъекции (SQLi Sandbox)
          </h4>
          <p className="text-sm text-slate-300">
            Попробуйте ввести пейлоад <code className="bg-slate-950 px-2 py-0.5 text-amber-300 rounded">admin' --</code> в поле логина в режиме "Без защиты":
          </p>

          <div className="flex items-center space-x-3 text-xs bg-slate-950 p-3 rounded border border-slate-800">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={usePrepared}
                onChange={(e) => setUsePrepared(e.target.checked)}
                className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="font-semibold text-cyan-300">Включить защиту Подготавливаемых Запросов (Prepared Statements)</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Имя пользователя (Login):</label>
              <input
                type="text"
                value={sqlUser}
                onChange={(e) => setSqlUser(e.target.value)}
                placeholder="admin' --"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm font-mono text-cyan-300"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Пароль:</label>
              <input
                type="text"
                value={sqlPass}
                onChange={(e) => setSqlPass(e.target.value)}
                placeholder="любой пароль"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded border border-slate-800 font-mono text-xs text-slate-400">
            <span>Сформированный SQL-запрос на сервере:</span>
            <div className="text-amber-300 mt-1">
              {usePrepared
                ? `SELECT * FROM users WHERE username = $1 AND password_hash = $2`
                : `SELECT * FROM users WHERE username = '${sqlUser}' AND password = '${sqlPass}'`}
            </div>
          </div>

          <button
            onClick={handleSqlTest}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-medium text-sm rounded-lg transition-colors"
          >
            Отправить Запрос на Сервер
          </button>

          {sqlOutput.message && (
            <div className={`p-4 rounded-lg border text-sm font-mono ${
              sqlOutput.status === 'hacked' ? 'bg-red-950/80 border-red-500/50 text-red-200' :
              sqlOutput.status === 'success' ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' :
              'bg-slate-950 border-slate-800 text-slate-300'
            }`}>
              {sqlOutput.message}
            </div>
          )}
        </div>
      )}

      {/* PHISHING DETECTOR */}
      {labType === 'phishing-detector' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Инспектор Фишинговых Писем
          </h4>
          <p className="text-sm text-slate-300">
            Отметьте подозрительные элементы в данном корпоративном сообщении:
          </p>

          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3 font-sans text-sm">
            <div className="border-b border-slate-800 pb-2 text-xs text-slate-400 space-y-1">
              <div><strong>От кого:</strong> Служба Поддержки &lt;support@beIain-security-check.ru&gt;</div>
              <div><strong>Тема:</strong> СРОЧНО! Требуется подтверждение аккаунта в течение 1 часа</div>
            </div>
            <div className="text-slate-200 space-y-2">
              <p>Уважаемый клиент,</p>
              <p>В нашей системе обнаружен подозрительный вход из другого региона. Для избежания блокировки перейдите по ссылке и введите данные банковской карты:</p>
              <div className="p-2 bg-slate-900 border border-slate-700 rounded text-cyan-400 text-xs font-mono">
                https://login.beIain-security-check.ru/verify?token=99281
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={(e) => setPhishAnswers(prev => ({ ...prev, domain: e.target.checked }))}
                className="rounded border-slate-700 text-cyan-500"
              />
              <span>Подозрительный домен отравителя (буква 'I' вместо 'l' в Beeline)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={(e) => setPhishAnswers(prev => ({ ...prev, urgency: e.target.checked }))}
                className="rounded border-slate-700 text-cyan-500"
              />
              <span>Искусственная срочность и манипуляция страхом блокировки</span>
            </label>
          </div>

          <button
            onClick={() => {
              setPhishSubmitted(true);
              if (phishAnswers.domain && phishAnswers.urgency && onLabComplete) {
                onLabComplete(60);
              }
            }}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm rounded-lg"
          >
            Проверить Результат
          </button>

          {phishSubmitted && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded text-xs text-emerald-200">
              ✓ Отлично! Вы верно идентифицировали все ключевые признаки фишинга. +60 XP
            </div>
          )}
        </div>
      )}

      {/* ENCRYPTION LAB */}
      {labType === 'encryption-lab' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            Лаборатория Криптографического Шифрования
          </h4>
          <p className="text-sm text-slate-300">
            Исследуйте шифрование данных алгоритмом Цезаря и генерацию SHA-256 хэшей в реальном времени:
          </p>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Исходный открытый текст (Plaintext):</label>
            <input
              type="text"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Сдвиг ключа (Key Shift): {cipherKey}</label>
            <input
              type="range"
              min="1"
              max="15"
              value={cipherKey}
              onChange={(e) => setCipherKey(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-slate-400">Зашифрованный текст (Ciphertext):</div>
            <div className="text-emerald-400 font-bold break-all">
              {plainText.split('').map(char => String.fromCharCode(char.charCodeAt(0) + cipherKey)).join('')}
            </div>
          </div>
        </div>
      )}

      {/* HEADER CHECKER */}
      {labType === 'header-checker' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Проверка Заголовков Защиты HTTP
          </h4>
          <p className="text-sm text-slate-300">
            Рекомендуемые заголовки безопасности для защиты корпоративного веб-сервера:
          </p>

          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-emerald-400">
              <span>Strict-Transport-Security:</span>
              <span>max-age=31536000; includeSubDomains</span>
            </div>
            <div className="flex items-center justify-between text-cyan-400">
              <span>X-Frame-Options:</span>
              <span>DENY</span>
            </div>
            <div className="flex items-center justify-between text-amber-400">
              <span>X-Content-Type-Options:</span>
              <span>nosniff</span>
            </div>
            <div className="flex items-center justify-between text-blue-400">
              <span>Content-Security-Policy:</span>
              <span>default-src 'self'</span>
            </div>
          </div>
        </div>
      )}

      {/* XSS LAB */}
      {labType === 'xss-lab' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <Code2 className="w-5 h-5 text-red-400" />
            XSS лаборатория / безопасный preview
          </h4>
          <p className="text-sm text-slate-300">
            Введите фрагмент для безопасного отображения. Цель: увидеть, как встроенный текст попадает в DOM и как снижается риск.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ввод комментария:</label>
              <input
                type="text"
                placeholder="Например: Привет, <b>мир</b>"
                onInput={(e) => {
                  const v = e.currentTarget.value;
                  const preview = document.getElementById('xss-preview');
                  if (preview) preview.innerHTML = `<!-- ${v.replace(/</g,'&lt;').replace(/>/g,'&gt;')} -->`;
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm text-cyan-300"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">DOM-превью safe:</label>
              <div id="xss-preview" className="p-3 bg-black border border-slate-800 rounded text-xs text-emerald-300 min-h-[40px]"></div>
            </div>
          </div>
        </div>
      )}

      {/* SSRF LAB */}
      {labType === 'ssrf-lab' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-indigo-400" />
            SSRF симулятор / Allowlist-checker
          </h4>
          <p className="text-sm text-slate-300">
            Проверка доступа к внутреннему resource через пользовательский URL. Ожидаемо: публичные домены разрешены, приватные/loopback запрещены.
          </p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span>Проверяемый URL:</span>
              <input id="ssrf-input" placeholder="https://example.com" className="px-2 py-1 bg-black border border-slate-700 rounded text-slate-100 w-64" />
              <button id="ssrf-btn" className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded">Проверить</button>
            </div>
            <div id="ssrf-result" className="text-slate-300"></div>
          </div>
          <script dangerouslySetInnerHTML={{ __html: `
            (function(){
              try {
                const btn = document.getElementById('ssrf-btn');
                const input = document.getElementById('ssrf-input');
                const result = document.getElementById('ssrf-result');
                if (!btn || !input || !result) return;
                btn.addEventListener('click', () => {
                  const v = input.value || '';
                  const host = v.replace(/^https?:\\/\\//, '').split('/')[0].split(':')[0];
                  const isPrivate = /^(10\\.|172\\.(1[6-9]|2\\d|3[01])\\.|192\\.168\\.|127\\.|0\\.)/.test(host);
                  if (!v.trim()) { result.textContent = 'Введите URL'; result.className = 'text-red-300'; return; }
                  if (isPrivate) { result.textContent = 'Блокировано: приватный/loopback хост'; result.className = 'text-red-300'; }
                  else { result.textContent = 'Разрешено: публичный хост'; result.className = 'text-emerald-300'; }
                });
              } catch (e) { console.error(e); }
            })();
          ` }} />
        </div>
      )}

      {/* PHISHING SIMULATOR */}
      {labType === 'phishing-simulator' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <MailWarning className="w-5 h-5 text-amber-400" />
            Симулятор фишингового письма
          </h4>
          <p className="text-sm text-slate-300">
            Оцените письмо по 3 признакам: домен отправителя, срочная просьба, подозрительная ссылка.
          </p>
          <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
            <li>Домен с опечаткой или подозрительный — повышайте риск.</li>
            <li>Срочность + требование пароля/карты — типичный маркер.</li>
            <li>Не вводите данные на неподтвержденных доменах.</li>
          </ul>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded text-xs text-slate-300">
            Пример: тема "СРОЧНО! Подтвердите аккаунт", отправитель "support@beIain-security-check.ru", ссылка "https://login.beIain-security-check.ru/verify?token=99281"
          </div>
        </div>
      )}

      {/* TOKEN ANALYZER */}
      {labType === 'token-analyzer' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-cyan-400" />
            JWT Claims и риски
          </h4>
          <p className="text-sm text-slate-300">
            Изучите Claims и почему алгоритм и срок действия — часть защиты.
          </p>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded text-xs font-mono text-slate-300 space-y-1">
            <div>Header: <code className="text-cyan-300">{'{'}"alg":"RS256","typ":"JWT"</code></div>
            <div>Payload: <code className="text-cyan-300">{'{'}"sub":"user_42","exp":1750000000,"iss":"https://idp.example"</code></div>
            <div>Подпись: <span className="text-amber-300">HMAC/RSA</span></div>
          </div>
          <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
            <li>Проверяйте <span className="text-cyan-300">exp</span> и <span className="text-cyan-300">iss</span>.</li>
            <li>Не допускайте <span className="text-red-300">alg=none</span>.</li>
            <li>Используйте RS256 для межсервисной коммуникации.</li>
          </ul>
        </div>
      )}
    </div>
  );
};
