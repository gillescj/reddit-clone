import '../styles/PostList.scss';

import React, { useContext } from 'react';
import StateContext from './StateContext';
import Post from './Post';
import Pagination from './Pagination';

const PostList = () => {
    const { posts } = useContext(StateContext);

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
