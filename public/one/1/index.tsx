import { createRoot } from "react-dom/client";
import { motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";
import "../../global.css";

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const BentoItem = ({ children, className = "", delay = 0 }: BentoItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`bg-zinc-900 border border-zinc-800 p-4 overflow-hidden relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

const SystemStatus = () => {
  return (
    <div className="h-full flex flex-col justify-between font-mono text-xs text-zinc-400">
      <div className="flex justify-between items-center">
        <span>SYS.STATUS</span>
        <span className="flex items-center gap-2 text-emerald-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          ONLINE
        </span>
      </div>
      <div className="space-y-2">
        {["CPU", "MEM", "NET"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-8">{label}</span>
            <div className="flex-1 h-1 bg-zinc-800 overflow-hidden">
              <motion.div
                className={`h-full ${
                  i === 0
                    ? "bg-rose-500"
                    : i === 1
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
                initial={{ width: "0%" }}
                animate={{ width: ["20%", "80%", "45%", "90%"] }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="text-zinc-600 text-[10px]">UPTIME: 14:20:55</div>
    </div>
  );
};

const DataStream = () => {
  const [logs, setLogs] = useState<
    { id: number; text: string; color: string }[]
  >([]);

  useEffect(() => {
    const messages = [
      { text: "Connecting to server...", color: "text-zinc-500" },
      { text: "Packet verified.", color: "text-emerald-500" },
      { text: "Encrypted handshake...", color: "text-amber-500" },
      { text: "Access granted.", color: "text-emerald-500" },
      { text: "Downloading payload...", color: "text-blue-500" },
      { text: "Syncing database...", color: "text-purple-500" },
      { text: "Optimizing cache...", color: "text-zinc-500" },
      { text: "WARNING: High Latency", color: "text-rose-500" },
    ];
    let i = 0;
    const interval = setInterval(() => {
      const msg = messages[i % messages.length]!;
      setLogs((prev) => [
        ...prev.slice(-6),
        {
          id: Date.now(),
          ...msg,
          text: `> ${msg.text} ${Math.floor(Math.random() * 999)}ms`,
        },
      ]);
      i++;
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full font-mono text-xs flex flex-col">
      <div className="text-zinc-400 border-b border-zinc-800 pb-2 mb-2">
        EVENT LOG
      </div>
      <div className="flex-1 overflow-hidden flex flex-col justify-end">
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`truncate ${log.color}`}
          >
            {log.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Radar = () => {
  return (
    <div className="h-full w-full flex items-center justify-center relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-32 h-32 border border-zinc-500 rounded-full"></div>
        <div className="w-20 h-20 border border-zinc-500 rounded-full absolute"></div>
      </div>
      <motion.div
        className="w-32 h-32 border-r border-emerald-500/50 absolute rounded-full"
        style={{
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-gradient-to-l from-emerald-500/20 to-transparent rounded-full blur-xl"></div>
      </motion.div>
      <div className="font-mono text-xs text-zinc-500 mt-20">SCANNING AREA</div>
    </div>
  );
};

const HexGrid = () => {
  return (
    <div className="h-full w-full grid grid-cols-6 gap-1 p-2 content-center opacity-50">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="aspect-square"
          animate={{
            opacity: [0.2, 0.8, 0.2],
            backgroundColor: [
              "#3f3f46",
              i % 5 === 0 ? "#f43f5e" : i % 3 === 0 ? "#f59e0b" : "#10b981",
              "#3f3f46",
            ],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const CoreLoader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <motion.span
          className="absolute inset-0 border-2 border-emerald-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-2 border-2 border-emerald-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-emerald-500 font-bold">
          CORE
        </div>
      </div>
      <div className="font-mono text-[10px] text-zinc-500 text-center">
        PROCESSING THREADS
        <br />
        ACTIVE
      </div>
    </div>
  );
};

function App() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-8 font-sans selection:bg-emerald-500/30">
      <div className="w-full max-w-4xl aspect-square md:aspect-video grid grid-cols-4 grid-rows-3 gap-3">
        {/* Top Row */}
        <BentoItem className="col-span-1 row-span-1" delay={0.1}>
          <SystemStatus />
        </BentoItem>
        <BentoItem className="col-span-2 row-span-1" delay={0.2}>
          <DataStream />
        </BentoItem>
        <BentoItem className="col-span-1 row-span-1" delay={0.3}>
          <CoreLoader />
        </BentoItem>

        {/* Middle Row */}
        <BentoItem className="col-span-1 row-span-2" delay={0.4}>
          <div className="h-full flex flex-col justify-end">
            <div className="font-mono text-4xl text-emerald-500 font-bold tracking-tighter mb-2">
              01
            </div>
            <div className="font-mono text-xs text-zinc-500">SECTOR A</div>
          </div>
        </BentoItem>
        <BentoItem
          className="col-span-2 row-span-2 flex items-center justify-center bg-zinc-900/50"
          delay={0.5}
        >
          <Radar />
        </BentoItem>
        <BentoItem className="col-span-1 row-span-1" delay={0.6}>
          <HexGrid />
        </BentoItem>

        {/* Bottom Row (filling gaps) */}
        <BentoItem
          className="col-span-1 row-span-1 flex items-center justify-center"
          delay={0.7}
        >
          <motion.div
            className="w-12 h-1 bg-rose-500"
            whileHover={{ scaleX: 1.5 }}
          />
        </BentoItem>
      </div>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
