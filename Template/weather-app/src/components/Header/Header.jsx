

/**
 * Displays the application header with a sun icon and title.
 *
 * @component
 * @returns {JSX.Element} The header containing a sun emoji and the app title.
 */
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
