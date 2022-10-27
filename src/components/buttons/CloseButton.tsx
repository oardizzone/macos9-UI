interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = (props: CloseButtonProps) => {
  return (
    <section className="window__button__container">
      <button
        className="window__button"
        onClick={(e) => {
          e.stopPropagation();
          props.onClick();
        }}
      ></button>
    </section>
  );
};
