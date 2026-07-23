import React, { useState } from 'react';
import { Terminal, ShieldAlert, Cpu, CheckCircle2, Play, Lock, AlertOctagon, Trophy, Sparkles, X, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { UserProgress } from '../types';

interface TrojanHorseArenaProps {
  user: UserProgress;
  setUser: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenVipModal: () => void;
  onClose?: () => void;
}

export const TrojanHorseArena: React.FC<TrojanHorseArenaProps> = ({
  user,
  setUser,
  onOpenVipModal,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'ransomware' | 'sqli' | 'phishing'>('ransomware');

  // Mission 1 State (Trojan Kill)
  const [m1Processes, setM1Processes] = useState([
    { pid: 1042, name: 'systemd_service', cpu: '0.4%', isMalicious: false },
    { pid: 2108, name: 'nginx_master', cpu: '1.2%', isMalicious: false },
    { pid: 4012, name: 'trojan_stealer_x64.exe', cpu: '94.8%', isMalicious: true },
    { pid: 5120, name: 'node_express', cpu: '2.1%', isMalicious: false }
  ]);
  const [m1Killed, setM1Killed] = useState(false);
  const [m1RegCleaned, setM1RegCleaned] = useState(false);

  // Mission 2 State (SQLi Exploitation & Fix)
  const [m2Input, setM2Input] = useState("' OR '1'='1");
  const [m2Output, setM2Output] = useState<string | null>(null);
  const [m2Fixed, setM2Fixed] = useState(false);

  // Mission 3 State (Phishing Header Analysis)
  const [m3SelectedDomain, setM3SelectedDomain] = useState<string | null>(null);
  const [m3Solved, setM3Solved] = useState(false);

  // General Rewards State
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  // Mission 1 Handler
  const handleKillProcess = (pid: number) => {
    if (pid === 4012) {
      setM1Killed(true);
      setM1Processes(prev => prev.filter(p => p.pid !== 4012));
    }
  };

  const handleCleanRegistry = () => {
    setM1RegCleaned(true);
    if (!completedMissions.includes('m1')) {
      setCompletedMissions(prev => [...prev, 'm1']);
      setUser(prev => ({ ...prev, xp: prev.xp + 250 }));
    }
  };

  // Mission 2 Handler
  const handleRunExploit = () => {
    if (m2Input.includes("' OR") || m2Input.includes("UNION") || m2Input.includes("1=1")) {
      setM2Output('US-ADMIN-TOKEN: 0x9f8a72b1c4e • HASH: $2b$12$eX8mP2z... [ПЕРЕХВАТ УСПЕШЕН!]');
    } else {
      setM2Output('Ошибка 401: Доступ запрещен. Неверный формат инъекции.');
    }
  };

  const handleFixCode = () => {
    setM2Fixed(true);
    if (!completedMissions.includes('m2')) {
      setCompletedMissions(prev => [...prev, 'm2']);
      setUser(prev => ({ ...prev, xp: prev.xp + 250 }));
    }
  };

  // Mission 3 Handler
  const handleSelectPhishingDomain = (domain: string) => {
    setM3SelectedDomain(domain);
    if (domain === 'secure-bank-login-verify.ru') {
      setM3Solved(true);
      if (!completedMissions.includes('m3')) {
        setCompletedMissions(prev => [...prev, 'm3']);
        setUser(prev => ({ ...prev, xp: prev.xp + 250 }));
      }
    }
  };

  return (
    <div className="bg-slate-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-xs font-mono text-red-400">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span>Интерактивный "Троянский Конь" • Симулятор Кибератак Ахмеда Себиева</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Кибер-Арена: Взлом & Защита в Реальном Времени
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Пройдите боевые симуляции атак. Выполняйте задачи, зарабатывайте <strong className="text-amber-400 font-mono">+XP</strong> и разблокируйте статус VIP.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-2xl text-xs font-mono text-cyan-300">
            Пройдено: <strong className="text-white font-bold">{completedMissions.length}/3</strong> Миссий
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mission Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('ransomware')}
          className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'ransomware'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950 border border-cyan-400'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>1. Нейтрализация Трояна</span>
          {completedMissions.includes('m1') && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 ml-1" />}
        </button>

        <button
          onClick={() => setActiveTab('sqli')}
          className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'sqli'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950 border border-cyan-400'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>2. SQL-Инъекция & Эксплойт</span>
          {completedMissions.includes('m2') && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 ml-1" />}
        </button>

        <button
          onClick={() => setActiveTab('phishing')}
          className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'phishing'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950 border border-cyan-400'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <AlertOctagon className="w-4 h-4" />
          <span>3. Детектив Фишинга</span>
          {completedMissions.includes('m3') && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 ml-1" />}
        </button>
      </div>

      {/* Tab 1: Ransomware Trojan */}
      {activeTab === 'ransomware' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Задание: Найдите и завершите вредоносный процесс "Trojan.Stealer", пожирающий ресурсы CPU
            </h3>
            <p className="text-xs text-slate-300">
              Вредонос запущен в фоновом режиме и считывает пароли пользователей. Завершите вредоносный процесс PID и очистите заголовок реестра автозагрузки.
            </p>
          </div>

          <div className="p-4 bg-black border border-slate-800 rounded-2xl font-mono text-xs space-y-3">
            <div className="text-slate-400 border-b border-slate-800 pb-2 flex justify-between">
              <span>PID</span>
              <span>Имя Процесса</span>
              <span>Нагрузка CPU</span>
              <span>Действие</span>
            </div>

            {m1Processes.map(p => (
              <div key={p.pid} className={`flex items-center justify-between py-1.5 ${p.isMalicious ? 'text-red-400 font-bold animate-pulse' : 'text-slate-300'}`}>
                <span>{p.pid}</span>
                <span>{p.name}</span>
                <span>{p.cpu}</span>
                {p.isMalicious ? (
                  <button
                    onClick={() => handleKillProcess(p.pid)}
                    className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-[11px] rounded transition-colors"
                  >
                    Завершить (Kill -9)
                  </button>
                ) : (
                  <span className="text-slate-500 text-[11px]">Системный</span>
                )}
              </div>
            ))}
          </div>

          {m1Killed && (
            <div className="p-4 bg-slate-900 border border-cyan-500/40 rounded-2xl space-y-3 animate-fadeIn">
              <div className="text-xs text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Процесс трояна успешно уничтожен!
              </div>
              <p className="text-xs text-slate-300">
                Шаг 2: Удалите остаточную запись автозапуска из ветки реестра <code className="text-cyan-300">HKCU\Software\Microsoft\Windows\CurrentVersion\Run</code>.
              </p>
              <button
                onClick={handleCleanRegistry}
                disabled={m1RegCleaned}
                className={`px-4 py-2 font-bold text-xs rounded-xl transition-colors ${
                  m1RegCleaned
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                }`}
              >
                {m1RegCleaned ? 'Реестр очищен! (+250 XP)' : 'Очистить Реестр Автозагрузки'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: SQLi Attack */}
      {activeTab === 'sqli' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Задание: Протестируйте уязвимое поле авторизации и извлеките токен администратора
            </h3>
            <p className="text-xs text-slate-300">
              Включите режим этичного тестирования. Введите вектор SQL-инъекции, чтобы обойти проверку <code className="text-cyan-300">WHERE token = 'USER_INPUT'</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <label className="text-xs font-mono text-slate-400">Строка Ввода Запроса (SQL Payload):</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={m2Input}
                onChange={(e) => setM2Input(e.target.value)}
                className="flex-1 px-3 py-2 bg-black border border-slate-700 rounded-xl text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleRunExploit}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Выполнить Запрос
              </button>
            </div>

            {m2Output && (
              <div className="p-3 bg-black border border-slate-800 rounded-xl font-mono text-xs text-emerald-400">
                {m2Output}
              </div>
            )}
          </div>

          {m2Output && m2Output.includes('ПЕРЕХВАТ') && (
            <div className="p-4 bg-slate-900 border border-cyan-500/40 rounded-2xl space-y-3 animate-fadeIn">
              <div className="text-xs text-amber-400 font-bold">
                Шаг 2: Переведите этот запрос на подготавливаемые вызовы (Prepared Statements), чтобы исправить уязвимость.
              </div>
              <button
                onClick={handleFixCode}
                disabled={m2Fixed}
                className={`px-4 py-2 font-bold text-xs rounded-xl transition-colors ${
                  m2Fixed
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {m2Fixed ? 'Уязвимость исправлена! (+250 XP)' : 'Применить Патч Безопасности'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Phishing Detective */}
      {activeTab === 'phishing' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-cyan-400" />
              Задание: Определите мошеннический фишинговый домен из списка поступивших писем
            </h3>
            <p className="text-xs text-slate-300">
              На почту сотрудника финансового отдела пришло 3 письма с просьбой срочно подтвердить пароль. Найдите опасный тайпосквоттинг домен.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { domain: 'bank-security-official.ru', isPhish: false, desc: 'Легитимный корпоративный сервер' },
              { domain: 'secure-bank-login-verify.ru', isPhish: true, desc: '⚠️ Поддельный фишинговый сайт' },
              { domain: 'accounts.bank-corp.ru', isPhish: false, desc: 'Официальный субдомен аутентификации' }
            ].map(item => (
              <div
                key={item.domain}
                onClick={() => handleSelectPhishingDomain(item.domain)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  m3SelectedDomain === item.domain
                    ? item.isPhish
                      ? 'bg-red-950/60 border-red-500 text-red-100 scale-105'
                      : 'bg-slate-900 border-slate-700 text-slate-300'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="text-xs font-mono font-bold">{item.domain}</div>
                <div className="text-[11px] text-slate-400 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>

          {m3Solved && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl text-xs text-emerald-300 font-bold animate-fadeIn">
              🎉 Браво! Вы верно вычислили поддельный домен `secure-bank-login-verify.ru` и заблокировали его в DNS Resolver! (+250 XP)
            </div>
          )}
        </div>
      )}

      {/* Footer Call to Action from Founder Ahmed Sebiev */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-500/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs font-bold text-cyan-300 flex items-center justify-center md:justify-start gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Сообщение от Главного Эксперта Ахмеда Себиева</span>
          </div>
          <p className="text-xs text-slate-200 italic">
            "Отличная работа на Арене! Чтобы освоить все 50+ боевых сценариев, получить личные консультации и гарантированное трудоустройство — подключайте VIP Доступ."
          </p>
        </div>

        <button
          onClick={onOpenVipModal}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs rounded-xl shadow-xl shadow-amber-950/60 flex items-center space-x-2 transition-transform hover:scale-105 flex-shrink-0"
        >
          <Zap className="w-4 h-4 fill-black" />
          <span>Перейти в VIP Клуб Ахмеда Себиева</span>
        </button>
      </div>
    </div>
  );
};
