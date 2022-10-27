import "./sass/main.scss";

function App() {
  return (
    <section className="desktop">
      <section className="menu-bar__container">
        <div className="menu-bar__corner--left">
          <div className="menu-bar__corner__spacer"></div>
        </div>
        <section className="menu-bar">
          <nav className="menu-bar__nav">
            <p className="menu-bar__nav__item">😁</p>
            <a href="#" className="menu-bar__nav__item">
              About
            </a>
            <a href="#" className="menu-bar__nav__item">
              Game
            </a>
            <a href="#" className="menu-bar__nav__item">
              Works
            </a>
            <a href="#" className="menu-bar__nav__item">
              Contact
            </a>
          </nav>
          <section className="menu-bar__widgets"></section>
        </section>
        <div className="menu-bar__corner--right">
          <div className="menu-bar__corner__spacer"></div>
        </div>
      </section>
    </section>
  );
}

export default App;
