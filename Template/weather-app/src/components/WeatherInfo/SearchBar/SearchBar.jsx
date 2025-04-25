import React, { useState } from "react";
import "./SearchBar.css";
import PropTypes from "prop-types";
const SearchBar = ({onSearch}) => {
    const [city, setCity] = useState("");

    const handleInputChange = (event) => {
        setCity(event.target.value);
    }

    const handleSearch = () => {
        onSearch(city);
    }

    return (
        <div className='search-bar'>
            <input
            type='text'
            placeholder="Enter City"
            value={city}
            onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
export default SearchBar;