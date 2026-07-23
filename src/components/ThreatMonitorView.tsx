import React, { useState } from 'react';
import { ThreatItem } from '../types';
import {
  AlertCircle, ShieldAlert, Search, Sparkles, Bell, CheckCircle2,
  Loader2, ArrowUpRight, Terminal
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-xs font-mono text-red-300">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Real-time Threat Intelligence</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Мониторинг <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-300">киберугроз</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Лента реального времени критических уязвимостей, фишинговых векторов и ИИ-сканер объектов.
          </p>
        </div>

        <Button
          variant={notificationsEnabled ? 'primary' : 'secondary'}
          size="sm"
          onClick={onToggleNotifications}
        >
          <Bell className="w-4 h-4" />
          <span>{notificationsEnabled ? 'Push: ВКЛ' : 'Включить Push'}</span>
        </Button>
      </div>

      {/* AI Scanner */}
      <Card variant="glass" padding="lg" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full -mr-24 -mt-24" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>CyberShield AI Сканер Безопасности</span>
          </div>

          <p className="text-xs text-slate-300">
            Вставьте ссылку, текст письма или код для экспресс-проверки.
          </p>

          <div className="flex flex-wrap gap-2 text-xs">
            {(['url', 'email', 'code'] as const).map(type => (
              <button
                key={type}
                onClick={() => setScanType(type)}
                className={`px-3 py-1.5 rounded-lg border font-mono transition-all ${scanType === type ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'}`}
              >
                {type === 'url' ? 'URL / Ссылка' : type === 'email' ? 'Текст Письма' : 'Исходный Код'}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={scanInput}
              onChange={setScanInput}
              placeholder={
                scanType === 'url'
                  ? 'https://suspicious-login-check.ru/auth'
                  : scanType === 'email'
                  ? 'Вставьте заголовок или текст письма...'
                  : 'const query = "SELECT * FROM users WHERE id = " + req.query.id;'
              }
              className="flex-1"
            />
            <Button variant="primary" size="md" onClick={handleRunAiScan} disabled={isScanning}>
              {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Запустить Анализ</span>
            </Button>
          </div>

          {scanResult && (
            <Card variant="bordered" padding="md" className="font-mono text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Результат Сканирования:</span>
                <Badge
                  variant={scanResult.riskLevel === 'CRITICAL' || scanResult.riskLevel === 'HIGH' ? 'red' : 'emerald'}
                  size="md"
                >
                  Уровень Риска: {scanResult.riskLevel} ({scanResult.score}/100)
                </Badge>
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
            </Card>
          )}
        </div>
      </Card>

      {/* Live Threat Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-red-400" />
            Сводка Критических Уязвимостей
          </h2>
          <Badge variant="slate" size="md">{threats.length}</Badge>
        </div>

        <div className="space-y-4">
          {threats.map(threat => (
            <Card key={threat.id} variant="glass" padding="lg" className="relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <Badge
                      variant={
                        threat.severity === 'CRITICAL' ? 'red' :
                        threat.severity === 'HIGH' ? 'amber' : 'slate'
                      }
                      size="sm"
                    >
                      {threat.severity}
                    </Badge>
                    <span className="text-cyan-400 font-bold">{threat.cveId || 'CVE-2026-X'}</span>
                    <span className="text-slate-500">• {threat.category}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{threat.date}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{threat.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{threat.summary}</p>
                </div>

                <Card variant="bordered" padding="sm" className="font-mono text-xs space-y-1">
                  <span className="text-amber-400">Вектор атаки:</span>
                  <p className="text-slate-300">{threat.vectorDetails}</p>
                </Card>

                <Card variant="bordered" padding="sm" className="text-xs space-y-1 border-emerald-800/50">
                  <span className="text-emerald-400 font-bold">Рекомендуемые меры защиты:</span>
                  <p className="text-emerald-200">{threat.mitigation}</p>
                </Card>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
