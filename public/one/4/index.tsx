import { createRoot } from "react-dom/client";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "motion/react";
import { useRef } from "react";
import "../../global.css";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box = ({ children, className = "" }: BoxProps) => (
  <div
    className={`bg-white border-4 border-black p-4 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}
  >
    {children}
  </div>
);

const BouncingBall = () => {
    return (
        <div className="h-full w-full flex items-center justify-center bg-yellow-300 relative overflow-hidden">
            <motion.div 
                className="w-16 h-16 bg-red-500 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                animate={{ 
                    x: ["-50%", "150%", "-50%"],
                    y: ["-50%", "150%", "-50%"],
                    rotate: [0, 360, 0]
                }}
                transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear",
                    times: [0, 0.5, 1]
                }}
            />
        </div>
    )
}

const AutoButton = () => {
    return (
        <div className="h-full flex items-center justify-center bg-blue-300">
             <motion.div
                animate={{ 
                    scale: [1, 0.9, 1],
                    y: [0, 4, 0],
                    boxShadow: [
                        "4px 4px 0px 0px rgba(0,0,0,1)", 
                        "0px 0px 0px 0px rgba(0,0,0,1)", 
                        "4px 4px 0px 0px rgba(0,0,0,1)"
                    ]
                }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="px-8 py-4 bg-white border-4 border-black font-black text-xl select-none"
             >
                AUTO CLICK
             </motion.div>
        </div>
    )
}

const AutoStack = () => {
    return (
        <div className="h-full w-full relative flex items-center justify-center bg-pink-200">
             {[0, 1, 2].map((i) => (
                 <motion.div
                    key={i}
                    className="absolute w-32 h-40 bg-white border-4 border-black flex items-center justify-center font-bold text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    animate={{ 
                        x: [i * 5, i * 5 + 20, i * 5],
                        y: [i * 5, i * 5 - 20, i * 5],
                        rotate: [i * 10 - 10, i * 10, i * 10 - 10],
                        zIndex: [i, i === 2 ? 0 : i + 1, i] // Cycle z-index
                    }}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 0.5
                    }}
                 >
                    {i + 1}
                 </motion.div>
             ))}
        </div>
    )
}

const AutoEye = () => {
    return (
        <div
          className="h-full bg-green-300 flex items-center justify-center gap-4"
        >
          {[1, 2].map((i) => (
            <div
              key={i}
              className="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center overflow-hidden"
            >
              <motion.div
                className="w-6 h-6 bg-black rounded-full"
                animate={{ 
                    x: [0, 10, 0, -10, 0, 10, 0],
                    y: [0, 0, 10, 0, -10, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "steps(3)" as any }}
              />
            </div>
          ))}
        </div>
    );
};

const Marquee = () => {
    return (
        <div className="h-full bg-black flex items-center overflow-hidden whitespace-nowrap">
             <motion.div 
                className="text-white font-mono text-4xl font-bold"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             >
                AUTO MOTION • PERPETUAL MOTION • AUTO MOTION • PERPETUAL MOTION • 
             </motion.div>
        </div>
    )
}

function App() {
  return (
    <main className="min-h-screen bg-yellow-50 flex items-center justify-center p-8 font-sans selection:bg-black selection:text-white">
      <div className="w-full max-w-4xl aspect-square md:aspect-video grid grid-cols-4 grid-rows-3 gap-4">
        
        <Box className="col-span-1 row-span-1 !p-0">
            <BouncingBall />
        </Box>
        <Box className="col-span-2 row-span-1 !p-0">
             <AutoButton />
        </Box>
        <Box className="col-span-1 row-span-2 !p-0">
             <AutoStack />
        </Box>

        <Box className="col-span-2 row-span-1 !p-0">
             <AutoEye />
        </Box>
        <Box className="col-span-1 row-span-1 flex items-center justify-center bg-purple-300">
             <motion.div 
                animate={{ rotate: 360, scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
             >
                ✱
             </motion.div>
        </Box>

        <Box className="col-span-4 row-span-1 !p-0">
             <Marquee />
        </Box>

      </div>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
