import React, { useState } from 'react';
import { ShieldCheck, Zap, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

export const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 shadow-xl shadow-cyan-950/50 mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">
            Cyber<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">Shield</span>
          </h1>
          <p className="text-slate-400 text-sm">Вход в платформу</p>
        </div>

        <Card variant="glass" padding="lg" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Пароль"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
            />

            <Button type="submit" variant="primary" size="lg" className="w-full">
              <span>Войти</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Нет аккаунта?{' '}
            <a href="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold">
              Зарегистрироваться
            </a>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Badge variant="slate" size="sm">
            <Zap className="w-3 h-3 inline mr-1" />
            152-ФЗ Compliant Platform
          </Badge>
        </div>
      </div>
    </div>
  );
};
