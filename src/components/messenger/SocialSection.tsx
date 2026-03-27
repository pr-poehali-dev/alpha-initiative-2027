import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, STORIES, CALLS, CONTACTS } from "./types";
import type { Story, Contact } from "./types";

// ─── Stories ──────────────────────────────────────────────────────────────────
export function StoriesView() {
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
export function CallsView() {
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
export function ContactsView() {
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
