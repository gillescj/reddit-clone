import '../styles/Header.scss';

import React from 'react';
import { Link } from 'react-router-dom';
// import SearchBar from './SearchForm';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    return (
        <div className="header">
            <div className="header-container">
                <div className="brand">
                    <Link to="/">reddit clone</Link>
                </div>
                {/* <SearchBar /> */}
                <div></div>
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Header;
