import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Types ────────────────────────────────────────────────────────────────────
type Section = "chats" | "stories" | "calls" | "contacts" | "settings";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  mine: boolean;
  status?: "sent" | "delivered" | "read";
}

interface Story {
  id: number;
  name: string;
  avatar: string;
  seen: boolean;
  isMe?: boolean;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CHATS: Chat[] = [
  { id: 1, name: "Алина Морозова", avatar: "АМ", lastMessage: "Хорошо, увидимся завтра!", time: "14:32", unread: 2, online: true },
  { id: 2, name: "Дизайн команда", avatar: "ДК", lastMessage: "Новые макеты готовы к ревью", time: "13:15", unread: 5, online: false },
  { id: 3, name: "Максим Петров", avatar: "МП", lastMessage: "Отправил тебе файлы", time: "12:00", unread: 0, online: true, typing: true },
  { id: 4, name: "Катя Волкова", avatar: "КВ", lastMessage: "Спасибо за помощь 🙌", time: "11:45", unread: 0, online: false },
  { id: 5, name: "Разработка", avatar: "РЗ", lastMessage: "Деплой прошёл успешно", time: "10:20", unread: 1, online: false },
  { id: 6, name: "Иван Соколов", avatar: "ИС", lastMessage: "Когда встреча?", time: "09:05", unread: 0, online: true },
  { id: 7, name: "Маркетинг", avatar: "МК", lastMessage: "Публикуем в пятницу", time: "Вчера", unread: 0, online: false },
];

const INITIAL_MESSAGES: Message[] = [
  { id: 1, text: "Привет! Как дела с проектом?", time: "14:01", mine: false },
  { id: 2, text: "Всё идёт по плану, почти закончил основную часть", time: "14:03", mine: true, status: "read" },
  { id: 3, text: "Отлично! Когда можешь показать?", time: "14:10", mine: false },
  { id: 4, text: "Завтра утром пришлю превью. Там будет несколько экранов", time: "14:12", mine: true, status: "read" },
  { id: 5, text: "Хорошо, увидимся завтра!", time: "14:32", mine: false },
];

const STORIES: Story[] = [
  { id: 0, name: "Моя история", avatar: "Я", seen: false, isMe: true },
  { id: 1, name: "Алина", avatar: "АМ", seen: false },
  { id: 2, name: "Максим", avatar: "МП", seen: false },
  { id: 3, name: "Катя", avatar: "КВ", seen: true },
  { id: 4, name: "Иван", avatar: "ИС", seen: true },
  { id: 5, name: "Дизайн", avatar: "ДК", seen: true },
];

const CONTACTS: Contact[] = [
  { id: 1, name: "Алина Морозова", avatar: "АМ", status: "В сети", online: true },
  { id: 2, name: "Иван Соколов", avatar: "ИС", status: "Был час назад", online: false },
  { id: 3, name: "Катя Волкова", avatar: "КВ", status: "Не беспокоить", online: false },
  { id: 4, name: "Максим Петров", avatar: "МП", status: "В сети", online: true },
  { id: 5, name: "Роман Белов", avatar: "РБ", status: "Был вчера", online: false },
  { id: 6, name: "Таня Лисова", avatar: "ТЛ", status: "В сети", online: true },
];

const CALLS = [
  { id: 1, name: "Алина Морозова", avatar: "АМ", type: "incoming", time: "14:32", duration: "5:12", missed: false },
  { id: 2, name: "Максим Петров", avatar: "МП", type: "outgoing", time: "12:00", duration: "", missed: false },
  { id: 3, name: "Катя Волкова", avatar: "КВ", type: "incoming", time: "09:15", duration: "", missed: true },
  { id: 4, name: "Иван Соколов", avatar: "ИС", type: "outgoing", time: "Вчера", duration: "12:34", missed: false },
  { id: 5, name: "Роман Белов", avatar: "РБ", type: "incoming", time: "Вчера", duration: "", missed: true },
];

// ─── Avatar ───────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-violet-100 text-violet-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
  "bg-sky-100 text-sky-600",
];

function Avatar({ text, size = "md", online = false, story = false, seen = false }: {
  text: string; size?: "sm" | "md" | "lg" | "xl"; online?: boolean; story?: boolean; seen?: boolean;
}) {
  const idx = (text.charCodeAt(0) + text.charCodeAt(1 < text.length ? 1 : 0)) % AVATAR_COLORS.length;
  const color = AVATAR_COLORS[idx];
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-11 h-11 text-sm", lg: "w-14 h-14 text-base", xl: "w-16 h-16 text-lg" };
  const margin = story ? "2px" : undefined;

  return (
    <div className="relative flex-shrink-0">
      {story && !seen && (
        <div className="absolute inset-0 rounded-full" style={{ padding: 2, background: "conic-gradient(#3B6FF5, #60A5FA, #3B6FF5)", zIndex: 0 }}>
          <div className="w-full h-full rounded-full" style={{ background: "var(--background)" }} />
        </div>
      )}
      {story && seen && (
        <div className="absolute inset-0 rounded-full" style={{ padding: 2, background: "var(--qube-border)", zIndex: 0 }}>
          <div className="w-full h-full rounded-full" style={{ background: "var(--background)" }} />
        </div>
      )}
      <div className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold ${color} relative`}
        style={{ zIndex: 1, margin }}>
        {text}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" style={{ zIndex: 2 }} />
      )}
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
const NAV_ITEMS: { key: Section; icon: string; label: string }[] = [
  { key: "chats", icon: "MessageCircle", label: "Чаты" },
  { key: "stories", icon: "CirclePlay", label: "Истории" },
  { key: "calls", icon: "Phone", label: "Звонки" },
  { key: "contacts", icon: "Users", label: "Контакты" },
  { key: "settings", icon: "Settings", label: "Настройки" },
];

// ─── Chat List ────────────────────────────────────────────────────────────────
function ChatList({ selected, onSelect }: { selected: number | null; onSelect: (id: number) => void }) {
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
function ChatWindow({ chatId, onBack }: { chatId: number; onBack: () => void }) {
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

// ─── Stories ──────────────────────────────────────────────────────────────────
function StoriesView() {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [progress, setProgress] = useState(0);

  const openStory = (story: Story) => {
    if (story.isMe) return;
    setActiveStory(story);
    setProgress(0);
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(timer); setActiveStory(null); return 0; }
        return p + 2;
      });
    }, 60);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-xl font-semibold" style={{ color: "var(--qube-text)" }}>Истории</h1>
      </div>

      <div className="px-4 pb-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
          {STORIES.map(story => (
            <button key={story.id} onClick={() => openStory(story)} className="flex flex-col items-center gap-1.5 flex-shrink-0 animate-fade-in">
              {story.isMe ? (
                <div className="relative">
                  <Avatar text={story.avatar} size="lg" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "var(--qube-accent)", border: "2px solid var(--background)" }}>
                    <Icon name="Plus" size={10} style={{ color: "#fff" }} />
                  </div>
                </div>
              ) : (
                <Avatar text={story.avatar} size="lg" story={true} seen={story.seen} />
              )}
              <span className="text-xs" style={{ color: "var(--qube-text-muted)" }}>
                {story.isMe ? "Моя" : story.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 flex-1 overflow-y-auto scrollbar-hide">
        <p className="text-xs font-semibold mb-3" style={{ color: "var(--qube-text-muted)" }}>НЕДАВНИЕ</p>
        <div className="grid grid-cols-2 gap-3">
          {STORIES.filter(s => !s.isMe).map((story, i) => (
            <button key={story.id} onClick={() => openStory(story)}
              className="relative rounded-2xl overflow-hidden animate-scale-in"
              style={{ animationDelay: `${i * 60}ms`, aspectRatio: "3/4", background: `hsl(${story.id * 57 + 190} 55% 86%)` }}>
              <div className="absolute inset-0 flex flex-col justify-between p-3">
                <Avatar text={story.avatar} size="sm" story={true} seen={story.seen} />
                <div>
                  <p className="text-sm font-medium text-left" style={{ color: "var(--qube-text)" }}>{story.name}</p>
                  <p className="text-xs text-left" style={{ color: "var(--qube-text-muted)" }}>2 ч назад</p>
                </div>
              </div>
              {story.seen && <div className="absolute inset-0 bg-white/25" />}
            </button>
          ))}
        </div>
      </div>

      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-scale-in"
          style={{ background: "rgba(0,0,0,0.92)" }} onClick={() => setActiveStory(null)}>
          <div className="relative w-full max-w-sm h-[85vh] rounded-3xl overflow-hidden"
            style={{ background: `hsl(${activeStory.id * 57 + 190} 55% 40%)` }}
            onClick={e => e.stopPropagation()}>
            <div className="absolute top-3 left-3 right-3 z-10">
              <div className="h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }}>
                <div className="h-full rounded-full bg-white transition-none" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="absolute top-8 left-3 right-3 z-10 flex items-center gap-2">
              <Avatar text={activeStory.avatar} size="sm" />
              <span className="text-white font-medium text-sm">{activeStory.name}</span>
              <span className="text-white/60 text-xs ml-1">2 ч назад</span>
              <button onClick={() => setActiveStory(null)} className="ml-auto text-white/70 hover:text-white">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-5xl font-light opacity-20">Q</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Calls ────────────────────────────────────────────────────────────────────
function CallsView() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-5 pb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold" style={{ color: "var(--qube-text)" }}>Звонки</h1>
        <button className="p-2 rounded-xl hover:bg-secondary transition-colors" style={{ color: "var(--qube-accent)" }}>
          <Icon name="PhoneCall" size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {CALLS.map((call, i) => (
          <div key={call.id} className="flex items-center gap-3 px-4 py-3 animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}>
            <Avatar text={call.avatar} />
            <div className="flex-1">
              <p className="font-medium text-sm" style={{ color: call.missed ? "#EF4444" : "var(--qube-text)" }}>{call.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Icon name={call.type === "incoming" ? "PhoneIncoming" : "PhoneOutgoing"} size={12}
                  style={{ color: call.missed ? "#EF4444" : "var(--qube-text-muted)" }} />
                <span className="text-xs" style={{ color: "var(--qube-text-muted)" }}>
                  {call.missed ? "Пропущенный" : call.type === "incoming" ? "Входящий" : "Исходящий"}
                  {call.duration ? ` · ${call.duration}` : ""}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--qube-text-muted)" }}>{call.time}</span>
              <button className="p-2 rounded-full hover:bg-secondary transition-colors" style={{ color: "var(--qube-accent)" }}>
                <Icon name="Phone" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Contacts ─────────────────────────────────────────────────────────────────
function ContactsView() {
  const [search, setSearch] = useState("");
  const filtered = CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const grouped = filtered.reduce<Record<string, Contact[]>>((acc, c) => {
    const letter = c.name[0];
    acc[letter] = acc[letter] ? [...acc[letter], c] : [c];
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold" style={{ color: "var(--qube-text)" }}>Контакты</h1>
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors" style={{ color: "var(--qube-accent)" }}>
            <Icon name="UserPlus" size={20} />
          </button>
        </div>
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--qube-text-muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl outline-none"
            style={{ background: "var(--qube-surface-2)", color: "var(--qube-text)" }} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
        {Object.entries(grouped).sort().map(([letter, contacts]) => (
          <div key={letter}>
            <p className="text-xs font-bold py-2 sticky top-0" style={{ color: "var(--qube-accent)", background: "var(--background)" }}>
              {letter}
            </p>
            {contacts.map((contact, i) => (
              <div key={contact.id} className="flex items-center gap-3 py-2.5 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                <Avatar text={contact.avatar} online={contact.online} />
                <div className="flex-1">
                  <p className="font-medium text-sm" style={{ color: "var(--qube-text)" }}>{contact.name}</p>
                  <p className="text-xs" style={{ color: contact.online ? "var(--qube-online)" : "var(--qube-text-muted)" }}>
                    {contact.status}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 rounded-xl hover:bg-secondary transition-colors" style={{ color: "var(--qube-text-muted)" }}>
                    <Icon name="MessageCircle" size={16} />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-secondary transition-colors" style={{ color: "var(--qube-text-muted)" }}>
                    <Icon name="Phone" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function SettingsView() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);

  const groups = [
    {
      title: "Аккаунт",
      items: [
        { icon: "User", label: "Профиль", sub: "Фото, имя, статус", danger: false, toggle: null },
        { icon: "Lock", label: "Приватность", sub: "Кто видит мой профиль", danger: false, toggle: null },
        { icon: "Shield", label: "Безопасность", sub: "Двухфакторная аутентификация", danger: false, toggle: null },
      ]
    },
    {
      title: "Уведомления",
      items: [
        { icon: "Bell", label: "Уведомления", sub: "Все сообщения", danger: false, toggle: { val: notifications, set: setNotifications } },
        { icon: "Volume2", label: "Звуки", sub: "Звук при сообщении", danger: false, toggle: { val: sounds, set: setSounds } },
      ]
    },
    {
      title: "Внешний вид",
      items: [
        { icon: "Moon", label: "Тёмная тема", sub: "Переключить оформление", danger: false, toggle: { val: darkMode, set: setDarkMode } },
        { icon: "Type", label: "Размер текста", sub: "Средний", danger: false, toggle: null },
      ]
    },
    {
      title: "Данные",
      items: [
        { icon: "Download", label: "Экспорт данных", sub: "Скачать историю чатов", danger: false, toggle: null },
        { icon: "Trash2", label: "Удалить аккаунт", sub: "Необратимое действие", danger: true, toggle: null },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-5 pb-4">
        <h1 className="text-xl font-semibold mb-4" style={{ color: "var(--qube-text)" }}>Настройки</h1>
        <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "var(--qube-surface-2)" }}>
          <Avatar text="ВП" size="lg" />
          <div>
            <p className="font-semibold" style={{ color: "var(--qube-text)" }}>Вы</p>
            <p className="text-sm" style={{ color: "var(--qube-text-muted)" }}>+7 999 123-45-67</p>
          </div>
          <button className="ml-auto p-2 rounded-xl hover:bg-secondary transition-colors" style={{ color: "var(--qube-accent)" }}>
            <Icon name="Edit2" size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4 space-y-4">
        {groups.map(group => (
          <div key={group.title}>
            <p className="text-xs font-semibold mb-2 px-1" style={{ color: "var(--qube-text-muted)" }}>
              {group.title.toUpperCase()}
            </p>
            <div className="rounded-2xl overflow-hidden" style={{ background: "var(--qube-surface-2)" }}>
              {group.items.map((item, i) => (
                <button key={i} className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-left hover:bg-black/5"
                  style={{ borderTop: i > 0 ? `1px solid var(--qube-border)` : undefined }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: item.danger ? "#FEE2E2" : "var(--qube-accent-light)" }}>
                    <Icon name={item.icon} size={18} style={{ color: item.danger ? "#EF4444" : "var(--qube-accent)" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: item.danger ? "#EF4444" : "var(--qube-text)" }}>{item.label}</p>
                    <p className="text-xs" style={{ color: "var(--qube-text-muted)" }}>{item.sub}</p>
                  </div>
                  {item.toggle ? (
                    <button onClick={e => { e.stopPropagation(); item.toggle!.set(!item.toggle!.val); }}
                      className="w-11 h-6 rounded-full transition-all relative flex-shrink-0"
                      style={{ background: item.toggle.val ? "var(--qube-accent)" : "var(--qube-border)" }}>
                      <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all"
                        style={{ left: item.toggle.val ? "calc(100% - 22px)" : "2px" }} />
                    </button>
                  ) : (
                    <Icon name="ChevronRight" size={16} style={{ color: "var(--qube-text-muted)" }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        <p className="text-center text-xs py-2" style={{ color: "var(--qube-text-muted)" }}>
          QUBE v1.0 · Минималистичный мессенджер
        </p>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyChat() {
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

// ─── App ──────────────────────────────────────────────────────────────────────
export default function Index() {
  const [section, setSection] = useState<Section>("chats");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const handleSelectChat = (id: number) => {
    setSelectedChat(id);
    setMobileShowChat(true);
  };

  const renderPanel = () => {
    switch (section) {
      case "chats": return <ChatList selected={selectedChat} onSelect={handleSelectChat} />;
      case "stories": return <StoriesView />;
      case "calls": return <CallsView />;
      case "contacts": return <ContactsView />;
      case "settings": return <SettingsView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* Icon nav */}
      <div className="flex flex-col items-center py-5 gap-1 flex-shrink-0"
        style={{ width: 64, borderRight: "1px solid var(--qube-border)", background: "var(--qube-surface)" }}>
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm mb-4 flex-shrink-0"
          style={{ background: "var(--qube-accent)", color: "#fff", letterSpacing: 1 }}>
          Q
        </div>
        {NAV_ITEMS.map(item => (
          <button key={item.key} onClick={() => { setSection(item.key); setMobileShowChat(false); }} title={item.label}
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all hover:scale-105"
            style={{
              background: section === item.key ? "var(--qube-accent-light)" : "transparent",
              color: section === item.key ? "var(--qube-accent)" : "var(--qube-text-muted)",
            }}>
            <Icon name={item.icon} size={20} />
          </button>
        ))}
        <div className="mt-auto">
          <Avatar text="ВП" size="sm" />
        </div>
      </div>

      {/* Middle panel */}
      <div className="flex flex-col flex-shrink-0 overflow-hidden"
        style={{
          width: 300,
          borderRight: "1px solid var(--qube-border)",
          background: "var(--qube-surface)",
          display: mobileShowChat ? "none" : "flex",
        }}>
        {renderPanel()}
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "var(--background)" }}>
        {section === "chats" ? (
          selectedChat ? (
            <ChatWindow chatId={selectedChat} onBack={() => { setMobileShowChat(false); }} />
          ) : (
            <EmptyChat />
          )
        ) : (
          <div className="flex-1 flex items-center justify-center animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center mb-3"
                style={{ background: "var(--qube-accent-light)" }}>
                <Icon name={NAV_ITEMS.find(n => n.key === section)?.icon ?? "Circle"} size={26}
                  style={{ color: "var(--qube-accent)" }} />
              </div>
              <p className="font-semibold" style={{ color: "var(--qube-text)" }}>
                {NAV_ITEMS.find(n => n.key === section)?.label}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--qube-text-muted)" }}>Выберите элемент слева</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
