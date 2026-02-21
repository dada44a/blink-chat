import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Ghost, Eye, EyeOff, Camera } from "lucide-react";
import { useApp } from "@/context/AppContext";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuthenticated } = useApp();
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else {
      setIsAuthenticated(true);
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-accent/8 rounded-full blur-3xl" />

      <motion.div
        className="w-full max-w-sm relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-8">
          <Ghost className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-display font-bold">Create account</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {step === 1 ? "Start with your email" : "Choose your identity"}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex gap-2 justify-center mb-6">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all ${
                s <= step ? "w-8 gradient-neon" : "w-4 bg-muted"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleNext} className="glass rounded-2xl p-6 space-y-4">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 ? (
              <>
                <div className="mb-4">
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Min. 8 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full glass flex items-center justify-center">
                      <Ghost className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 w-8 h-8 gradient-neon rounded-full flex items-center justify-center"
                    >
                      <Camera className="h-3.5 w-3.5 text-primary-foreground" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="@username"
                    required
                  />
                </div>
              </>
            )}
          </motion.div>

          <button
            type="submit"
            className="w-full gradient-neon rounded-xl py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {step === 1 ? "Continue" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
