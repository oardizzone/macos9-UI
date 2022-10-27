import { CloseButton } from "./buttons";

interface WindowProps {
  name: string;
}

export const Window = (props: WindowProps) => {
  return (
    <section className="window">
      <section className="window__container">
        <section className="window__title-bar">
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
