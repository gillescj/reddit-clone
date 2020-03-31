import React, { useState, useEffect } from 'react';
import reddit from '../apis/reddit';
import Comment from './Comment';
import CommentList from './CommentList';

const PostDetail = ({ match }) => {
    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [postUrl, setpostUrl] = useState(`comments/${match.params.postId}.json`);

    useEffect(() => {
        const fetchData = async () => {
            const response = await reddit.get(postUrl);
            setPost(response.data[0].data.children[0].data);
            setComments(response.data[1].data.children);
        };
        fetchData();
    }, []);

    return (
        <div className="post-detail">
            <div>Post Detail: {match.params.postId}</div>
            <CommentList comments={comments} />
        </div>
    );
};

export default PostDetail;
