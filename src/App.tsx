import { useState } from "react";
import { MenuBar, Window } from "./components";
import "./styles/main.scss";

function App() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  const openWindow = (windowHref: string) => {
    if (openWindows.includes(windowHref)) return;
    setOpenWindows((prev) => [...prev, windowHref]);
  };
  return (
    <>
      <MenuBar onSelect={openWindow} />
      <section className="desktop">
        <Window />
      </section>
    </>
  );
}

export default App;
