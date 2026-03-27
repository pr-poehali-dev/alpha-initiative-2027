import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, NAV_ITEMS } from "@/components/messenger/types";
import type { Section } from "@/components/messenger/types";
import { ChatList, ChatWindow, EmptyChat } from "@/components/messenger/ChatSection";
import { StoriesView, CallsView, ContactsView } from "@/components/messenger/SocialSection";
import { SettingsView } from "@/components/messenger/SettingsSection";

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
