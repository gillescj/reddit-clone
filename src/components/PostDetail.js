import React, { useState, useEffect } from 'react';
import reddit from '../apis/reddit';
import Post from '../components/Post';
import CommentList from './CommentList';

const PostDetail = ({ match }) => {
    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [postUrl, setpostUrl] = useState(`comments/${match.params.postId}.json`);

    useEffect(() => {
        const fetchData = async () => {
            const response = await reddit.get(postUrl);
            setPost(response.data[0].data.children[0]);
            setComments(response.data[1].data.children);
        };
        fetchData();
    }, []);

    const renderPost = () => {
        if (!post) return;
        return <Post post={post} detailed={true} />;
    };

    return (
        <div className="post-detail">
            {renderPost()}
            <CommentList comments={comments} />
        </div>
    );
};

export default PostDetail;
