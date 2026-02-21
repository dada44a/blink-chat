import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import DesktopSidebar from "./DesktopSidebar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const showNav = ["/home", "/profile", "/settings"].includes(location.pathname) || location.pathname.startsWith("/chat/");

  if (!showNav) return <>{children}</>;

  return (
    <div className="min-h-screen flex w-full">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <DesktopSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 min-h-screen pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default AppLayout;
