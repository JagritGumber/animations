import { createRoot } from "react-dom/client";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";
import "../../global.css";

// --- Components ---

const BauhausBox = ({
  children,
  className = "",
  bg = "bg-[#FDF5E6]", // Cream default
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`${bg} relative overflow-hidden flex flex-col ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const RotatingGeometry = () => {
    return (
        <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
             <motion.div 
                className="w-48 h-48 bg-[#E93422] rounded-full mix-blend-multiply absolute top-10 left-10"
                animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             />
             <motion.div 
                className="w-48 h-48 bg-[#2B539B] rounded-full mix-blend-multiply absolute bottom-10 right-10"
                animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
             />
             <motion.div 
                className="w-48 h-48 bg-[#F2C318] rounded-full mix-blend-multiply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             />
        </div>
    )
}

const Eye = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    return (
        <div 
            className="h-full w-full bg-[#FDF5E6] flex items-center justify-center"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 20;
                const y = (e.clientY - rect.top - rect.height / 2) / 20;
                setMousePos({ x, y });
            }}
        >
            <div className="w-32 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center overflow-hidden relative">
                <motion.div 
                    className="w-12 h-12 bg-[#2B539B] rounded-full absolute"
                    animate={{ x: mousePos.x, y: mousePos.y }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                    <div className="w-4 h-4 bg-black rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <div className="w-2 h-2 bg-white rounded-full absolute top-2 right-2" />
                </motion.div>
            </div>
        </div>
    )
}

const TypoStack = () => {
    return (
        <div className="h-full w-full bg-black text-[#FDF5E6] flex flex-col justify-center items-center font-bold text-6xl leading-none tracking-tighter">
            <motion.div whileHover={{ x: 20 }}>BAU</motion.div>
            <motion.div whileHover={{ x: -20 }} className="text-[#E93422]">HAUS</motion.div>
            <motion.div whileHover={{ x: 20 }}>1919</motion.div>
        </div>
    )
}

const InteractiveGrid = () => {
    return (
        <div className="h-full w-full bg-[#F2C318] grid grid-cols-4 grid-rows-4">
            {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="border border-black/10 flex items-center justify-center"
                    whileHover={{ backgroundColor: "#000", color: "#FFF" }}
                >
                    <div className={`w-2 h-2 rounded-full bg-current`} />
                </motion.div>
            ))}
        </div>
    )
}

const Arch = () => {
    return (
        <div className="h-full w-full bg-[#E93422] flex items-end justify-center relative">
            <motion.div 
                className="w-32 h-64 bg-[#FDF5E6] rounded-t-full"
                animate={{ height: ["50%", "80%", "50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute top-4 left-4 text-[#FDF5E6] font-bold text-xl rotate-90 origin-top-left">
                FORM FOLLOWS FUNCTION
            </div>
        </div>
    )
}

const Stairs = () => {
    return (
        <div className="h-full w-full bg-[#2B539B] flex flex-col justify-end p-8">
            {[1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    className="h-8 bg-black self-start"
                    style={{ width: `${i * 25}%` }}
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ delay: i * 0.2, duration: 1 }}
                />
            ))}
        </div>
    )
}

function App() {
  return (
    <main className="min-h-screen bg-[#FDF5E6] flex items-center justify-center p-8 font-sans selection:bg-[#E93422] selection:text-white">
      <div className="w-full h-[90vmin] aspect-square grid grid-cols-4 grid-rows-4 gap-0 border-4 border-black">
        
        {/* Item 1: Typography (Black) */}
        <BauhausBox className="col-span-2 row-span-2 border-r-4 border-b-4 border-black" bg="bg-black">
            <TypoStack />
        </BauhausBox>

        {/* Item 2: Rotating Geo (Cream) */}
        <BauhausBox className="col-span-2 row-span-2 border-b-4 border-black" bg="bg-[#FDF5E6]">
            <RotatingGeometry />
        </BauhausBox>

        {/* Item 3: Eye (Cream) */}
        <BauhausBox className="col-span-1 row-span-1 border-r-4 border-b-4 border-black" bg="bg-[#FDF5E6]">
            <Eye />
        </BauhausBox>

        {/* Item 4: Interactive Grid (Yellow) */}
        <BauhausBox className="col-span-1 row-span-1 border-r-4 border-b-4 border-black" bg="bg-[#F2C318]">
            <InteractiveGrid />
        </BauhausBox>

        {/* Item 5: Arch (Red) */}
        <BauhausBox className="col-span-2 row-span-2 border-black" bg="bg-[#E93422]">
            <Arch />
        </BauhausBox>

        {/* Item 6: Stairs (Blue) */}
        <BauhausBox className="col-span-2 row-span-1 border-r-4 border-black" bg="bg-[#2B539B]">
            <Stairs />
        </BauhausBox>

      </div>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
