import { NavLink } from "react-router-dom";
import { MessageCircle, Users, User, Settings, Ghost } from "lucide-react";

const links = [
  { to: "/home", icon: MessageCircle, label: "Chats" },
  { to: "/friends", icon: Users, label: "Friends" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const DesktopSidebar = () => {
  return (
    <aside className="w-56 h-screen sticky top-0 flex flex-col py-6 px-3 border-r border-border bg-card/40 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <Ghost className="h-7 w-7 text-primary" />
        <span className="text-lg font-display font-bold gradient-neon-text">Phantom</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `h-11 rounded-2xl flex items-center gap-3 px-3 transition-all ${
                isActive
                  ? "gradient-neon text-primary-foreground neon-glow-cyan"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`
            }
          >
            <link.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DesktopSidebar;
