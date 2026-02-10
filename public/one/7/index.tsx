import { createRoot } from "react-dom/client";
import { motion, useAnimation } from "motion/react";
import { useState, useEffect } from "react";
import "../../global.css";

// --- Components ---

const BrutalBox = ({
  children,
  className = "",
  color = "bg-white",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      className={`${color} border-4 border-black relative overflow-hidden flex flex-col ${className}`}
      style={{ boxShadow: "8px 8px 0px 0px #000" }}
      whileHover={{ x: -2, y: -2, boxShadow: "10px 10px 0px 0px #000" }}
      whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px 0px #000" }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

const StatCard = () => {
  return (
    <div className="h-full w-full flex flex-col justify-between p-6 bg-[#A3E635]">
      <div className="flex justify-between items-start">
        <div className="w-8 h-8 bg-black rounded-full" />
        <div className="font-bold text-xl uppercase tracking-tighter">Status</div>
      </div>
      <div>
        <div className="text-8xl font-black leading-none tracking-tighter">98%</div>
        <div className="text-xl font-bold mt-2">SYSTEM OPTIMAL</div>
      </div>
    </div>
  );
};

const Marquee = () => {
  return (
    <div className="h-full w-full bg-[#FCD34D] flex items-center overflow-hidden border-b-4 border-black last:border-b-0">
      <motion.div
        className="whitespace-nowrap font-black text-4xl uppercase flex gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        {Array(10)
          .fill("WARNING: HEAVY LOAD // DO NOT TOUCH // ")
          .map((text, i) => (
            <span key={i}>{text}</span>
          ))}
      </motion.div>
    </div>
  );
};

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div 
        className="h-full w-full flex items-center justify-center bg-[#E879F9] cursor-pointer"
        onClick={() => setIsOn(!isOn)}
    >
        <div className="w-48 h-24 bg-black rounded-full p-2 relative transition-colors duration-300">
            <motion.div 
                className={`h-full aspect-square rounded-full border-4 border-black absolute top-2`}
                animate={{ 
                    left: isOn ? "calc(100% - 20px)" : "8px", 
                    x: isOn ? "-100%" : "0%",
                    backgroundColor: isOn ? "#A3E635" : "#F87171"
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <span className={`absolute left-6 top-1/2 -translate-y-1/2 font-bold text-white ${isOn ? 'opacity-0' : 'opacity-100'}`}>OFF</span>
            <span className={`absolute right-6 top-1/2 -translate-y-1/2 font-bold text-black ${isOn ? 'opacity-100' : 'opacity-0'}`}>ON</span>
        </div>
    </div>
  );
};

const ButtonGrid = () => {
    return (
        <div className="h-full w-full bg-[#60A5FA] grid grid-cols-2 grid-rows-2 gap-4 p-4">
            {['A', 'B', 'C', 'D'].map((label) => (
                <motion.button
                    key={label}
                    className="w-full h-full bg-white border-4 border-black font-black text-2xl shadow-[4px_4px_0px_0px_#000]"
                    whileTap={{ x: 2, y: 2, boxShadow: "0px 0px 0px 0px #000" }}
                >
                    {label}
                </motion.button>
            ))}
        </div>
    )
}

const IconBlock = () => {
    return (
        <div className="h-full w-full bg-[#F87171] flex items-center justify-center p-8">
            <motion.div 
                className="w-full h-full border-4 border-black bg-white flex items-center justify-center relative overflow-hidden"
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-4 bg-black"
                        animate={{ y: [0, 200] }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "linear", 
                            delay: i * 0.4 
                        }}
                        style={{ top: -20, left: 0 }}
                    />
                ))}
                <div className="z-10 text-6xl font-black">?</div>
            </motion.div>
        </div>
    )
}

const ScrollingList = () => {
    return (
        <div className="h-full w-full bg-white flex flex-col">
            <div className="bg-black text-white p-2 font-bold uppercase text-center border-b-4 border-black">
                Recent Logs
            </div>
            <div className="flex-1 overflow-hidden relative">
                <motion.div 
                    className="flex flex-col"
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="p-2 border-b-2 border-black font-mono font-bold hover:bg-[#FCD34D]">
                            &gt; ERROR_CODE_{100 + i}
                        </div>
                    ))}
                    {[...Array(10)].map((_, i) => (
                        <div key={`dup-${i}`} className="p-2 border-b-2 border-black font-mono font-bold hover:bg-[#FCD34D]">
                            &gt; ERROR_CODE_{100 + i}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

function App() {
  return (
    <main className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-8 font-sans selection:bg-black selection:text-white">
      <div className="w-full h-[90vmin] aspect-square grid grid-cols-4 grid-rows-3 gap-6">
        
        {/* Item 1: Stat Card */}
        <BrutalBox className="col-span-1 row-span-2" color="bg-[#A3E635]">
            <StatCard />
        </BrutalBox>
        
        {/* Item 2: Toggle */}
        <BrutalBox className="col-span-2 row-span-1" color="bg-[#E879F9]">
            <ToggleSwitch />
        </BrutalBox>
        
        {/* Item 3: Icon Block */}
        <BrutalBox className="col-span-1 row-span-1" color="bg-[#F87171]">
            <IconBlock />
        </BrutalBox>

        {/* Item 4: Marquee */}
        <BrutalBox className="col-span-2 row-span-1" color="bg-[#FCD34D]">
            <div className="h-full flex flex-col justify-center">
                <Marquee />
                <Marquee />
                <Marquee />
            </div>
        </BrutalBox>

        {/* Item 5: Button Grid */}
        <BrutalBox className="col-span-1 row-span-1" color="bg-[#60A5FA]">
            <ButtonGrid />
        </BrutalBox>
        
        {/* Item 6: List */}
        <BrutalBox className="col-span-1 row-span-2" color="bg-white">
            <ScrollingList />
        </BrutalBox>

        {/* Item 7: Footer Block */}
         <BrutalBox className="col-span-2 row-span-1 flex items-center justify-center" color="bg-black">
            <motion.h1 
                className="text-6xl font-black text-white tracking-widest"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1 }}
            >
                BRUTAL
            </motion.h1>
        </BrutalBox>

      </div>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
