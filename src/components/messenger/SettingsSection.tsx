import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar } from "./types";

export function SettingsView() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);

  const groups = [
    {
      title: "Аккаунт",
      items: [
        { icon: "User", label: "Профиль", sub: "Фото, имя, статус", danger: false, toggle: null as null | { val: boolean; set: (v: boolean) => void } },
        { icon: "Lock", label: "Приватность", sub: "Кто видит мой профиль", danger: false, toggle: null as null | { val: boolean; set: (v: boolean) => void } },
        { icon: "Shield", label: "Безопасность", sub: "Двухфакторная аутентификация", danger: false, toggle: null as null | { val: boolean; set: (v: boolean) => void } },
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
        { icon: "Type", label: "Размер текста", sub: "Средний", danger: false, toggle: null as null | { val: boolean; set: (v: boolean) => void } },
      ]
    },
    {
      title: "Данные",
      items: [
        { icon: "Download", label: "Экспорт данных", sub: "Скачать историю чатов", danger: false, toggle: null as null | { val: boolean; set: (v: boolean) => void } },
        { icon: "Trash2", label: "Удалить аккаунт", sub: "Необратимое действие", danger: true, toggle: null as null | { val: boolean; set: (v: boolean) => void } },
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
