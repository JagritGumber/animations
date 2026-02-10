import { createRoot } from "react-dom/client";
import { motion } from "motion/react";
import "../../global.css";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box = ({ children, className = "" }: BoxProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`bg-white border border-gray-100 p-6 relative overflow-hidden flex flex-col items-center justify-center shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);

const Metronome = () => {
  return (
    <div className="h-full flex flex-col items-center justify-end pb-4">
      <div className="w-1 h-32 bg-gray-200 rounded-full relative origin-bottom overflow-hidden">
        <motion.div
          className="w-full h-full bg-black origin-bottom"
          animate={{ rotate: [-20, 20, -20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="text-[10px] text-gray-400 font-mono mt-4 tracking-widest">
        TEMPO: 60
      </div>
    </div>
  );
};

const BreathingSquare = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-black/10 aspect-square"
          style={{ width: `${(i + 1) * 20}%` }}
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, 5, 0],
            borderRadius: ["0%", "20%", "0%"],
          }}
          transition={{
            duration: 4,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const RollingWave = () => {
  return (
    <div className="h-full w-full flex items-center justify-center gap-2">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 bg-black rounded-full"
          animate={{ height: [10, 40, 10] }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const KineticClock = () => {
  return (
    <div className="h-full w-full relative">
      <motion.div
        className="absolute inset-4 border border-black rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 w-3 h-3 bg-black rounded-full -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
      <motion.div
        className="absolute inset-12 border border-black/50 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-black/50 rounded-full -translate-x-1/2 translate-y-1/2" />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-gray-400">
        TIME
      </div>
    </div>
  );
};

const SlidingPanels = () => {
  return (
    <div className="h-full w-full grid grid-cols-1 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-black w-full h-full"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "0%", "100%"] }}
          transition={{
            duration: 4,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.4, 0.8],
          }}
        />
      ))}
    </div>
  );
};

const HypnoticCircle = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-black rounded-full"
          style={{ width: `${(i + 1) * 30}px`, height: `${(i + 1) * 30}px` }}
          animate={{
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: 5,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

function App() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8 font-sans text-black">
      <div className="w-full max-w-4xl aspect-square md:aspect-video grid grid-cols-4 grid-rows-3 gap-6">
        {/* Row 1 */}
        <Box className="col-span-1 row-span-2">
          <Metronome />
        </Box>
        <Box className="col-span-2 row-span-1">
          <RollingWave />
        </Box>
        <Box className="col-span-1 row-span-1">
          <KineticClock />
        </Box>

        {/* Row 2 */}
        <Box className="col-span-1 row-span-1">
          <HypnoticCircle />
        </Box>
        <Box className="col-span-2 row-span-2">
          <BreathingSquare />
        </Box>

        {/* Row 3 */}
        <Box className="col-span-1 row-span-1 !p-0">
          <SlidingPanels />
        </Box>
        <Box className="col-span-1 row-span-1 flex items-center justify-center">
          <motion.div
            className="w-16 h-1 bg-black"
            animate={{ rotate: 180, width: ["20%", "80%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </Box>
      </div>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
