import { useRef, useState } from "react";
import { MenuBar, Window } from "./components";
import "./styles/main.scss";

interface WindowData {
  name: string;
  wasMoved: boolean;
}

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
            <article className="content">
              <h2 className="content__header">About this site</h2>
              <p className="content__text">
                Here are some words about this site:
              </p>
              <p className="content__text">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse,
                illo iusto soluta autem enim repellat aliquid adipisci veritatis
                iste nihil laboriosam natus. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Porro sapiente, autem,
                necessitatibus reiciendis laudantium eligendi, nemo voluptas
                nulla fuga velit quas quae? Aliquam eos magnam veniam a quo
                tempora consequuntur?
              </p>
              <p className="content__text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                quo quam saepe libero ea voluptatibus nostrum ipsam rem magni
                laudantium accusantium placeat ratione eveniet, repellat error
                quod porro numquam minima.
              </p>
            </article>
          </Window>
        )}
      </section>
    </>
  );
}

export default App;
