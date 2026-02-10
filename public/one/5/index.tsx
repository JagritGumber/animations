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
      <div className="text-[8vw] font-bold leading-none tracking-tighter text-[#CCFF00]">
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
                : "text-transparent stroke-[#FF00FF] stroke-1"
            }
            style={{ WebkitTextStroke: i % 2 !== 0 ? "1px #FF00FF" : "" }}
          >
            KINETIC
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const HoverReveal = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHovered((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="h-full w-full bg-white text-black flex items-center justify-center font-bold text-4xl cursor-pointer"
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
    >
      <motion.span variants={{ rest: { y: 0 }, hover: { y: -50, opacity: 0 } }}>
        HOVER
      </motion.span>
      <motion.span
        className="absolute text-[#FF00FF]"
        variants={{ rest: { y: 50, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
      >
        REVEAL
      </motion.span>
    </motion.div>
  );
};

const TypeGrid = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 24);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full grid grid-cols-6 grid-rows-4 gap-1">
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className="flex items-center justify-center font-mono text-xs border border-zinc-800 text-zinc-500 transition-colors"
          animate={{
            scale: i === activeIndex ? 1.2 : 1,
            zIndex: i === activeIndex ? 10 : 1,
            backgroundColor: i === activeIndex ? "#CCFF00" : "rgba(0,0,0,0)",
            color: i === activeIndex ? "#000000" : "#71717a",
          }}
        >
          {chars[i % chars.length]}
        </motion.div>
      ))}
    </div>
  );
};

const StretchingText = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col justify-between">
      {["DESIGN", "IS", "NOT", "ART"].map((word, i) => (
        <motion.div
          key={i}
          className={`text-4xl font-bold leading-none w-full ${
            i === 0
              ? "bg-[#FF00FF] text-white"
              : i === 2
                ? "bg-[#CCFF00] text-black"
                : "bg-white text-black"
          } px-2`}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: i === activeIndex ? 1.5 : 1, originX: 0 }}
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
