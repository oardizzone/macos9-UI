import "./sass/main.scss";

function App() {
  return (
    <section className="desktop">
      <section className="menu-bar__container">
        <div className="menu-bar__corner--left">
          <div className="menu-bar__corner__spacer"></div>
        </div>
        <nav className="menu-bar">
          <p className="menu-bar__item">test</p>
        </nav>
        <div className="menu-bar__corner--right">
          <div className="menu-bar__corner__spacer"></div>
        </div>
      </section>
    </section>
  );
}

export default App;
