import '../styles/ExtraInfo.scss';
import numeral from 'numeral';

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import reddit from '../apis/reddit';
import StateContext from './StateContext';

const ExtraInfo = ({ infoType }) => {
    const { settings } = useContext(StateContext);
    const [extraInfo, setExtraInfo] = useState();

    useEffect(() => {
        let isMounted = true;
        let infoUrl;

        const fetchData = async () => {
            console.log(settings);
            if (infoType === 'home') {
                infoUrl = 'subreddits/popular.json?limit=15';
            } else {
                infoUrl = `r/${settings.subreddit}/about.json`;
                console.log(infoUrl);
            }
            const response = await reddit.get(infoUrl);
            if (isMounted) {
                setExtraInfo(response.data);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings.subreddit]);

    const formatNumber = (number) => {
        return Math.abs(number) > 999 ? numeral(number).format('0.0a') : number;
    };

    const renderTitle = () => {
        if (!extraInfo) return;
        if (infoType === 'home') {
            return <h3 className="extra-info-title">Growing Subreddits</h3>;
        } else {
            return <h3 className="extra-info-title">{extraInfo.data.display_name}</h3>;
        }
    };

    const renderContent = () => {
        if (!extraInfo) return;
        let renderedContent;
        if (infoType === 'home') {
            const renderedTopSubredditList = extraInfo.data.children.map((subreddit) => {
                return (
                    <div className="topSubreddit" key={subreddit.data.display_name}>
                        <Link to={`/r/${subreddit.data.display_name}`.toLowerCase()}>
                            {subreddit.data.display_name}
                        </Link>
                        <div className="subscriberCount">
                            {formatNumber(subreddit.data.subscribers)} subscribers
                        </div>
                    </div>
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
    );
};

export default ExtraInfo;
