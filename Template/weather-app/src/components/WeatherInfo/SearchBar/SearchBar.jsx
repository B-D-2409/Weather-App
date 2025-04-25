import React, { useState } from "react";
import "./SearchBar.css";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState("");
  
    const handleInputChange = (event) => {
      setCity(event.target.value);
    };
  
    const handleSearch = () => {
      onSearch(city);
    };
  
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };
  
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter City"
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
