import { useRef, useState } from "react";
import { MenuBar, Window } from "./components";
import "./styles/main.scss";

function App() {
  const desktopRef = useRef<HTMLElement>(null);
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  const openWindow = (windowName: string) => {
    if (openWindows.includes(windowName)) return;
    setOpenWindows((prev) => [...prev, windowName]);
  };

  const closeWindow = (windowName: string) => {
    setOpenWindows((prev) => prev.filter((name) => name !== windowName));
  };

  return (
    <>
      <MenuBar onSelect={openWindow} />
      <section className="desktop" ref={desktopRef}>
        {openWindows.map((name) => (
          <Window
            key={name}
            parentRef={desktopRef}
            name={name}
            onClose={() => {
              closeWindow(name);
            }}
          >
            <p>fjshdgfshdgjf</p>
            <p>fjshdgfshdgjf</p>
            <p>fjshdgfshdgjf</p>
            <p>fjshdgfshdgjf</p>
          </Window>
        ))}
      </section>
    </>
  );
}

export default App;
