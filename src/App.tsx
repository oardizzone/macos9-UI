import { useRef, useState } from "react";
import { MenuBar, Window } from "./components";
import "./styles/main.scss";

function App() {
  const desktopRef = useRef<HTMLElement>(null);
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  const isWindowOpen = (windowName: string) => {
    return openWindows.includes(windowName);
  };

  const openWindow = (windowName: string) => {
    if (isWindowOpen(windowName)) return;
    setOpenWindows((prev) => [...prev, windowName]);
  };

  const closeWindow = (windowName: string) => {
    setOpenWindows((prev) => prev.filter((name) => name !== windowName));
  };

  return (
    <>
      <MenuBar onSelect={openWindow} />
      <section className="desktop" ref={desktopRef}>
        {isWindowOpen("about") && (
          <Window
            parentRef={desktopRef}
            name="about"
            onClose={() => {
              closeWindow("about");
            }}
          >
            <h2 className="content__header">About this site</h2>
          </Window>
        )}
      </section>
    </>
  );
}

export default App;
