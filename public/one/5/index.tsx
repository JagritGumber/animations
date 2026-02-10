import { createRoot } from "react-dom/client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import "../../global.css";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box = ({ children, className = "" }: BoxProps) => (
  <div
    className={`bg-black text-white p-6 relative overflow-hidden flex flex-col ${className}`}
  >
    {children}
  </div>
);

const BigTime = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-[8vw] font-bold leading-none tracking-tighter">
        {time.toLocaleTimeString([], {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

const RollingText = () => {
  return (
    <div className="h-full overflow-hidden flex items-center">
      <motion.div
        className="text-6xl font-black uppercase leading-tight"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={
              i % 2 === 0
                ? "text-white"
                : "text-transparent stroke-white stroke-1"
            }
            style={{ WebkitTextStroke: i % 2 !== 0 ? "1px white" : "" }}
          >
            KINETIC
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const HoverReveal = () => {
  return (
    <motion.div
      className="h-full w-full bg-white text-black flex items-center justify-center font-bold text-4xl cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.span variants={{ rest: { y: 0 }, hover: { y: -50, opacity: 0 } }}>
        HOVER
      </motion.span>
      <motion.span
        className="absolute"
        variants={{ rest: { y: 50, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
      >
        REVEAL
      </motion.span>
    </motion.div>
  );
};

const TypeGrid = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    <div className="h-full grid grid-cols-6 grid-rows-4 gap-1">
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className="flex items-center justify-center font-mono text-xs border border-zinc-800 text-zinc-500 hover:bg-white hover:text-black transition-colors"
          whileHover={{ scale: 1.2, zIndex: 10 }}
        >
          {chars[i % chars.length]}
        </motion.div>
      ))}
    </div>
  );
};

const StretchingText = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      {["DESIGN", "IS", "NOT", "ART"].map((word, i) => (
        <motion.div
          key={i}
          className="text-4xl font-bold leading-none w-full bg-white text-black px-2"
          initial={{ scaleX: 1 }}
          whileHover={{ scaleX: 1.5, originX: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {word}
        </motion.div>
      ))}
    </div>
  );
};

function App() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-8 font-sans text-white">
      <div className="w-full max-w-4xl aspect-square md:aspect-video grid grid-cols-4 grid-rows-3 gap-px bg-zinc-800 border border-zinc-800">
        <Box className="col-span-2 row-span-1 p-0!">
          <BigTime />
        </Box>
        <Box className="col-span-1 row-span-2 p-0!">
          <RollingText />
        </Box>
        <Box className="col-span-1 row-span-1 p-0!">
          <HoverReveal />
        </Box>

        <Box className="col-span-1 row-span-1 p-0!">
          <div className="h-full w-full flex items-center justify-center bg-white text-black text-6xl font-serif italic">
            &
          </div>
        </Box>
        <Box className="col-span-1 row-span-2 p-0!">
          <StretchingText />
        </Box>

        <Box className="col-span-2 row-span-1 p-0! bg-black">
          <TypeGrid />
        </Box>
      </div>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
