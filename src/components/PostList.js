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

    return (
        <div className="post-list">
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
            {renderedPostList}
            <Pagination />
        </div>
    );
};

export default PostList;
