import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";

interface MenuBarProps {}

export const MenuBar = (props: MenuBarProps) => {
  const [time, setTime] = useState(DateTime.now());
  const [showBlinker, setShowBlinker] = useState(true);
  const updateRef = useRef(0);

  useEffect(() => {
    const UPDATES_PER_SEC = 4;

    const id = setInterval(() => {
      setTime((prev) => (prev = prev.plus(1000 / UPDATES_PER_SEC)));
      setShowBlinker(updateRef.current < 2);
      updateRef.current = (updateRef.current + 1) % UPDATES_PER_SEC;
    }, 1000 / UPDATES_PER_SEC);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <section className="menu-bar__container">
      <div className="menu-bar__corner--left">
        <div className="menu-bar__corner__spacer"></div>
      </div>
      <section className="menu-bar">
        <nav className="menu-bar__nav">
          <p className="menu-bar__nav__item">😁</p>
          <a href="/about" className="menu-bar__nav__item">
            About
          </a>
          <a href="/game" className="menu-bar__nav__item">
            Game
          </a>
          <a href="/works" className="menu-bar__nav__item">
            Works
          </a>
          <a href="/contact" className="menu-bar__nav__item">
            Contact
          </a>
        </nav>
        <section className="menu-bar__widgets">
          <section className="menu-bar__time">
            {time.hour}{" "}
            <span
              className="menu-bar__time__blinker"
              style={{ opacity: showBlinker ? "100%" : "0%" }}
            >
              :
            </span>{" "}
            {time.minute.toString().padStart(2, "0")}
          </section>
          <div className="menu-bar__widgets__spacer">
            <div className="menu-bar__widgets__spacer__dot"></div>
            <div className="menu-bar__widgets__spacer__dot"></div>
            <div className="menu-bar__widgets__spacer__dot"></div>
          </div>
        </section>
      </section>
      <div className="menu-bar__corner--right">
        <div className="menu-bar__corner__spacer"></div>
      </div>
    </section>
  );
};
