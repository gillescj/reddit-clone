import '../styles/Header.scss';

import React from 'react';
import SearchBar from './SearchForm';

const Header = () => {
    return (
        <div className="header">
            <div className="brand">reddit clone</div>
            <SearchBar />
        </div>
    );
};

export default Header;
