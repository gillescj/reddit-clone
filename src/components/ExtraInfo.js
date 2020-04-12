import '../styles/ExtraInfo.scss';
import ReactHtmlParser from 'react-html-parser';

import React, { useContext, useEffect, useState } from 'react';
import reddit from '../apis/reddit';
import StateContext from './StateContext';

const ExtraInfo = () => {
    const { settings } = useContext(StateContext);
    const [extraInfo, setExtraInfo] = useState();

    useEffect(() => {
        let isMounted = true;
        let infoUrl;

        const fetchData = async () => {
            console.log(settings);
            if (settings.subreddit === '') {
                infoUrl = 'subreddits/popular.json?limit=10';
            } else {
                infoUrl = `r/${settings.subreddit}/about.json`;
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
    }, [settings.subreddit]);

    const renderTitle = () => {
        if (extraInfo) {
            if (extraInfo.data.children) {
                return <h3 className="extra-info-title">Top Subreddits Today</h3>;
            } else if (extraInfo.data.title) {
                return <h3 className="extra-info-title">{extraInfo.data.title}</h3>;
            }
        }
    };

    const renderContent = () => {
        return (
            <div className="extra-info-content">
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium
                    iste laborum deleniti veniam sapiente quis temporibus quae rerum eos,
                    excepturi doloremque eveniet fugit minima! Eos ratione dolorem eveniet
                    unde aut eum voluptate ab? Dolores, suscipit velit! Accusamus, quasi.
                    Sit quia fugiat, esse veritatis dolorem cupiditate ratione ducimus
                    fuga ea doloremque laboriosam repellat rem nisi porro voluptas
                    deserunt dolor labore saepe tempore voluptatem animi! Debitis dolore
                    maiores aspernatur assumenda ducimus recusandae odio, repudiandae,
                    eaque veniam ullam quo voluptate adipisci corrupti libero.
                </p>
            </div>
        );
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
