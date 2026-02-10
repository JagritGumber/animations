import { createRoot } from "react-dom/client";
import "../global.css";

function App() {
  return <main></main>;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
