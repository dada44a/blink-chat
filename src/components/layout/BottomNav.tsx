import { NavLink } from "react-router-dom";
import { MessageCircle, Users, User, Settings } from "lucide-react";

const links = [
  { to: "/home", icon: MessageCircle, label: "Chats" },
  { to: "/friends", icon: Users, label: "Friends" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/30">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-2 rounded-xl transition-all ${isActive ? "gradient-neon neon-glow-cyan" : ""}`}>
                  <link.icon className={`h-5 w-5 ${isActive ? "text-primary-foreground" : ""}`} />
                </div>
                <span className="text-[10px] font-medium">{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
