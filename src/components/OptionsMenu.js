import '../styles/OptionsMenu.scss';

import React, { useContext } from 'react';
import StateContext from './StateContext';

const OptionsMenu = () => {
    const { settings, setSettings, setPagination } = useContext(StateContext);

    const handleSortMenuOptionClick = option => {
        setPagination(previousPagination => {
            return {
                ...previousPagination,
                pageNumber: 1,
                query: ''
            };
        });
        setSettings(previousSettings => {
            return {
                ...previousSettings,
                orderBy: option
            };
        });
    };

    const handleSortMenuLimitClick = limitNumber => {
        setPagination(previousPagination => {
            return {
                ...previousPagination,
                pageNumber: 1,
                query: ''
            };
        });
        setSettings(previousSettings => {
            return {
                ...previousSettings,
                limit: limitNumber
            };
        });
    };

    return (
        <div className="options-menu">
            <div className="sort-menu">
                <span
                    onClick={() => handleSortMenuOptionClick('hot')}
                    className={`sort-menu-option ${
                        settings.orderBy === 'hot' ? 'sort-menu-option-selected' : ''
                    }`}
                >
                    hot
                </span>
                <span
                    onClick={() => handleSortMenuOptionClick('new')}
                    className={`sort-menu-option ${
                        settings.orderBy === 'new' ? 'sort-menu-option-selected' : ''
                    }`}
                >
                    new
                </span>
                <span
                    onClick={() => handleSortMenuOptionClick('top')}
                    className={`sort-menu-option ${
                        settings.orderBy === 'top' ? 'sort-menu-option-selected' : ''
                    }`}
                >
                    top
                </span>
                <span
                    onClick={() => handleSortMenuOptionClick('rising')}
                    className={`sort-menu-option ${
                        settings.orderBy === 'rising' ? 'sort-menu-option-selected' : ''
                    }`}
                >
                    rising
                </span>
            </div>
            <div className="limit-menu">
                limit{' '}
                <select
                    className="limit-select"
                    onChange={event => handleSortMenuLimitClick(event.target.value)}
                    value={settings.limit}
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
    );
};

export default OptionsMenu;
