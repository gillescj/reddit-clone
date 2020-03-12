import '../styles/PostList.scss';

import React from 'react';
import Post from './Post';
import Pagination from './Pagination';

const PostList = ({ posts }) => {
    const renderedPostList = posts.map(post => {
        return <Post key={post.data.id} post={post} />;
    });

    return (
        <div className="post-list">
            {renderedPostList}
            <Pagination />
        </div>
    );
};

export default PostList;
