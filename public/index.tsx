import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";

function App() {
  const [count, setCount] = useState(0);
  const increase = () => setCount((value) => value + 1);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-semibold">Bun + Elysia + React</h1>
      <p className="text-slate-300">Sin bundler, con Tailwind y HMR</p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium hover:bg-white/20 transition"
          onClick={increase}
        >
          Incrementar
        </button>
        <span className="text-3xl font-bold tabular-nums">{count}</span>
      </div>
      <a className="text-sm text-indigo-300 underline" href="/api/hello">
        Probar /api/hello
      </a>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
