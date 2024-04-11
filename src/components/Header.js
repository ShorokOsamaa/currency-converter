import "../App.css";

function Header() {
  return (
    <header>
      <img src={"logo.png"} className="header--logo" alt="Logo" />
      <h3 className="header--title">Currency Converter</h3>
    </header>
  );
}

export default Header;
