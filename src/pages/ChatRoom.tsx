import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Image, Mic, Timer, MoreVertical, Phone, Video, Check, CheckCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface LocalMessage {
  id: string;
  text: string;
  mine: boolean;
  timestamp: Date;
  seen: boolean;
  timer: number;
  fading: boolean;
}

const ChatRoom = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { chats } = useApp();
  const chat = chats.find((c) => c.id === chatId);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<LocalMessage[]>([
    { id: "1", text: "hey, what's up? 👻", mine: false, timestamp: new Date(Date.now() - 120000), seen: true, timer: 60, fading: false },
    { id: "2", text: "not much, you?", mine: true, timestamp: new Date(Date.now() - 90000), seen: true, timer: 60, fading: false },
    { id: "3", text: "check this vibe 🔥", mine: false, timestamp: new Date(Date.now() - 60000), seen: true, timer: 60, fading: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(60);
  const [showTimerPicker, setShowTimerPicker] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: LocalMessage = {
      id: Date.now().toString(),
      text: input,
      mine: true,
      timestamp: new Date(),
      seen: false,
      timer: selectedTimer,
      fading: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies = ["haha nice 😂", "no way 💀", "fr fr", "bet 🤝", "👀👀"];
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: replies[Math.floor(Math.random() * replies.length)],
          mine: false,
          timestamp: new Date(),
          seen: false,
          timer: selectedTimer,
          fading: false,
        },
      ]);
    }, 1500 + Math.random() * 1000);
  };

  if (!chat) return null;

  const timers = [
    { label: "10s", value: 10 },
    { label: "1m", value: 60 },
    { label: "1h", value: 3600 },
  ];

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3 z-40">
        <button onClick={() => navigate("/home")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="relative">
          <img src={chat.user.avatar} alt="" className="w-10 h-10 rounded-full" />
          {chat.user.online && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background animate-pulse-neon" />
          )}
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-sm">{chat.user.displayName}</h2>
          <span className="text-xs text-muted-foreground">
            {chat.user.online ? "Online" : "Offline"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Phone className="h-4 w-4" />
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Video className="h-4 w-4" />
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: msg.fading ? 0 : 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-[75%]">
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm ${
                    msg.mine
                      ? "gradient-neon text-primary-foreground rounded-br-md"
                      : "glass text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>

                <div className={`flex items-center gap-1.5 mt-1 ${msg.mine ? "justify-end" : "justify-start"}`}>
                  <span className="text-[10px] text-muted-foreground">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {msg.mine && (
                    msg.seen
                      ? <CheckCheck className="h-3 w-3 text-primary" />
                      : <Check className="h-3 w-3 text-muted-foreground" />
                  )}
                  <Timer className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">
                    {msg.timer < 60 ? `${msg.timer}s` : msg.timer < 3600 ? `${msg.timer / 60}m` : "1h"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="glass rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Timer picker */}
      <AnimatePresence>
        {showTimerPicker && (
          <motion.div
            className="px-4 pb-2 flex gap-2 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {timers.map((t) => (
              <button
                key={t.value}
                onClick={() => { setSelectedTimer(t.value); setShowTimerPicker(false); }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedTimer === t.value
                    ? "gradient-neon text-primary-foreground"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="glass-strong px-4 py-3 border-t border-border/30">
        <form onSubmit={sendMessage} className="flex items-center gap-2">
          <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
            <Image className="h-5 w-5" />
          </button>
          <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mic className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setShowTimerPicker(!showTimerPicker)}
            className={`transition-colors ${showTimerPicker ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Timer className="h-5 w-5" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-muted/40 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />

          <motion.button
            type="submit"
            className="w-10 h-10 gradient-neon rounded-xl flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4 text-primary-foreground" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
