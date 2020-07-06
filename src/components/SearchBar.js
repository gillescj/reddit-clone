import '../styles/SearchBar.scss';

import React, { useState } from 'react';

const SearchForm = () => {
    const [barValue, setBarValue] = useState('');

    const handleSearchBarChange = (event) => {
        setBarValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        alert('Search functionality coming soon.');
    };

    return (
        <form onSubmit={handleFormSubmit} className="search-bar">
            <input
                type="text"
                placeholder="Search"
                className="search-bar-input"
                value={barValue}
                onChange={handleSearchBarChange}
            />
        </form>
    );
};

export default SearchForm;
