

/**
 * A search bar component for entering city or country names.
 *
 * @component
 * @param {Object} props
 * @param {function(string): void} props.onSearch - Callback invoked with the search query.
 * @returns {JSX.Element} Input field and button to trigger a search.
 */
import React, { useState } from 'react';
import './SearchBar.css';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  /**
   * Handles changes in the input field.
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  /** Invokes the onSearch callback with the current city. */
  const handleSearch = () => {
    onSearch(city);
  };

  /**
   * Triggers search on Enter key press.
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a city or country.."
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
