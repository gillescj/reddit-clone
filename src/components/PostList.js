import '../styles/PostList.scss';

import React, { useContext } from 'react';
import StateContext from './StateContext';
import Post from './Post';
import Pagination from './Pagination';

const PostList = () => {
    const { posts, setSettings, setPagination } = useContext(StateContext);

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
                    className="sort-menu-option"
                >
                    hot
                </span>
                <span
                    onClick={() => handleSortMenuOptionClick('new')}
                    className="sort-menu-option"
                >
                    new
                </span>
                <span
                    onClick={() => handleSortMenuOptionClick('top')}
                    className="sort-menu-option"
                >
                    top
                </span>
                <span
                    onClick={() => handleSortMenuOptionClick('rising')}
                    className="sort-menu-option"
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
