import { createRoot } from "react-dom/client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import "../../global.css";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}

const Box = ({ children, className = "", noBorder = false }: BoxProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`bg-[#f0f0f0] p-6 relative overflow-hidden flex flex-col ${
      !noBorder ? "border-2 border-black" : ""
    } ${className}`}
  >
    {children}
  </motion.div>
);

const AutoBlueprint = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-30"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <motion.path
      d="M10,10 L90,10 L90,90 L10,90 Z"
      fill="none"
      stroke="black"
      strokeWidth="0.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.4, 0.6, 1],
      }}
    />
    <motion.path
      d="M10,10 L90,90 M90,10 L10,90"
      stroke="black"
      strokeWidth="0.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
        times: [0, 0.4, 0.6, 1],
      }}
    />
  </svg>
);

const ShiftingGrid = () => {
  return (
    <div className="h-full w-full grid grid-cols-4 grid-rows-4 gap-1">
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-black"
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            delay: (i % 4) * 0.2 + Math.floor(i / 4) * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const OrbitingSatellite = () => {
  return (
    <div className="h-full w-full relative flex items-center justify-center bg-white">
      <div className="w-2 h-2 bg-black rounded-full absolute" />
      <motion.div
        className="w-32 h-32 border border-black rounded-full absolute"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="w-4 h-4 bg-black rounded-full absolute top-1/2 left-1/2"
        style={{ marginLeft: -8, marginTop: -8 }} // Center pivot
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-2 h-2 bg-black rounded-full absolute top-0 left-8" />{" "}
        {/* Satellite */}
      </motion.div>
    </div>
  );
};

const MondrianShift = () => {
  const colors = ["#ff4f00", "#3eb489", "#f21b3f", "#08b3e5", "black", "white"];
  return (
    <div className="h-full w-full grid grid-cols-2 grid-rows-2 gap-0 border border-black bg-white">
      <motion.div
        className="border-r border-b border-black"
        initial={{ backgroundColor: colors[0] }}
        animate={{
          backgroundColor: [colors[0]!, colors[1]!, colors[4]!, colors[0]!],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "steps(1)" as any }}
      />
      <motion.div
        className="border-b border-black"
        initial={{ backgroundColor: colors[5] }}
        animate={{ backgroundColor: [colors[5]!, colors[3]!, colors[5]!] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "steps(1)" as any,
          delay: 1,
        }}
      />
      <motion.div
        className="border-r border-black"
        initial={{ backgroundColor: colors[3] }}
        animate={{
          backgroundColor: [colors[3]!, colors[2]!, colors[1]!, colors[3]!],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "steps(1)" as any,
          delay: 2,
        }}
      />
      <motion.div
        initial={{ backgroundColor: colors[2] }}
        animate={{
          backgroundColor: [colors[2]!, colors[0]!, colors[4]!, colors[2]!],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "steps(1)" as any,
          delay: 0.5,
        }}
      />
    </div>
  );
};

const RotatingTypography = () => {
  return (
    <div className="h-full flex items-center justify-center overflow-hidden relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[200%] h-[200%] flex items-center justify-center"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl font-serif text-black/5"
            style={{
              transform: `rotate(${i * 30}deg) translate(120px) rotate(-${i * 30}deg)`,
            }}
          >
            A
          </div>
        ))}
      </motion.div>
      <div className="font-bold text-6xl mix-blend-multiply tracking-tighter z-10">
        Aa
      </div>
    </div>
  );
};

function App() {
  return (
    <main className="min-h-screen bg-[#e8e8e8] flex items-center justify-center p-8 font-sans text-black">
      <div className="w-full max-w-4xl aspect-square md:aspect-4/ grid grid-cols-4 grid-rows-3 gap-4">
        {/* Row 1 */}
        <Box className="col-span-1 row-span-1 bg-white p-0!">
          <div className="p-4 h-full flex flex-col justify-between">
            <div className="text-xs font-mono">GRID.SYS</div>
            <ShiftingGrid />
          </div>
        </Box>
        <Box className="col-span-2 row-span-1 bg-white p-0!">
          <OrbitingSatellite />
        </Box>
        <Box className="col-span-1 row-span-2 bg-[#f0f0f0]">
          <div className="writing-vertical-rl text-xs font-mono tracking-widest h-full flex justify-between uppercase z-10 relative">
            <span>Plan</span>
            <span>Section</span>
            <span>Elev</span>
          </div>
          <AutoBlueprint />
        </Box>

        {/* Row 2 */}
        <Box className="col-span-1 row-span-1 bg-black text-white flex items-center justify-center">
          <motion.div
            animate={{
              rotate: [0, 90, 180, 270, 360],
              borderRadius: ["0%", "50%", "0%", "50%", "0%"],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 border-2 border-white"
          />
        </Box>
        <Box className="col-span-2 row-span-2 bg-white overflow-hidden">
          <RotatingTypography />
        </Box>

        {/* Row 3 */}
        <Box className="col-span-1 row-span-1 bg-white p-0!">
          <MondrianShift />
        </Box>
        <Box className="col-span-1 row-span-1 bg-white flex items-center justify-center">
          <div className="flex gap-2">
            {["bg-red-500", "bg-blue-500", "bg-yellow-500"].map((c, i) => (
              <motion.div
                key={i}
                className={`w-4 h-4 rounded-full ${c}`}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </Box>
      </div>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
