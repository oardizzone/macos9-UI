import { DateTime } from "luxon";
import React, { useEffect, useRef, useState } from "react";

interface MenuBarProps {
  onSelect: (itemName: string) => void;
}

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

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    props.onSelect(href.replace(/^\//g, ""));
  };

  return (
    <section className="menu-bar__container">
      <div className="menu-bar__corner--left">
        <div className="menu-bar__corner__spacer"></div>
      </div>
      <section className="menu-bar">
        <nav className="menu-bar__nav">
          <section className="menu-bar__nav__item-container">
            <p className="menu-bar__nav__item">😁</p>
          </section>
          <section className="menu-bar__nav__item-container">
            <a
              href="/about"
              className="menu-bar__nav__item"
              onClick={handleNavItemClick}
            >
              About
            </a>
          </section>
          <section className="menu-bar__nav__item-container">
            <a
              href="/game"
              className="menu-bar__nav__item"
              onClick={handleNavItemClick}
            >
              Game
            </a>
          </section>
          <section className="menu-bar__nav__item-container">
            <a
              href="/works"
              className="menu-bar__nav__item"
              onClick={handleNavItemClick}
            >
              Works
            </a>
          </section>
          <section className="menu-bar__nav__item-container">
            <a
              href="/contact"
              className="menu-bar__nav__item"
              onClick={handleNavItemClick}
            >
              Contact
            </a>
          </section>
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
          <p className="menu-bar__active-window">🖥 Active window</p>
        </section>
      </section>
      <div className="menu-bar__corner--right">
        <div className="menu-bar__corner__spacer"></div>
      </div>
    </section>
  );
};
