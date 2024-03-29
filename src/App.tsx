import React, { createContext, useRef, useState } from "react";
import { MenuBar, Window } from "./components";
import noiseSvg from "./assets/noise.svg";

import "./styles/main.scss";

export type WindowName = "about" | "game" | "works" | "contact";

export interface DesktopContextValue {
  desktopRef: React.RefObject<HTMLElement>;
  windowHistory: WindowName[];
  pushWindowHistory: (name: WindowName) => void;
}

export const DesktopContext = createContext<DesktopContextValue>(
  {} as DesktopContextValue
);

function App() {
  const desktopRef = useRef<HTMLElement>(null);
  const [aboutWindowOpen, setAboutWindowOpen] = useState(false);
  const [gameWindowOpen, setGameWindowOpen] = useState(false);
  const [worksWindowOpen, setWorksWindowOpen] = useState(false);
  const [contactWindowOpen, setContactWindowOpen] = useState(false);

  const [windowHistory, setWindowHistory] = useState<WindowName[]>([]);

  const pushWindowHistory = (name: WindowName) => {
    const history = new Set([name, ...windowHistory]);
    setWindowHistory(Array.from(history));
    console.log(history);
  };

  const popWindowHistory = (name: WindowName) => {
    if (!windowHistory.includes(name)) return;
    setWindowHistory((prev) => prev.filter((win) => win !== name));
  };

  const handleWindowOpen = (name: WindowName) => {
    switch (name) {
      case "about":
        setAboutWindowOpen(true);
        break;
      case "game":
        setGameWindowOpen(true);
        break;
      case "works":
        setWorksWindowOpen(true);
        break;
      case "contact":
        setContactWindowOpen(true);
        break;
      default:
        break;
    }
    pushWindowHistory(name);
  };

  const handleWindowClose = (name: WindowName) => {
    switch (name) {
      case "about":
        setAboutWindowOpen(false);
        break;
      case "game":
        setGameWindowOpen(false);
        break;
      case "works":
        setWorksWindowOpen(false);
        break;
      case "contact":
        setContactWindowOpen(false);
        break;
      default:
    }
    popWindowHistory(name);
  };

  return (
    <>
      <MenuBar onSelect={handleWindowOpen} />
      <DesktopContext.Provider
        value={{ desktopRef, windowHistory, pushWindowHistory }}
      >
        <section className="desktop" ref={desktopRef}>
          {aboutWindowOpen && (
            <Window
              key={"about"}
              name={"about"}
              onClose={() => {
                handleWindowClose("about");
              }}
            >
              <article className="content">
                <h2 className="content__header">About this site</h2>
                <p className="content__text">
                  Here are some words about this site:
                </p>
                <p className="content__text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Esse, illo iusto soluta autem enim repellat aliquid adipisci
                  veritatis iste nihil laboriosam natus. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Porro sapiente, autem,
                  necessitatibus reiciendis laudantium eligendi, nemo voluptas
                  nulla fuga velit quas quae? Aliquam eos magnam veniam a quo
                  tempora consequuntur?
                </p>
                <p className="content__text">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsum quo quam saepe libero ea voluptatibus nostrum ipsam rem
                  magni laudantium accusantium placeat ratione eveniet, repellat
                  error quod porro numquam minima.
                </p>
              </article>
            </Window>
          )}
          {gameWindowOpen && (
            <Window
              key={"game"}
              name={"game"}
              onClose={() => {
                handleWindowClose("game");
              }}
            >
              <article className="content">
                <h2 className="content__header">About the game</h2>
                <p className="content__text">
                  Here are some words about this site:
                </p>
                <p className="content__text">2 player co-op game</p>
                <p className="content__text">
                  press anywhere on window to start:
                </p>
              </article>
            </Window>
          )}
          {worksWindowOpen && (
            <Window
              key={"works"}
              name={"works"}
              onClose={() => {
                handleWindowClose("works");
              }}
            >
              {" "}
              <article className="content">
                <h2 className="content__header">List of previous works</h2>
                <p className="content__text">Work 1:</p>
                <p className="content__text">Work 2:</p>
                <p className="content__text">Work 3:</p>
                <p className="content__text">Work 4:</p>
                <p className="content__text">Work 5:</p>
              </article>
            </Window>
          )}
          {contactWindowOpen && (
            <Window
              key={"contact"}
              name={"contact"}
              onClose={() => {
                handleWindowClose("contact");
              }}
            >
              <article className="content">
                <h2 className="content__header">Contact info</h2>
                <p className="content__text">my-email@gmail.com</p>
                <p className="content__text">+36 12 345 6789</p>
                <p className="content__text">
                  Madeup street 17. Somewhereville 1234
                </p>
                <p className="content__text">Instagram: @some-insta-lol</p>
              </article>
            </Window>
          )}
        </section>
      </DesktopContext.Provider>
    </>
  );
}

export default App;
