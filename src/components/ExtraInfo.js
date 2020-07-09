import '../styles/ExtraInfo.scss';
import numeral from 'numeral';

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import reddit from '../apis/reddit';
import StateContext from './StateContext';
import globeSVG from '../assets/svgs/globe.svg';

const ExtraInfo = ({ infoType }) => {
    const { extraInfo, setExtraInfo, settings, setPagination } = useContext(StateContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        let isMounted = true;
        let infoUrl;

        const fetchData = async () => {
            if (infoType === 'home') {
                infoUrl = 'subreddits/default.json?limit=15';
            } else {
                infoUrl = `r/${settings.subreddit}/about.json`;
            }
            const response = await reddit.get(infoUrl);
            if (isMounted) {
                setExtraInfo(response.data);
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoType, settings.subreddit]);

    const formatNumber = (number) => {
        return Math.abs(number) > 999 ? numeral(number).format('0.0a') : number;
    };

    const resetPagination = () => {
        setPagination((previousPagination) => {
            return {
                ...previousPagination,
                pageNumber: 1,
                query: '',
            };
        });
    };

    const renderTitle = () => {
        if (!extraInfo) return;
        if (infoType === 'home') {
            return <h3 className="extra-info-title">Popular Subreddits</h3>;
        } else {
            return <h3 className="extra-info-title">{extraInfo.data.display_name}</h3>;
        }
    };

    const onImageError = (event) => {
        event.target.src = globeSVG;
    };

    const renderIcon = (subredditObject) => {
        if (subredditObject.data.icon_img) {
            return (
                <img
                    src={subredditObject.data.icon_img}
                    alt={subredditObject.data.display_name_prefixed}
                    onError={(event) => onImageError(event)}
                />
            );
        } else {
            return (
                <img
                    src={globeSVG}
                    alt={subredditObject.data.display_name_prefixed}
                    onError={(event) => onImageError(event)}
                />
            );
        }
    };

    const renderContent = () => {
        if (!extraInfo) return;
        let renderedContent;
        if (infoType === 'home') {
            if (!extraInfo.data.children) return;
            const renderedTopSubredditList = extraInfo.data.children.map((subreddit) => {
                return (
                    <Link
                        to={`/r/${subreddit.data.display_name}`.toLowerCase()}
                        key={subreddit.data.display_name}
                        onClick={() => resetPagination()}
                    >
                        <div className="topSubreddit">
                            <div className="top-subreddit-left">
                                {renderIcon(subreddit)}
                            </div>
                            <div className="top-subreddit-right">
                                <div className="top-subreddit-title">
                                    {subreddit.data.display_name}
                                </div>
                                <div className="subscriberCount">
                                    {formatNumber(subreddit.data.subscribers)} subscribers
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            });
            renderedContent = (
                <div className="topSubredditList">{renderedTopSubredditList}</div>
            );
        } else {
            renderedContent = (
                <>
                    <div className="subreddit-user-description">
                        {extraInfo.data.public_description}
                    </div>
                </>
            );
        }
        return <div className="extra-info-content">{renderedContent}</div>;
    };

    return (
        <>
            {isLoading ? null : (
                <div className="extra-info">
                    {renderTitle()}
                    {renderContent()}
                    <div className="attribution">
                        Made possible with the{' '}
                        <a
                            href="https://reddit.com/dev/api"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="reddit-api-link"
                        >
                            Reddit API
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExtraInfo;
