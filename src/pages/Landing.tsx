import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Ghost, Shield, Zap, Eye, MessageCircle, Lock } from "lucide-react";

const features = [
  { icon: Ghost, title: "Ephemeral", desc: "Messages vanish after being seen" },
  { icon: Shield, title: "Private", desc: "End-to-end encrypted conversations" },
  { icon: Zap, title: "Instant", desc: "Real-time messaging, zero lag" },
  { icon: Eye, title: "Screenshot Alert", desc: "Get notified if someone screenshots" },
  { icon: MessageCircle, title: "Rich Media", desc: "Photos, videos, voice notes" },
  { icon: Lock, title: "Self-Destruct", desc: "Set custom timers on messages" },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ghost className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold gradient-neon-text">Phantom</span>
          </div>
          <div className="flex gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="px-5 py-2 text-sm font-semibold gradient-neon rounded-full text-primary-foreground hover:opacity-90 transition-opacity">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6">
        {/* Glow orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full glass border border-primary/30 text-primary mb-8">
              Now in Beta
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Say it.{" "}
            <span className="gradient-neon-text">Mean it.</span>
            <br />
            <span className="text-muted-foreground">Forget it.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ephemeral messaging for the ones who value privacy. Your words disappear, your secrets stay safe.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/signup"
              className="px-8 py-3.5 font-semibold gradient-neon rounded-2xl text-primary-foreground hover:opacity-90 transition-all neon-glow-cyan text-center"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 font-semibold glass rounded-2xl text-foreground hover:bg-muted/60 transition-all text-center"
            >
              I have an account
            </Link>
          </motion.div>
        </div>

        {/* Phone mockup */}
        <motion.div
          className="max-w-sm mx-auto mt-16 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="glass-strong rounded-3xl p-4 shadow-2xl">
            <div className="bg-background rounded-2xl p-4 space-y-3">
              {["hey, you there? 👻", "yeah what's up", "check this out 🔥"].map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm max-w-[200px] ${
                      i % 2 === 0
                        ? "glass text-foreground"
                        : "gradient-neon text-primary-foreground"
                    }`}
                  >
                    {msg}
                  </div>
                </motion.div>
              ))}
              <motion.div
                className="flex items-center gap-2 text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                typing...
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Built for <span className="gradient-neon-text">privacy</span>
          </motion.h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
            Every feature designed to keep your conversations truly private.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="glass rounded-2xl p-6 hover:bg-muted/40 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <f.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-semibold text-lg mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Ghost className="h-4 w-4 text-primary" />
          <span className="font-display font-semibold gradient-neon-text">Phantom</span>
        </div>
        <p>© 2026 Phantom. Your words, your rules.</p>
      </footer>
    </div>
  );
};

export default Landing;
