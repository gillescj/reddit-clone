import '../styles/PostList.scss';

import React, { useContext } from 'react';
import StateContext from './StateContext';
import Post from './Post';
import Pagination from './Pagination';

const PostList = () => {
    const { posts, settings, setSettings, setPagination } = useContext(StateContext);

    const renderedPostList = posts.map(post => {
        return <Post key={post.data.id} post={post} />;
    });

    const renderedSortMenu = (
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
                <span>
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
                </span>
            </div>
        </div>
    );

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
        <div className="post-list">
            {renderedSortMenu}
            {renderedPostList}
            <Pagination />
        </div>
    );
};

export default PostList;
