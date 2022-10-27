import { useState } from "react";
import { MenuBar } from "./components";
import "./styles/main.scss";

function App() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  const openWindow = (windowHref: string | null) => {
    if (windowHref == null || openWindows.includes(windowHref)) return;
    setOpenWindows((prev) => [...prev, windowHref]);
  };

  return (
    <section className="desktop">
      <MenuBar onSelect={openWindow} />
    </section>
  );
}

export default App;
