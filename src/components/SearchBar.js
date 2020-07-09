import '../styles/SearchBar.scss';

import React, { useState, useContext } from 'react';
import StateContext from './StateContext';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowSVG } from '../assets/svgs/arrow-right.svg';

const SearchForm = () => {
    const { setSearchQuery } = useContext(StateContext);
    const [barValue, setBarValue] = useState('');
    let history = useHistory();

    const handleSearchBarChange = (event) => {
        setBarValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setSearchQuery(barValue);
        history.push(`/search/${encodeURIComponent(barValue)}`);
    };

    return (
        <form onSubmit={handleFormSubmit} className="search-bar">
            <div className="search-bar-wrapper">
                <input
                    type="text"
                    placeholder="Search subreddits"
                    className="search-bar-input"
                    value={barValue}
                    onChange={(event) => handleSearchBarChange(event)}
                />
                <button className="search-bar-button" type="submit">
                    <ArrowSVG />
                </button>
            </div>
        </form>
    );
};

export default SearchForm;
