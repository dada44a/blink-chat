import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Bell, Eye, Lock, Trash2, Moon, Info } from "lucide-react";

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const Toggle = ({ enabled, onToggle }: ToggleProps) => (
  <button
    onClick={onToggle}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? "gradient-neon" : "bg-muted"}`}
  >
    <motion.div
      className="w-5 h-5 rounded-full bg-foreground absolute top-0.5"
      animate={{ left: enabled ? 22 : 2 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  </button>
);

const Settings = () => {
  const [disappearing, setDisappearing] = useState(true);
  const [screenshotAlert, setScreenshotAlert] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

  const sections = [
    {
      title: "Privacy",
      items: [
        { icon: Eye, label: "Disappearing Messages", desc: "Auto-delete after seen", toggle: disappearing, onToggle: () => setDisappearing(!disappearing) },
        { icon: Shield, label: "Screenshot Alerts", desc: "Notify when screenshotted", toggle: screenshotAlert, onToggle: () => setScreenshotAlert(!screenshotAlert) },
        { icon: Lock, label: "Read Receipts", desc: "Show when you've read messages", toggle: readReceipts, onToggle: () => setReadReceipts(!readReceipts) },
        { icon: Moon, label: "Show Online Status", desc: "Let others see when you're active", toggle: onlineStatus, onToggle: () => setOnlineStatus(!onlineStatus) },
      ],
    },
    {
      title: "Notifications",
      items: [
        { icon: Bell, label: "Push Notifications", desc: "Get notified of new messages", toggle: notifications, onToggle: () => setNotifications(!notifications) },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 py-6">
      <h1 className="text-2xl font-display font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sections.map((section, si) => (
        <motion.div
          key={section.title}
          className="mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.1 }}
        >
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            {section.title}
          </h2>
          <div className="glass rounded-2xl overflow-hidden divide-y divide-border/30">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center gap-3 px-4 py-4">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Toggle enabled={item.toggle} onToggle={item.onToggle} />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
      </div>

      {/* Danger zone */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
          Danger Zone
        </h2>
        <div className="glass rounded-2xl overflow-hidden">
          <button className="w-full flex items-center gap-3 px-4 py-4 text-destructive hover:bg-destructive/10 transition-colors">
            <Trash2 className="h-5 w-5" />
            <div className="text-left">
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently remove all data</p>
            </div>
          </button>
        </div>
      </motion.div>

      <div className="text-center mt-8">
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Info className="h-3 w-3" />
          <span>Phantom v1.0 — Your words, your rules</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
