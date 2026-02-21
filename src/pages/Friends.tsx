import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, UserCheck, UserX } from "lucide-react";

interface FriendUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  online: boolean;
  status: "none" | "pending" | "friend";
}

const allUsers: FriendUser[] = [
  { id: "1", username: "alex_dev", displayName: "Alex", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Alex", online: true, status: "friend" },
  { id: "2", username: "jordan_x", displayName: "Jordan", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Jordan", online: true, status: "friend" },
  { id: "3", username: "sam.wave", displayName: "Sam", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Sam", online: false, status: "pending" },
  { id: "4", username: "riley.glow", displayName: "Riley", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Riley", online: true, status: "none" },
  { id: "5", username: "nova_", displayName: "Nova", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Nova", online: false, status: "none" },
  { id: "6", username: "luna.sky", displayName: "Luna", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Luna", online: true, status: "none" },
  { id: "7", username: "kai.zen", displayName: "Kai", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Kai", online: false, status: "none" },
  { id: "8", username: "ember.fx", displayName: "Ember", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Ember", online: true, status: "none" },
];

const Friends = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<FriendUser[]>(allUsers);

  const filtered = users.filter(
    (u) =>
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  const friends = filtered.filter((u) => u.status === "friend");
  const pending = filtered.filter((u) => u.status === "pending");
  const discover = filtered.filter((u) => u.status === "none");

  const toggleFriend = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        if (u.status === "none") return { ...u, status: "pending" };
        if (u.status === "pending") return { ...u, status: "none" };
        return u;
      })
    );
  };

  const renderSection = (title: string, list: FriendUser[]) => {
    if (list.length === 0) return null;
    return (
      <div className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
          {title} ({list.length})
        </h2>
        <div className="grid gap-2 md:grid-cols-2">
          {list.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl glass hover:bg-muted/30 transition-colors"
            >
              <div className="relative">
                <img src={user.avatar} alt={user.displayName} className="w-11 h-11 rounded-full" />
                {user.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background animate-pulse-neon" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.displayName}</p>
                <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
              </div>
              {user.status === "friend" ? (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <UserCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Friends</span>
                </div>
              ) : (
                <button
                  onClick={() => toggleFriend(user.id)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl transition-all ${
                    user.status === "pending"
                      ? "glass text-muted-foreground"
                      : "gradient-neon text-primary-foreground neon-glow-cyan"
                  }`}
                >
                  {user.status === "pending" ? (
                    <>
                      <UserX className="h-3.5 w-3.5" />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="sticky top-0 z-40 glass-strong px-5 py-4">
        <h1 className="text-2xl font-display font-bold mb-4">Friends</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or username…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="px-4 py-4">
        {renderSection("Friends", friends)}
        {renderSection("Pending", pending)}
        {renderSection("Discover", discover)}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-12">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Friends;
