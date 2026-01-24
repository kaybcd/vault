'use client';
import { useState } from 'react';

export default function ChatAgent({ fundName, strategy }: { fundName: string, strategy: string }) {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    
    // Placeholder for the actual API call logic
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ 
        prompt: `You are a risk analyst for ${fundName} (${strategy}). User asks: ${input}` 
      }),
    });
    const data = await response.json();
    setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    setInput('');
  };

  return (
    <div className="w-80 h-[500px] bg-[#111] border border-slate-800 rounded-3xl p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-emerald-400' : 'text-slate-300'}>
            <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>{m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input 
          className="flex-1 bg-black border border-slate-700 rounded-lg p-2 text-xs"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about risk..."
        />
        <button onClick={sendMessage} className="bg-emerald-500 text-black px-3 rounded-lg font-bold">↑</button>
      </div>
    </div>
  );
}