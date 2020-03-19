import '../styles/Post.scss';

import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Post = ({ post }) => {
    const [showContent, setShowContent] = useState(false);
    const [contentType, setContentType] = useState('');
    // const [showContentToggle, setShowContentToggle] = useState(false);

    useEffect(() => {
        if (post.data.selftext !== '') {
            setContentType('text');
        } else if (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|png)/.test(post.data.url)) {
            setContentType('image');
        } else if (/(http(s?):)([/|.|\w|\s|-])*\.(?:gifv?)/.test(post.data.url)) {
            setContentType('gif');
        } else if (
            /(http(s?):)([/|.|\w|\s|-])*\.(?:mp4|avi|mov|flv|wmv)/.test(post.data.url)
        ) {
            setContentType('video');
        } else if (post.data.media) {
            if (post.data.media.reddit_video) {
                setContentType('reddit-video');
            } else if (post.data.media.type && post.data.media.type === 'gfycat.com') {
                setContentType('gfycat');
            }
        } else {
            setContentType('link');
        }
    }, []);

    const handleContentToggle = () => {
        setShowContent(previousShowContent => !previousShowContent);
    };

    const renderContentToggle = () => {
        if (contentType === 'link') return;
        return (
            <button onClick={handleContentToggle} className="content-toggle">
                {showContent ? <>&times;</> : <>+</>}
            </button>
        );
    };

    const renderTimeAgo = () => {
        const postDateTime = moment.unix(post.data.created_utc);
        const postDateFromNow = postDateTime.fromNow();
        return postDateFromNow;
    };

    // Audio not working
    const handleShowContent = () => {
        if (!showContent) return;
        if (contentType === 'text') {
            return <p>{post.data.selftext}</p>;
        }
        if (contentType === 'image') {
            return <img src={post.data.url} alt={post.data.title} />;
        }
        if (contentType === 'gif') {
            if (post.data.url.includes('.gifv')) {
                return (
                    <video
                        controls
                        src={post.data.url.replace('.gifv', '.mp4')}
                        type="video/mp4"
                        preload="auto"
                        autoPlay="autoplay"
                        loop="loop"
                    ></video>
                );
            } else {
                return <img src={post.data.url} alt={post.data.title} />;
            }
        }
        if (contentType === 'video') {
            return <video controls src={post.data.url}></video>;
        }
        if (contentType === 'reddit-video') {
            return (
                <video
                    controls
                    src={post.data.media.reddit_video.fallback_url}
                    type="video/mp4"
                    preload="auto"
                    autoPlay="autoplay"
                    loop="loop"
                ></video>
            );
        }
        if (contentType === 'gfycat') {
            return (
                <img src={post.data.media.oembed.thumbnail_url} alt={post.data.title} />
            );
        }
    };

    return (
        <div className="post">
            <p className="tagline">
                r/{post.data.subreddit} Posted by u/{post.data.author} {renderTimeAgo()}
            </p>
            <h3 className="title">{post.data.title}</h3>
            <div className="main-content-container">
                {renderContentToggle()}
                <div className="main-content">{handleShowContent()}</div>
                <p className="flat-list">{post.data.num_comments} Comments</p>
            </div>
        </div>
    );
};

export default Post;
