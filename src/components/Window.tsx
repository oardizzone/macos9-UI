import React, { useCallback, useEffect, useRef, useState } from "react";
import { CloseButton } from "./buttons";

interface WindowProps {
  name: string;
  parentRef: React.RefObject<HTMLElement>;
}

export const Window = (props: WindowProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ down: false, x: 0, y: 0, dragX: 0, dragY: 0 });
  const windowRef = useRef<HTMLElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    mouseRef.current = {
      ...mouseRef.current,
      down: true,
      x: e.screenX,
      y: e.screenY,
    };
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!mouseRef.current.down) return;
    const windowRect = windowRef.current?.getBoundingClientRect();
    const parentRect = props.parentRef.current?.getBoundingClientRect();

    if (!windowRect || !parentRect) return;

    const distX = e.screenX - mouseRef.current.x;
    const distY = e.screenY - mouseRef.current.y;

    const diffX = distX - mouseRef.current.dragX;
    const diffY = distY - mouseRef.current.dragY;
    mouseRef.current = { ...mouseRef.current, dragX: distX, dragY: distY };
    console.log(windowRect, parentRect);

    setPosition((prev) => {
      if (
        windowRect.right + diffX >= parentRect.right ||
        windowRect.left + diffX < parentRect.left ||
        windowRect.bottom + diffY >= parentRect.bottom ||
        windowRect.top + diffY < parentRect.top
      )
        return prev;
      return {
        x: prev.x + diffX,
        y: prev.y + diffY,
      };
    });
  };

  const handleMouseUp = (e: MouseEvent) => {
    mouseRef.current = {
      ...mouseRef.current,
      down: false,
      dragX: 0,
      dragY: 0,
    };
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
