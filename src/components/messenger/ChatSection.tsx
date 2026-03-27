import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, CHATS, INITIAL_MESSAGES } from "./types";
import type { Message } from "./types";

// ─── Chat List ────────────────────────────────────────────────────────────────
export function ChatList({ selected, onSelect }: { selected: number | null; onSelect: (id: number) => void }) {
  const [search, setSearch] = useState("");
  const filtered = CHATS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-xl font-semibold mb-3" style={{ color: "var(--qube-text)" }}>Чаты</h1>
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--qube-text-muted)" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl outline-none transition-colors"
            style={{ background: "var(--qube-surface-2)", color: "var(--qube-text)" }}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filtered.map((chat, i) => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className="w-full flex items-center gap-3 px-4 py-3 transition-all text-left animate-fade-in"
            style={{
              animationDelay: `${i * 40}ms`,
              background: selected === chat.id ? "var(--qube-accent-light)" : "transparent",
              borderLeft: selected === chat.id ? "2px solid var(--qube-accent)" : "2px solid transparent",
            }}
          >
            <Avatar text={chat.avatar} online={chat.online} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm truncate" style={{ color: "var(--qube-text)" }}>{chat.name}</span>
                <span className="text-xs ml-2 flex-shrink-0" style={{ color: "var(--qube-text-muted)" }}>{chat.time}</span>
              </div>
              <div className="flex justify-between items-center mt-0.5">
                {chat.typing ? (
                  <span className="text-xs flex items-center gap-1" style={{ color: "var(--qube-accent)" }}>
                    печатает
                    <span className="flex gap-0.5 ml-1">
                      <span className="w-1 h-1 rounded-full typing-dot" style={{ background: "var(--qube-accent)" }} />
                      <span className="w-1 h-1 rounded-full typing-dot" style={{ background: "var(--qube-accent)" }} />
                      <span className="w-1 h-1 rounded-full typing-dot" style={{ background: "var(--qube-accent)" }} />
                    </span>
                  </span>
                ) : (
                  <span className="text-xs truncate" style={{ color: "var(--qube-text-muted)" }}>{chat.lastMessage}</span>
                )}
                {chat.unread > 0 && (
                  <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-semibold flex items-center justify-center"
                    style={{ background: "var(--qube-accent)", color: "#fff" }}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Chat Window ──────────────────────────────────────────────────────────────
export function ChatWindow({ chatId, onBack }: { chatId: number; onBack: () => void }) {
  const chat = CHATS.find(c => c.id === chatId)!;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages(prev => [...prev, { id: Date.now(), text: input.trim(), time, mine: true, status: "sent" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--qube-border)", background: "var(--qube-surface)" }}>
        <button onClick={onBack} className="p-1.5 rounded-xl hover:bg-secondary transition-colors md:hidden" style={{ color: "var(--qube-text-muted)" }}>
          <Icon name="ArrowLeft" size={18} />
        </button>
        <Avatar text={chat.avatar} online={chat.online} />
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: "var(--qube-text)" }}>{chat.name}</p>
          <p className="text-xs" style={{ color: chat.online ? "var(--qube-online)" : "var(--qube-text-muted)" }}>
            {chat.online ? "В сети" : "Был недавно"}
          </p>
        </div>
        <div className="flex items-center gap-0.5">
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors" style={{ color: "var(--qube-text-muted)" }}>
            <Icon name="Phone" size={18} />
          </button>
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors" style={{ color: "var(--qube-text-muted)" }}>
            <Icon name="Video" size={18} />
          </button>
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors" style={{ color: "var(--qube-text-muted)" }}>
            <Icon name="MoreVertical" size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-5 flex flex-col gap-2">
        {messages.map((msg, i) => (
          <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"} animate-slide-up`}
            style={{ animationDelay: `${i * 30}ms` }}>
            <div className="max-w-[68%]">
              <div className="px-4 py-2.5 text-sm leading-relaxed"
                style={{
                  background: msg.mine ? "var(--qube-accent)" : "var(--qube-surface)",
                  color: msg.mine ? "#fff" : "var(--qube-text)",
                  borderRadius: msg.mine ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}>
                {msg.text}
              </div>
              <div className={`flex items-center gap-1 mt-1 ${msg.mine ? "justify-end" : "justify-start"}`}>
                <span className="text-[10px]" style={{ color: "var(--qube-text-muted)" }}>{msg.time}</span>
                {msg.mine && (
                  <Icon name={msg.status === "read" ? "CheckCheck" : "Check"} size={12}
                    style={{ color: msg.status === "read" ? "var(--qube-accent)" : "var(--qube-text-muted)" }} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3" style={{ borderTop: "1px solid var(--qube-border)", background: "var(--qube-surface)" }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl" style={{ background: "var(--qube-surface-2)" }}>
          <button className="p-1 transition-colors flex-shrink-0" style={{ color: "var(--qube-text-muted)" }}>
            <Icon name="Paperclip" size={18} />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Написать сообщение..."
            className="flex-1 bg-transparent outline-none text-sm min-w-0"
            style={{ color: "var(--qube-text)" }}
          />
          <button className="p-1 transition-colors flex-shrink-0" style={{ color: "var(--qube-text-muted)" }}>
            <Icon name="Smile" size={18} />
          </button>
          <button onClick={send}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-90 flex-shrink-0"
            style={{ background: "var(--qube-accent)" }}>
            <Icon name="Send" size={14} style={{ color: "#fff" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 animate-fade-in">
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
        style={{ background: "var(--qube-accent-light)" }}>
        <span className="text-4xl font-bold" style={{ color: "var(--qube-accent)", letterSpacing: -1 }}>Q</span>
      </div>
      <div className="text-center">
        <p className="font-semibold text-lg" style={{ color: "var(--qube-text)" }}>QUBE</p>
        <p className="text-sm mt-1" style={{ color: "var(--qube-text-muted)" }}>Выберите чат слева, чтобы начать общение</p>
      </div>
    </div>
  );
}
