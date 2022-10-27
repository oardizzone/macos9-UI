import { useRef, useState } from "react";
import { MenuBar, Window } from "./components";
import "./styles/main.scss";

type WindowNames = "about" | "game" | "works" | "contact";
interface WindowData {
  name: WindowNames;
  wasMoved: boolean;
}

function App() {
  const desktopRef = useRef<HTMLElement>(null);
  const [openWindows, setOpenWindows] = useState<WindowData[]>([]);

  const isWindowOpen = (windowName: string) => {
    return openWindows.some((win) => win.name === windowName);
  };

  const handleWindowOpen = (windowName: string) => {
    if (isWindowOpen(windowName)) return;
    setOpenWindows((prev) => [
      ...prev,
      { name: windowName as WindowNames, wasMoved: false },
    ]);
  };

  const handleWindowClose = (windowName: string) => {
    setOpenWindows((prev) => prev.filter((win) => win.name !== windowName));
  };

  const handleWindowMove = (windowName: string) => {
    const windowCopy = openWindows;

    windowCopy.forEach((win) => {
      if (win.name !== windowName) return;
      win.wasMoved = true;
    });

    setOpenWindows(windowCopy);
  };

  const aboutContent = (
    <article className="content">
      <h2 className="content__header">About this site</h2>
      <p className="content__text">Here are some words about this site:</p>
      <p className="content__text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, illo
        iusto soluta autem enim repellat aliquid adipisci veritatis iste nihil
        laboriosam natus. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Porro sapiente, autem, necessitatibus reiciendis laudantium
        eligendi, nemo voluptas nulla fuga velit quas quae? Aliquam eos magnam
        veniam a quo tempora consequuntur?
      </p>
      <p className="content__text">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum quo quam
        saepe libero ea voluptatibus nostrum ipsam rem magni laudantium
        accusantium placeat ratione eveniet, repellat error quod porro numquam
        minima.
      </p>
    </article>
  );

  const gameContent = (
    <article className="content">
      <h2 className="content__header">About the game</h2>
      <p className="content__text">Here are some words about this site:</p>
      <p className="content__text">2 player co-op game</p>
      <p className="content__text">press anywhere on window to start:</p>
    </article>
  );

  const worksContent = (
    <article className="content">
      <h2 className="content__header">List of previous works</h2>
      <p className="content__text">Work 1:</p>
      <p className="content__text">Work 2:</p>
      <p className="content__text">Work 3:</p>
      <p className="content__text">Work 4:</p>
      <p className="content__text">Work 5:</p>
    </article>
  );

  const contactContent = (
    <article className="content">
      <h2 className="content__header">Contact info</h2>
      <p className="content__text">my-email@gmail.com</p>
      <p className="content__text">+36 12 345 6789</p>
      <p className="content__text">Madeup street 17. Somewhereville 1234</p>
      <p className="content__text">Instagram: @some-insta-lol</p>
    </article>
  );

  return (
    <>
      <MenuBar onSelect={handleWindowOpen} />
      <section className="desktop" ref={desktopRef}>
        {openWindows.map((win) => (
          <Window
            key={win.name}
            parentRef={desktopRef}
            name={win.name}
            onClose={() => {
              handleWindowClose(win.name);
            }}
            onMove={() => {
              handleWindowMove(win.name);
            }}
            positionOffsetScale={
              openWindows.findIndex((win) => win.wasMoved) === -1
                ? openWindows.length
                : openWindows.findIndex((win) => win.wasMoved) + 1
            }
          >
            {win.name === "about" && aboutContent}
            {win.name === "game" && gameContent}
            {win.name === "works" && worksContent}
            {win.name === "contact" && contactContent}
          </Window>
        ))}
      </section>
    </>
  );
}

export default App;
