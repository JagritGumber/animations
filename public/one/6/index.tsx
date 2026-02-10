import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import "../../global.css";

// --- Components ---

const SwissGridItem = ({
  children,
  className = "",
  dark = false,
  red = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  red?: boolean;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const delay = Math.random() * 2000;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIsHovered((prev) => !prev);
      }, 3000);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  // Determine base colors
  const baseBg = red ? "bg-[#FF3B30]" : dark ? "bg-black" : "bg-white";
  const baseText = red ? "text-white" : dark ? "text-white" : "text-black";

  // Determine hover colors (inversion)
  // If red, hover -> black bg, white text
  // If dark, hover -> white bg, black text
  // If white, hover -> black bg, white text
  const hoverBg = red ? "bg-black" : dark ? "bg-white" : "bg-black";
  const hoverText = red ? "text-white" : dark ? "text-black" : "text-white";

  return (
    <motion.div
      className={`relative p-6 flex flex-col justify-between overflow-hidden cursor-pointer transition-colors duration-300 ${
        isHovered ? hoverBg : baseBg
      } ${isHovered ? hoverText : baseText} ${className}`}
      onClick={onClick}
      layout
    >
      {children}
    </motion.div>
  );
};

const BigYear = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="text-sm font-bold tracking-widest uppercase">
        Zürich / Time
      </div>
      <div className="text-[12rem] leading-none font-black tracking-tighter -ml-4">
        {time.getFullYear()}
      </div>
      <div className="flex justify-between items-end border-t-4 border-current pt-4">
        <span className="text-4xl font-bold">
          {time.toLocaleTimeString([], { hour12: false })}
        </span>
        <span className="text-xl font-bold">SWISS / GRID</span>
      </div>
    </div>
  );
};

const Manifesto = () => (
  <div className="h-full flex flex-col justify-between">
    <h2 className="text-3xl font-bold leading-tight">
      DESIGN IS
      <br />
      INTELLIGENCE
      <br />
      MADE VISIBLE.
    </h2>
    <div className="space-y-4">
      <p className="text-sm font-medium opacity-80 max-w-[200px]">
        Rejection of decoration.
        <br />
        Mathematical grids.
        <br />
        Objective photography.
      </p>
      <div className="w-12 h-12 rounded-full bg-current" />
    </div>
  </div>
);

const DotMatrix = () => {
  return (
    <div className="h-full w-full grid grid-cols-8 gap-4 p-2">
      {Array.from({ length: 32 }).map((_, i) => (
        <Dot key={i} index={i} />
      ))}
    </div>
  );
};

const Dot = ({ index }: { index: number }) => {
  return (
    <motion.div
      className="w-full h-full rounded-full bg-current"
      initial={{ opacity: 0.2, scale: 1 }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        delay: index * 0.15,
        ease: "easeInOut",
      }}
    />
  );
};

const ToggleGrid = () => {
  const [toggles, setToggles] = useState(Array(9).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setToggles((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * 9);
        next[idx] = !next[idx];
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const toggle = (i: number) => {
    const newToggles = [...toggles];
    newToggles[i] = !newToggles[i];
    setToggles(newToggles);
  };

  return (
    <div className="h-full w-full grid grid-cols-3 gap-1">
      {toggles.map((isOn, i) => (
        <motion.div
          key={i}
          className={`w-full h-full border-2 border-current ${isOn ? "bg-current" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggle(i);
          }}
          animate={{ scale: isOn ? 0.9 : 1 }}
        />
      ))}
    </div>
  );
};

const GeometricShapes = () => (
  <div className="h-full w-full relative flex items-center justify-center">
    <motion.div
      className="absolute w-32 h-32 border-[20px] border-current rounded-full"
      animate={{ rotate: 360, scale: [1, 1.1, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute w-32 h-32 bg-current mix-blend-difference"
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

function App() {
  return (
    <main className="min-h-screen bg-[#f0f0f0] flex items-center justify-center p-8 font-sans text-black selection:bg-black selection:text-white">
      <div className="w-full h-[90vmin] aspect-square grid grid-cols-4 grid-rows-3 gap-4">
        {/* Item 1: Big Year (White) */}
        <SwissGridItem className="col-span-2 row-span-2">
          <BigYear />
        </SwissGridItem>

        {/* Item 2: Manifesto (Red) */}
        <SwissGridItem red className="col-span-1 row-span-2">
          <Manifesto />
        </SwissGridItem>

        {/* Item 3: Toggle Grid (Black) */}
        <SwissGridItem dark className="col-span-1 row-span-1">
          <div className="h-full flex flex-col justify-between">
            <ToggleGrid />
          </div>
        </SwissGridItem>

        {/* Item 4: Dot Matrix (White) */}
        <SwissGridItem className="col-span-1 row-span-1">
          <div className="h-full flex flex-col justify-between">
            <div className="flex-1 mt-2">
              <DotMatrix />
            </div>
          </div>
        </SwissGridItem>

        {/* Item 5: Geometric (Black) */}
        <SwissGridItem dark className="col-span-2 row-span-1">
          <div className="flex items-center justify-between h-full px-8">
            <div className="text-6xl font-black tracking-tighter">
              HELVETICA
            </div>
            <div className="w-24 h-24">
              <GeometricShapes />
            </div>
          </div>
        </SwissGridItem>

        {/* Item 6: Signature (Red) */}
        <SwissGridItem
          red
          className="col-span-2 row-span-1 flex items-center justify-center"
        >
          <motion.div
            className="text-[8rem] leading-none font-bold opacity-20 select-none whitespace-nowrap"
            animate={{ x: ["-10%", "10%", "-10%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            INTERNATIONAL
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-4xl font-bold bg-black text-white px-4 py-2 rotate-2">
              TYPOGRAPHY
            </h3>
          </div>
        </SwissGridItem>
      </div>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
