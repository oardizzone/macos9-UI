import React, { useCallback, useEffect, useRef, useState } from "react";
import { CloseButton } from "./buttons";

interface WindowProps {
  name: string;
}

export const Window = (props: WindowProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ down: false, x: 0, y: 0 });
  const dragDistance = useRef({ distX: 0, distY: 0 });
  const windowRef = useRef<HTMLElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    mouseRef.current = { down: true, x: e.screenX, y: e.screenY };
    e.stopPropagation();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!mouseRef.current.down) return;

    const distX = e.screenX - mouseRef.current.x;
    const distY = e.screenY - mouseRef.current.y;

    const diffX = distX - dragDistance.current.distX;
    const diffY = distY - dragDistance.current.distY;
    dragDistance.current = { distX, distY };

    // console.log(windowPosition.current);

    setPosition((prev) => {
      return {
        x: prev.x + diffX,
        y: prev.y + diffY,
      };
    });
  }, []);

  const handleMouseUp = (e: MouseEvent) => {
    mouseRef.current = { down: false, x: e.screenX, y: e.screenY };
    dragDistance.current = { distX: 0, distY: 0 };
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      className="window"
      ref={windowRef}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <section className="window__container">
        <section className="window__title-bar" onMouseDown={handleMouseDown}>
          <CloseButton />
          <div className="window__title-bar__picker">
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
          </div>
          <span className="window__title-bar__name">Window</span>
          <div className="window__title-bar__picker">
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
          </div>
        </section>
        <section className="window__content">
          <p>skdjfhksjdf</p>
          <p>sdkjfhksdf</p>
        </section>
      </section>
    </section>
  );
};
