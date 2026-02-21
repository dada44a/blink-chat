import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";

const StoryRow = () => {
  const { stories, currentUser } = useApp();

  return (
    <div className="px-5 py-3">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {/* Your story */}
        <div className="flex flex-col items-center gap-1.5 min-w-[64px]">
          <div className="relative">
            <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
              <img src={currentUser.avatar} alt="" className="w-14 h-14 rounded-full" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 gradient-neon rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold border-2 border-background">
              +
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground">You</span>
        </div>

        {/* Other stories */}
        {stories.map((story, i) => (
          <motion.div
            key={story.id}
            className="flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`p-[2px] rounded-full ${story.seen ? "bg-muted" : "gradient-neon"}`}>
              <div className="p-[2px] rounded-full bg-background">
                <img
                  src={story.user.avatar}
                  alt={story.user.displayName}
                  className="w-14 h-14 rounded-full"
                />
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground truncate w-14 text-center">
              {story.user.displayName}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryRow;
