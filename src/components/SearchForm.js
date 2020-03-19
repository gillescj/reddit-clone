import '../styles/SearchForm.scss';

import React, { useState } from 'react';

const SearchForm = () => {
    const [barValue, setBarValue] = useState('');

    const handleSearchBarChange = event => {
        setBarValue(event.target.value);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        alert('Fake form request was submitted');
    };

    return (
        <form onSubmit={handleFormSubmit} className="search-form">
            <input
                type="text"
                placeholder="Search"
                className="search-bar"
                value={barValue}
                onChange={handleSearchBarChange}
            />
        </form>
    );
};

export default SearchForm;
