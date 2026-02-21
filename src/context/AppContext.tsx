import { useState, createContext, useContext, ReactNode } from "react";

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  online: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video" | "voice";
  timestamp: Date;
  seen: boolean;
  timer: number; // seconds until auto-delete
  fading?: boolean;
}

export interface Chat {
  id: string;
  user: User;
  lastMessage?: string;
  lastTime?: string;
  unread: number;
  messages: Message[];
}

export interface Story {
  id: string;
  user: User;
  mediaUrl: string;
  timestamp: Date;
  views: number;
  reactions: string[];
  seen: boolean;
}

interface AppContextType {
  currentUser: User;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  chats: Chat[];
  stories: Story[];
  activeChat: string | null;
  setActiveChat: (id: string | null) => void;
}

const mockUsers: User[] = [
  { id: "1", username: "alex_dev", displayName: "Alex", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Alex", online: true },
  { id: "2", username: "jordan_x", displayName: "Jordan", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Jordan", online: true },
  { id: "3", username: "sam.wave", displayName: "Sam", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Sam", online: false },
  { id: "4", username: "riley.glow", displayName: "Riley", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Riley", online: true },
  { id: "5", username: "nova_", displayName: "Nova", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Nova", online: false },
];

const mockChats: Chat[] = mockUsers.slice(0, 4).map((user, i) => ({
  id: `chat-${i}`,
  user,
  lastMessage: ["hey, check this out 🔥", "that pic was wild 😂", "wanna hang later?", "seen 👀"][i],
  lastTime: ["2m", "15m", "1h", "3h"][i],
  unread: [2, 0, 1, 0][i],
  messages: [],
}));

const mockStories: Story[] = mockUsers.map((user, i) => ({
  id: `story-${i}`,
  user,
  mediaUrl: `https://picsum.photos/seed/${user.username}/400/700`,
  timestamp: new Date(Date.now() - i * 3600000),
  views: Math.floor(Math.random() * 50) + 5,
  reactions: ["🔥", "😂", "❤️"].slice(0, Math.floor(Math.random() * 3) + 1),
  seen: i > 2,
}));

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const currentUser: User = {
    id: "me",
    username: "ghost_user",
    displayName: "You",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Ghost",
    online: true,
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        setIsAuthenticated,
        chats: mockChats,
        stories: mockStories,
        activeChat,
        setActiveChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
