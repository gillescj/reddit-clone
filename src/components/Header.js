import '../styles/Header.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchForm';

const Header = () => {
    return (
        <div className="header">
            <div className="brand">
                <Link to="/">reddit clone</Link>
            </div>
            <SearchBar />
        </div>
    );
};

export default Header;
