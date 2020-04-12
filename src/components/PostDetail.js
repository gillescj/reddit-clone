import '../styles/PostDetail.scss';

import React, { useState, useEffect, useContext } from 'react';
import StateContext from './StateContext';
import reddit from '../apis/reddit';
import Post from '../components/Post';
import CommentList from './CommentList';
import ExtraInfo from './ExtraInfo';

const PostDetail = ({ match }) => {
    const { setSettings } = useContext(StateContext);

    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [postUrl, setpostUrl] = useState(`comments/${match.params.postId}.json`);

    useEffect(() => {
        setSettings((previousSettings) => {
            return {
                ...previousSettings,
                page: match.url,
                subreddit: match.url.substring(
                    match.url.indexOf('r/') + 2,
                    match.url.indexOf('/p/')
                ),
            };
        });
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
            <main className="post-detail-main">
                {renderPost()}
                <CommentList comments={comments} />
            </main>
            <ExtraInfo />
        </div>
    );
};

export default PostDetail;
