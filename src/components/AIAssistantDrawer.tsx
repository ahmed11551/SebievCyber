import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, ShieldAlert, Loader2 } from 'lucide-react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const AIAssistantDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Приветствую! Я ИИ-Ассистент основателя и гуру безопасности Ахмеда Себиева. Готов ответить на любые вопросы по практической защите информации, анализу 0-day уязвимостей, коду и подборкам курсов.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/ask-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMsg,
          context: 'Консультация пользователя в личной образовательной сессии.'
        })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.answer || 'Ответ получен.' }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: ' Рекомендуется проверить соединение. При вопросах по коду используйте подготавливаемые запросы и экранирование спецсимволов.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3.5 bg-gradient-to-tr from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full shadow-2xl shadow-cyan-950 flex items-center space-x-2 border border-cyan-400/40 transition-transform hover:scale-105"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="hidden sm:inline font-bold text-sm tracking-wide">CyberShield AI</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ИИ-Ассистент Ахмеда Себиева</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl max-w-[85%] ${
                  m.sender === 'user'
                    ? 'ml-auto bg-cyan-600 text-white font-sans'
                    : 'bg-slate-900 text-slate-200 border border-slate-800 font-sans leading-relaxed whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-400 p-2 bg-slate-900 rounded-lg w-fit text-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Анализирую векторы безопасности...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Задайте вопрос по кибербезопасности..."
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
