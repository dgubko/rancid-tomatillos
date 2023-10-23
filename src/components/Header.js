import "../css/Header.scss";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header>
      <a href='/'>
      <div>
        <img className="image--header" src={logo} alt="Logo with popcorn and movie film"/>
        <h1>Rancid Tomatillos</h1>
      </div>
      </a>
    </header>
  );
};

export default Header;
