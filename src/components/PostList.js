import '../styles/PostList.scss';

import React, { useContext } from 'react';
import StateContext from './StateContext';
import Post from './Post';
import Pagination from './Pagination';
import OptionsMenu from './OptionsMenu';

const PostList = () => {
    const { posts } = useContext(StateContext);

    const renderedPostList = posts.map(post => {
        return <Post key={post.data.id} post={post} detailed={false} />;
    });

    return (
        <div className="post-list">
            <OptionsMenu />
            {renderedPostList}
            <Pagination />
        </div>
    );
};

export default PostList;
