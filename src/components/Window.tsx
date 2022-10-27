import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DesktopContext, DesktopContextValue, WindowName } from "../App";
import { capitalizeFirstChar } from "../utils";
import { CloseButton } from "./buttons";

interface WindowProps {
  name: WindowName;
  children: ReactNode;
  onClose: () => void;
  onMove: () => void;
}

export const Window = (props: WindowProps) => {
  const { desktopRef, windowHistory, pushWindowHistory } =
    useContext<DesktopContextValue>(DesktopContext);

  const [position, setPosition] = useState({
    x: 10,
    y: 10,
  });
  const [isActive, setIsActive] = useState(true);
  const mouseRef = useRef({ down: false, x: 0, y: 0, dragX: 0, dragY: 0 });
  const windowRef = useRef<HTMLElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    mouseRef.current = {
      ...mouseRef.current,
      down: true,
      x: e.screenX,
      y: e.screenY,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.stopPropagation();
    const windowRect = windowRef.current?.getBoundingClientRect();
    const parentRect = desktopRef.current?.getBoundingClientRect();

    if (!mouseRef.current.down || !windowRect || !parentRect) return;
    props.onMove();

    const distX = e.screenX - mouseRef.current.x;
    const distY = e.screenY - mouseRef.current.y;

    const diffX = distX - mouseRef.current.dragX;
    const diffY = distY - mouseRef.current.dragY;
    mouseRef.current = { ...mouseRef.current, dragX: distX, dragY: distY };

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
    e.stopPropagation();

    mouseRef.current = {
      ...mouseRef.current,
      down: false,
      dragX: 0,
      dragY: 0,
    };
  };

  const handleWindowClick = () => {
    setIsActive(true);
    pushWindowHistory(props.name);
  };

  const handleClickOutside = (e: MouseEvent) => {
    e.preventDefault();
    if (
      !(e.target instanceof Element) ||
      !desktopRef.current?.contains(e.target)
    )
      return;

    if (!windowRef.current?.contains(e.target)) setIsActive(false);
  };

  const handleWindowClose = () => {
    props.onClose();
    if (windowHistory.length === 1) setIsActive(true);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    if (desktopRef.current == null) return;
    desktopRef.current.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      if (desktopRef.current == null) return;
      desktopRef.current.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section
      className={isActive ? "window" : "window--inactive"}
      ref={windowRef}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex:
          windowHistory.indexOf(props.name) !== -1
            ? 100 - 10 * windowHistory.indexOf(props.name)
            : 100,
      }}
      onClick={handleWindowClick}
    >
      <section className="window__container">
        <section className="window__title-bar" onMouseDown={handleMouseDown}>
          <CloseButton onClick={handleWindowClose} />
          <div className="window__title-bar__picker">
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
          </div>
          <span className="window__title-bar__name">
            {capitalizeFirstChar(props.name)}
          </span>
          <div className="window__title-bar__picker">
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
            <div className="window__title-bar__picker__line"></div>
          </div>
        </section>
        <section className="window__content">{props.children}</section>
      </section>
    </section>
  );
};
