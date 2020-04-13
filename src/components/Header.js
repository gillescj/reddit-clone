import '../styles/Header.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchForm';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    return (
        <div className="header">
            <div className="brand">
                <Link to="/">reddit clone</Link>
            </div>
            <SearchBar />
            <ThemeToggle />
        </div>
    );
};

export default Header;
