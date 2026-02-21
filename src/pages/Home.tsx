import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Plus, Search } from "lucide-react";
import StoryRow from "@/components/stories/StoryRow";
import ChatListItem from "@/components/chat/ChatListItem";

const Home = () => {
  const { chats } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong px-5 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-display font-bold">Chats</h1>
          <button className="w-9 h-9 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stories */}
      <StoryRow />

      {/* Chat list */}
      <div className="px-2">
        {chats.map((chat, i) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ChatListItem
              chat={chat}
              onClick={() => navigate(`/chat/${chat.id}`)}
            />
          </motion.div>
        ))}
      </div>

      {/* FAB */}
      <motion.button
        className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 gradient-neon rounded-full flex items-center justify-center shadow-lg neon-glow-cyan"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="h-6 w-6 text-primary-foreground" />
      </motion.button>
    </div>
  );
};

export default Home;
