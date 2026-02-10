import { createRoot } from "react-dom/client";
import { motion, useScroll, useTransform } from "motion/react";
import "../../global.css";

const EditorialBox = ({
  children,
  className = "",
  border = true,
}: {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
}) => (
  <div
    className={`bg-white relative overflow-hidden flex flex-col ${
      border ? "border-r border-b border-gray-200" : ""
    } ${className}`}
  >
    {children}
  </div>
);

const Headline = () => (
  <div className="h-full w-full flex items-end p-8 relative">
    <motion.h1 
        className="text-9xl font-serif italic z-10 mix-blend-difference text-white"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
    >
        VOGUE
    </motion.h1>
    <div className="absolute inset-0 top-1/4 left-1/4 bg-black">
        <motion.img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-60"
            animate={{ scale: [1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
    </div>
  </div>
);

const ArticleList = () => (
    <div className="h-full w-full p-8 flex flex-col justify-between font-serif">
        <div className="text-xs uppercase tracking-widest text-gray-400">September Issue</div>
        <div className="space-y-6">
            {["The New Minimalist", "Architecture of Fashion", "Digital Decay"].map((title, i) => (
                <motion.div 
                    key={i}
                    className="group cursor-pointer"
                    whileHover={{ x: 10 }}
                >
                    <div className="text-2xl italic group-hover:text-red-600 transition-colors duration-300">{title}</div>
                    <div className="h-[1px] w-full bg-gray-200 mt-2 group-hover:bg-red-600 transition-colors duration-300" />
                </motion.div>
            ))}
        </div>
        <div className="text-right text-4xl">
            2024
        </div>
    </div>
)

const ImageReveal = () => (
    <div className="h-full w-full relative overflow-hidden group">
        <motion.img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-white flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-xs uppercase tracking-widest">Explore</span>
            </div>
        </div>
    </div>
)

const Quote = () => (
    <div className="h-full w-full flex items-center justify-center p-12 text-center">
        <p className="font-serif text-3xl leading-relaxed">
            "Fashion is the armor to survive the reality of everyday life."
            <br />
            <span className="text-sm font-sans uppercase tracking-widest mt-4 block text-gray-400">— Bill Cunningham</span>
        </p>
    </div>
)

const VerticalMarquee = () => (
    <div className="h-full w-full flex justify-center py-4 bg-black text-white overflow-hidden">
        <motion.div 
            className="writing-vertical-rl text-6xl font-black uppercase whitespace-nowrap"
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
             COLLECTION FALL / WINTER 2024 — COLLECTION FALL / WINTER 2024 — 
        </motion.div>
    </div>
)

function App() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-8 font-sans text-black selection:bg-black selection:text-white">
      <div className="w-full h-[90vmin] aspect-square grid grid-cols-12 grid-rows-6 border-l border-t border-gray-200">
        
        {/* Item 1: Headline (Large) */}
        <div className="col-span-8 row-span-4 border-r border-b border-gray-200 relative overflow-hidden">
            <Headline />
        </div>

        {/* Item 2: Article List */}
        <div className="col-span-3 row-span-4 border-r border-b border-gray-200">
            <ArticleList />
        </div>

        {/* Item 3: Marquee (Vertical) */}
        <div className="col-span-1 row-span-6 border-r border-b border-gray-200">
            <VerticalMarquee />
        </div>

        {/* Item 4: Quote */}
        <div className="col-span-5 row-span-2 border-r border-b border-gray-200">
            <Quote />
        </div>

        {/* Item 5: Image Reveal */}
        <div className="col-span-6 row-span-2 border-r border-b border-gray-200">
             <ImageReveal />
        </div>

      </div>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
