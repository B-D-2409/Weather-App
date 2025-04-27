import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <span className="sun-icon">☀️</span>
      <a href="/" className="header-link">
        <h1>Weather</h1>
      </a>
    </div>
  );
};

export default Header;
