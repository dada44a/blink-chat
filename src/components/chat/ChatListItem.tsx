import { Chat } from "@/context/AppContext";

interface Props {
  chat: Chat;
  onClick: () => void;
}

const ChatListItem = ({ chat, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-muted/30 transition-colors text-left"
    >
      {/* Avatar */}
      <div className="relative">
        <img
          src={chat.user.avatar}
          alt={chat.user.displayName}
          className="w-12 h-12 rounded-full"
        />
        {chat.user.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background animate-pulse-neon" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm">{chat.user.displayName}</span>
          <span className="text-xs text-muted-foreground">{chat.lastTime}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
      </div>

      {/* Unread badge */}
      {chat.unread > 0 && (
        <div className="w-5 h-5 gradient-neon rounded-full flex items-center justify-center">
          <span className="text-[10px] font-bold text-primary-foreground">{chat.unread}</span>
        </div>
      )}
    </button>
  );
};

export default ChatListItem;
