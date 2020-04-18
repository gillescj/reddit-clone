import '../styles/Post.scss';
import moment from 'moment';
import numeral from 'numeral';
import showdown from 'showdown';
import ReactHtmlParser from 'react-html-parser';

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ExternalLinkSVG } from '../assets/svgs/external-link.svg';
import StateContext from './StateContext';

const Post = ({ post, detailed }) => {
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
            } else if (post.data.media.type && post.data.media.type === 'youtube.com') {
                setContentType('youtube');
            }
        } else if (post.data.domain.split('.')[0] !== 'self') {
            setContentType('link');
        } else {
            setContentType('none');
        }
        if (detailed) setShowContent(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetPagination = () => {
        setPagination((previousPagination) => {
            return {
                ...previousPagination,
                pageNumber: 1,
                query: '',
            };
        });
    };

    const formatNumber = (number) => {
        return Math.abs(number) > 999 ? numeral(number).format('0.0a') : number;
    };

    const handleContentToggle = () => {
        setShowContent((previousShowContent) => !previousShowContent);
    };

    const renderContentButton = () => {
        if (contentType === 'none') return;
        if (contentType === 'link') {
            return (
                <a
                    className="content-button"
                    href={post.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ExternalLinkSVG />
                </a>
            );
        } else {
            return (
                <button onClick={handleContentToggle} className="content-toggle">
                    {showContent ? <>&times;</> : <>+</>}
                </button>
            );
        }
    };

    const renderTimeAgo = () => {
        const postDateTime = moment.unix(post.data.created_utc);
        const postDateFromNow = postDateTime.fromNow();
        return postDateFromNow;
    };

    const renderTagline = () => {
        return (
            <p className="tagline">
                <Link
                    to={{ pathname: `/r/${post.data.subreddit}` }}
                    className="post-subreddit-link"
                    onClick={() => resetPagination()}
                >
                    r/{post.data.subreddit}{' '}
                </Link>
                Posted by u/{post.data.author} {renderTimeAgo()}
            </p>
        );
    };

    const renderTitle = () => {
        if (detailed) {
            return (
                <h3 className="title">
                    {ReactHtmlParser(converter.makeHtml(post.data.title))}
                </h3>
            );
        } else {
            return (
                <Link
                    to={{ pathname: `/r/${post.data.subreddit}/p/${post.data.id}` }}
                    className="title-link"
                >
                    <div className="title">
                        {ReactHtmlParser(converter.makeHtml(post.data.title))}
                    </div>
                </Link>
            );
        }
    };

    const renderFlatList = () => {
        return (
            <div className="flat-list">
                {post.data.over_18 ? <span className="nsfw">nsfw</span> : null}
                {detailed ? (
                    <span className="comments">
                        {formatNumber(post.data.num_comments)} Comments{' '}
                    </span>
                ) : (
                    <Link
                        to={{ pathname: `/r/${post.data.subreddit}/p/${post.data.id}` }}
                        className="comments"
                    >
                        {formatNumber(post.data.num_comments)} Comments{' '}
                    </Link>
                )}
            </div>
        );
    };

    // Audio not working for most vidoes
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
        if (contentType === 'youtube') {
            const youtubeId = post.data.media.oembed.html.substring(
                post.data.media.oembed.html.indexOf('embed/') + 6,
                post.data.media.oembed.html.indexOf('?')
            );
            const videoSrc = `https://www.youtube.com/embed/${youtubeId}`;
            return <iframe title={post.data.media.oembed.title} src={videoSrc}></iframe>;
        }
    };

    return (
        <div className="post">
            <div className="post-left">
                <div className="score">{formatNumber(post.data.score)}</div>
                {renderContentButton()}
            </div>
            <div className="post-right">
                {renderTagline()}
                {renderTitle()}
                <div className="main-content-container">
                    <div className="main-content">{handleShowContent()}</div>
                    {renderFlatList()}
                </div>
            </div>
        </div>
    );
};

export default Post;
