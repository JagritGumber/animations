import { createRoot } from "react-dom/client";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import "../../global.css";

const MonoBox = ({
  children,
  className = "",
  white = false,
}: {
  children: React.ReactNode;
  className?: string;
  white?: boolean;
}) => (
  <div
    className={`${
      white ? "bg-white text-black" : "bg-black text-white"
    } border border-current relative overflow-hidden flex flex-col ${className}`}
  >
    {children}
  </div>
);

const Barcode = () => (
  <div className="h-full w-full flex flex-col justify-between p-4">
    <div className="text-xs font-mono">ID: 592-291-00</div>
    <div className="h-24 w-full flex items-end gap-1">
        {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
                key={i}
                className="bg-current flex-1"
                animate={{ height: ["20%", "100%", "50%", "80%"] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05, repeatType: "mirror" }}
            />
        ))}
    </div>
  </div>
);

const Histogram = () => {
    return (
        <div className="h-full w-full flex items-end gap-[1px] bg-black">
            {Array.from({ length: 64 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="flex-1 bg-white hover:bg-red-500"
                    initial={{ height: "0%" }}
                    animate={{ height: `${Math.random() * 100}%` }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: i * 0.01 }}
                />
            ))}
        </div>
    )
}

const TerminalOutput = () => {
    const [text, setText] = useState("");
    const fullText = "> SYSTEM_CHECK_INIT\n> CPU_CORE_01... OK\n> CPU_CORE_02... OK\n> MEMORY_INTEGRITY... 100%\n> NETWORK_UPLINK... ESTABLISHED\n> WAITING_FOR_INPUT...";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) i = 0;
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {text}
            <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
            >
                _
            </motion.span>
        </div>
    )
}

const BigStat = () => (
    <div className="h-full w-full flex items-center justify-center relative">
        <div className="absolute top-2 left-2 text-xs font-mono">BANDWIDTH</div>
        <div className="text-8xl font-black tracking-tighter">
            9.2<span className="text-4xl">GB/s</span>
        </div>
    </div>
)

const StatusGrid = () => (
    <div className="h-full w-full grid grid-cols-8 grid-rows-4 gap-[1px] bg-gray-800 border-t border-b border-white">
        {Array.from({ length: 32 }).map((_, i) => (
            <motion.div
                key={i}
                className="bg-black"
                animate={{ backgroundColor: Math.random() > 0.8 ? "#FFF" : "#000" }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 2 }}
            />
        ))}
    </div>
)

const Crosshair = () => (
    <div className="h-full w-full relative flex items-center justify-center border border-white">
        <div className="absolute w-full h-[1px] bg-white/20" />
        <div className="absolute h-full w-[1px] bg-white/20" />
        <motion.div 
            className="w-4 h-4 border border-white"
            animate={{ rotate: 90, scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
        />
    </div>
)

function App() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-8 font-sans text-white selection:bg-white selection:text-black">
      <div className="w-full h-[90vmin] aspect-square grid grid-cols-4 grid-rows-3 gap-0 border border-white">
        
        {/* Item 1: Histogram (Black) */}
        <MonoBox className="col-span-2 row-span-1 border-r border-b border-white">
            <Histogram />
        </MonoBox>
        
        {/* Item 2: Terminal (White) */}
        <MonoBox white className="col-span-1 row-span-2 border-r border-b border-white">
            <TerminalOutput />
        </MonoBox>
        
        {/* Item 3: Big Stat (Black) */}
        <MonoBox className="col-span-1 row-span-1 border-b border-white">
            <BigStat />
        </MonoBox>

        {/* Item 4: Barcode (White) */}
        <MonoBox white className="col-span-2 row-span-1 border-r border-b border-white">
            <Barcode />
        </MonoBox>

        {/* Item 5: Status Grid (Black) */}
        <MonoBox className="col-span-1 row-span-1 border-b border-white">
             <StatusGrid />
        </MonoBox>
        
        {/* Item 6: Crosshair (Black) */}
        <MonoBox className="col-span-2 row-span-1 border-r border-white">
            <Crosshair />
        </MonoBox>

        {/* Item 7: Footer (White) */}
        <MonoBox white className="col-span-2 row-span-1 flex items-center justify-center">
            <div className="font-mono text-xl tracking-[0.5em]">DATA_VIS_09</div>
        </MonoBox>

      </div>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
