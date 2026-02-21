import { NavLink } from "react-router-dom";
import { MessageCircle, User, Settings, Ghost } from "lucide-react";

const links = [
  { to: "/home", icon: MessageCircle, label: "Chats" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const DesktopSidebar = () => {
  return (
    <aside className="w-20 h-screen sticky top-0 flex flex-col items-center py-6 border-r border-border bg-card/40 backdrop-blur-xl">
      <Ghost className="h-7 w-7 text-primary mb-8" />

      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                isActive
                  ? "gradient-neon text-primary-foreground neon-glow-cyan"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`
            }
          >
            <link.icon className="h-5 w-5" />
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DesktopSidebar;
