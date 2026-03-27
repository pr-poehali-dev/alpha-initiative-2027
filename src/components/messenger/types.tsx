export type Section = "chats" | "stories" | "calls" | "contacts" | "settings";

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
}

export interface Message {
  id: number;
  text: string;
  time: string;
  mine: boolean;
  status?: "sent" | "delivered" | "read";
}

export interface Story {
  id: number;
  name: string;
  avatar: string;
  seen: boolean;
  isMe?: boolean;
}

export interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
}

export const CHATS: Chat[] = [
  { id: 1, name: "Алина Морозова", avatar: "АМ", lastMessage: "Хорошо, увидимся завтра!", time: "14:32", unread: 2, online: true },
  { id: 2, name: "Дизайн команда", avatar: "ДК", lastMessage: "Новые макеты готовы к ревью", time: "13:15", unread: 5, online: false },
  { id: 3, name: "Максим Петров", avatar: "МП", lastMessage: "Отправил тебе файлы", time: "12:00", unread: 0, online: true, typing: true },
  { id: 4, name: "Катя Волкова", avatar: "КВ", lastMessage: "Спасибо за помощь 🙌", time: "11:45", unread: 0, online: false },
  { id: 5, name: "Разработка", avatar: "РЗ", lastMessage: "Деплой прошёл успешно", time: "10:20", unread: 1, online: false },
  { id: 6, name: "Иван Соколов", avatar: "ИС", lastMessage: "Когда встреча?", time: "09:05", unread: 0, online: true },
  { id: 7, name: "Маркетинг", avatar: "МК", lastMessage: "Публикуем в пятницу", time: "Вчера", unread: 0, online: false },
];

export const INITIAL_MESSAGES: Message[] = [
  { id: 1, text: "Привет! Как дела с проектом?", time: "14:01", mine: false },
  { id: 2, text: "Всё идёт по плану, почти закончил основную часть", time: "14:03", mine: true, status: "read" },
  { id: 3, text: "Отлично! Когда можешь показать?", time: "14:10", mine: false },
  { id: 4, text: "Завтра утром пришлю превью. Там будет несколько экранов", time: "14:12", mine: true, status: "read" },
  { id: 5, text: "Хорошо, увидимся завтра!", time: "14:32", mine: false },
];

export const STORIES: Story[] = [
  { id: 0, name: "Моя история", avatar: "Я", seen: false, isMe: true },
  { id: 1, name: "Алина", avatar: "АМ", seen: false },
  { id: 2, name: "Максим", avatar: "МП", seen: false },
  { id: 3, name: "Катя", avatar: "КВ", seen: true },
  { id: 4, name: "Иван", avatar: "ИС", seen: true },
  { id: 5, name: "Дизайн", avatar: "ДК", seen: true },
];

export const CONTACTS: Contact[] = [
  { id: 1, name: "Алина Морозова", avatar: "АМ", status: "В сети", online: true },
  { id: 2, name: "Иван Соколов", avatar: "ИС", status: "Был час назад", online: false },
  { id: 3, name: "Катя Волкова", avatar: "КВ", status: "Не беспокоить", online: false },
  { id: 4, name: "Максим Петров", avatar: "МП", status: "В сети", online: true },
  { id: 5, name: "Роман Белов", avatar: "РБ", status: "Был вчера", online: false },
  { id: 6, name: "Таня Лисова", avatar: "ТЛ", status: "В сети", online: true },
];

export const CALLS = [
  { id: 1, name: "Алина Морозова", avatar: "АМ", type: "incoming", time: "14:32", duration: "5:12", missed: false },
  { id: 2, name: "Максим Петров", avatar: "МП", type: "outgoing", time: "12:00", duration: "", missed: false },
  { id: 3, name: "Катя Волкова", avatar: "КВ", type: "incoming", time: "09:15", duration: "", missed: true },
  { id: 4, name: "Иван Соколов", avatar: "ИС", type: "outgoing", time: "Вчера", duration: "12:34", missed: false },
  { id: 5, name: "Роман Белов", avatar: "РБ", type: "incoming", time: "Вчера", duration: "", missed: true },
];

export const NAV_ITEMS: { key: Section; icon: string; label: string }[] = [
  { key: "chats", icon: "MessageCircle", label: "Чаты" },
  { key: "stories", icon: "CirclePlay", label: "Истории" },
  { key: "calls", icon: "Phone", label: "Звонки" },
  { key: "contacts", icon: "Users", label: "Контакты" },
  { key: "settings", icon: "Settings", label: "Настройки" },
];

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-violet-100 text-violet-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
  "bg-sky-100 text-sky-600",
];

export function Avatar({ text, size = "md", online = false, story = false, seen = false }: {
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
