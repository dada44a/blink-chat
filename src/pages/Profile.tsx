import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Camera, Edit2, Shield, Eye, Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser, setIsAuthenticated } = useApp();
  const navigate = useNavigate();

  const stats = [
    { label: "Messages", value: "2.4K" },
    { label: "Friends", value: "148" },
    { label: "Streak", value: "23 🔥" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 py-6">
      <h1 className="text-2xl font-display font-bold mb-8">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6">
        <motion.div
          className="glass rounded-3xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative inline-block mb-4">
            <div className="story-ring inline-block">
              <div className="p-[3px] rounded-full bg-background">
                <img src={currentUser.avatar} alt="" className="w-24 h-24 rounded-full" />
              </div>
            </div>
            <button className="absolute bottom-1 right-1 w-8 h-8 gradient-neon rounded-full flex items-center justify-center">
              <Camera className="h-3.5 w-3.5 text-primary-foreground" />
            </button>
          </div>

          <h2 className="text-xl font-display font-bold">{currentUser.displayName}</h2>
          <p className="text-sm text-muted-foreground">@{currentUser.username}</p>

          <div className="flex justify-center gap-8 mt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-lg font-bold gradient-neon-text">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-2">
          {[
            { icon: Edit2, label: "Edit Profile", action: () => {} },
            { icon: Shield, label: "Privacy", action: () => navigate("/settings") },
            { icon: Eye, label: "Who Can See Me", action: () => {} },
            { icon: Clock, label: "Message Timer Default", action: () => {} },
            { icon: LogOut, label: "Sign Out", action: () => { setIsAuthenticated(false); navigate("/"); }, destructive: true },
          ].map((item, i) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl glass hover:bg-muted/40 transition-colors text-left ${
                item.destructive ? "text-destructive" : ""
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
