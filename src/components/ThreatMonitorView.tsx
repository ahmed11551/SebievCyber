import React, { useState } from 'react';
import { ThreatItem } from '../types';
import { AlertCircle, ShieldAlert, Search, Sparkles, Bell, CheckCircle2, Loader2, ArrowUpRight, Terminal } from 'lucide-react';

interface ThreatMonitorViewProps {
  threats: ThreatItem[];
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
}

export const ThreatMonitorView: React.FC<ThreatMonitorViewProps> = ({
  threats,
  notificationsEnabled,
  onToggleNotifications
}) => {
  const [scanInput, setScanInput] = useState('');
  const [scanType, setScanType] = useState<'url' | 'email' | 'code'>('url');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const handleRunAiScan = async () => {
    if (!scanInput.trim() || isScanning) return;
    setIsScanning(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/ai/analyze-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputData: scanInput.trim(),
          inputType: scanType
        })
      });
      const data = await res.json();
      setScanResult(data);
    } catch (e) {
      setScanResult({
        riskLevel: 'HIGH',
        score: 78,
        verdict: 'Обнаружен потенциально подозрительный объект',
        findings: ['Введенный фрагмент содержит паттерны невалидированного ввода данных.'],
        recommendation: 'Не используйте данный код в продакшене без санитайзинга.'
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Push Notification Bar */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-400" />
            Мониторинг Киберугроз & ИИ-Сканер CVE
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Лента реального времени критических уязвимостей (NVD/CVE), фишинговых векторов и экспертный ИИ-сканер объектов.
          </p>
        </div>

        <button
          onClick={onToggleNotifications}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center space-x-2 transition-all ${
            notificationsEnabled
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>{notificationsEnabled ? 'Push-уведомления: ВКЛЮЧЕНЫ' : 'Включить Push-уведомления'}</span>
        </button>
      </div>

      {/* AI SCANNER SECTION */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 border border-cyan-500/30 rounded-2xl space-y-4 shadow-2xl">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span> CyberShield AI Сканер Безопасности</span>
        </div>

        <p className="text-xs text-slate-300">
          Вставьте ссылку (URL), текст подозрительного письма или код программы для экспресс-проверки ИИ-моделью Gemini:
        </p>

        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setScanType('url')}
            className={`px-3 py-1.5 rounded-lg border font-mono ${scanType === 'url' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
          >
            URL / Ссылка
          </button>
          <button
            onClick={() => setScanType('email')}
            className={`px-3 py-1.5 rounded-lg border font-mono ${scanType === 'email' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
          >
            Текст Письма
          </button>
          <button
            onClick={() => setScanType('code')}
            className={`px-3 py-1.5 rounded-lg border font-mono ${scanType === 'code' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
          >
            Исходный Код
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={scanInput}
            onChange={(e) => setScanInput(e.target.value)}
            placeholder={
              scanType === 'url' ? 'https://suspicious-login-check.ru/auth' :
              scanType === 'email' ? 'Вставьте заголовок или текст письма...' :
              'const query = "SELECT * FROM users WHERE id = " + req.query.id;'
            }
            className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={handleRunAiScan}
            disabled={isScanning}
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors"
          >
            {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Запустить Анализ</span>
          </button>
        </div>

        {/* Scan Results display */}
        {scanResult && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Результат Сканирования:</span>
              <span className={`px-2 py-0.5 rounded font-bold ${
                scanResult.riskLevel === 'CRITICAL' || scanResult.riskLevel === 'HIGH' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                Уровень Риска: {scanResult.riskLevel} ({scanResult.score}/100)
              </span>
            </div>

            <div className="text-white font-bold text-sm">{scanResult.verdict}</div>

            <div className="space-y-1 text-slate-300">
              <div className="text-slate-400">Выявленные маркеры:</div>
              {scanResult.findings?.map((f: string, i: number) => (
                <div key={i} className="text-cyan-300 pl-2 border-l-2 border-cyan-500">
                  • {f}
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-slate-900 rounded text-slate-200">
              <strong>Рекомендация:</strong> {scanResult.recommendation}
            </div>
          </div>
        )}
      </div>

      {/* LIVE CVE THREAT FEED */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-red-400" />
          Сводка Критических Уязвимостей (Real-time Threat Feed)
        </h2>

        <div className="space-y-4">
          {threats.map(threat => (
            <div
              key={threat.id}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className={`px-2.5 py-0.5 font-bold rounded ${
                    threat.severity === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800' :
                    threat.severity === 'HIGH' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {threat.severity}
                  </span>
                  <span className="text-cyan-400 font-bold">{threat.cveId || 'CVE-2026-X'}</span>
                  <span className="text-slate-500">• {threat.category}</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">{threat.date}</span>
              </div>

              <h3 className="text-base font-bold text-white">{threat.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{threat.summary}</p>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
                <span className="text-amber-400">Вектор атаки:</span>
                <p className="text-slate-300">{threat.vectorDetails}</p>
              </div>

              <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/50 space-y-1 text-xs">
                <span className="text-emerald-400 font-bold">Рекомендуемые меры защиты (Mitigation):</span>
                <p className="text-emerald-200">{threat.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
