import '../styles/Post.scss';

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import showdown from 'showdown';
import ReactHtmlParser from 'react-html-parser';

import StateContext from './StateContext';

const Post = ({ post }) => {
    const [showContent, setShowContent] = useState(false);
    const [contentType, setContentType] = useState('');
    const { setPagination } = useContext(StateContext);

    const converter = new showdown.Converter();

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

    const resetPagination = () => {
        setPagination(previousPagination => {
            return {
                ...previousPagination,
                pageNumber: 1,
                query: ''
            };
        });
    };

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
            return (
                <div className="text-content">
                    {ReactHtmlParser(converter.makeHtml(post.data.selftext))}
                </div>
            );
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
                        muted
                    ></video>
                );
            } else {
                return <img src={post.data.url} alt={post.data.title} />;
            }
        }
        if (contentType === 'video') {
            return <video controls muted src={post.data.url}></video>;
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
            <div className="post-left">
                <div className="score">
                    {Math.abs(post.data.score) > 999
                        ? numeral(post.data.score).format('0.0a')
                        : post.data.score}
                </div>
                {renderContentToggle()}
            </div>
            <div className="post-right">
                <p className="tagline">
                    <Link
                        to={{ pathname: `/r/${post.data.subreddit}` }}
                        className="post-subreddit-link"
                        onClick={() => resetPagination()}
                    >
                        r/{post.data.subreddit}
                    </Link>{' '}
                    Posted by u/{post.data.author} {renderTimeAgo()}
                </p>
                <Link to={{ pathname: `/p/${post.data.id}` }} className="title-link">
                    <h3 className="title">{post.data.title}</h3>
                </Link>
                <div className="main-content-container">
                    <div className="main-content">{handleShowContent()}</div>
                    <div className="flat-list">
                        <Link
                            to={{ pathname: `/p/${post.data.id}` }}
                            className="comments"
                        >
                            {Math.abs(post.data.num_comments) > 999
                                ? numeral(post.data.num_comments).format('0.0a')
                                : post.data.num_comments}{' '}
                            Comments{' '}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
