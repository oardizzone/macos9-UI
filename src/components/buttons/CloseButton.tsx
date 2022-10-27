interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = (props: CloseButtonProps) => {
  return (
    <section className="window-button__container">
      <button
        className="window-button"
        onClick={(e) => {
          e.stopPropagation();
          props.onClick();
        }}
      ></button>
    </section>
  );
};
