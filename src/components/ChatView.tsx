import React, { useState } from 'react';
import { Send, Users } from 'lucide-react';
import { CHAT_ROOMS_DATA } from '../data/socialData';
import { ChatRoom } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';

export const ChatView: React.FC = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>(CHAT_ROOMS_DATA);
  const [activeRoomId, setActiveRoomId] = useState<string>(CHAT_ROOMS_DATA[0]?.id ?? '');
  const [text, setText] = useState('');
  const activeRoom = rooms.find(r => r.id === activeRoomId)!;

  const send = () => {
    if (!text.trim()) return;
    const msg = { id: `m${Date.now()}`, senderId: 'me', text: text.trim(), timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }), type: 'text' as const };
    setRooms(prev => prev.map(r => r.id === activeRoomId ? { ...r, messages: [...r.messages, msg] } : r));
    setText('');
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-cyan-500/30 rounded-2xl flex items-center justify-between gap-4 shadow-2xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            Чат сообщества
          </h1>
          <p className="text-xs text-slate-300 mt-1">Быстрые обсуждения по курсам, пентесту и угрозам.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass" padding="md" className="space-y-3">
          {rooms.map(r => (
            <button
              key={r.id}
              onClick={() => setActiveRoomId(r.id)}
              className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                activeRoomId === r.id ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              #{r.id}
            </button>
          ))}
        </Card>

        <Card variant="glass" padding="lg" className="md:col-span-2 space-y-4">
          <div className="h-64 overflow-y-auto space-y-3 pr-1">
            {activeRoom.messages.map(m => (
              <div key={m.id} className={`p-3 rounded-xl text-xs ${m.senderId === 'me' ? 'bg-cyan-900/30 border border-cyan-800/60 text-cyan-50 ml-auto max-w-[80%]' : 'bg-slate-950 border border-slate-800 text-slate-200'}`}>
                <div className="text-[10px] text-slate-400 font-mono mb-1">{m.senderId} • {m.timestamp}</div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input value={text} onChange={setText} placeholder="Сообщение..." className="flex-1" />
            <Button variant="primary" size="md" onClick={send}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
