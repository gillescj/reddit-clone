import '../styles/Home.scss';

import React, { useState, useContext, useEffect } from 'react';

import StateContext from './StateContext';
import PostList from './PostList';
import ExtraInfo from './ExtraInfo';
const Home = () => {
    const { settings, setSettings, pagination, setUrl } = useContext(StateContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setSettings((previousSettings) => {
            return {
                ...previousSettings,
                page: '',
                subreddit: '',
            };
        });
        const homeUrl = `/${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`;
        setUrl(homeUrl);
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="home">
            {isLoading ? (
                'Loading...'
            ) : (
                <>
                    <PostList />
                    <ExtraInfo infoType="home" />
                </>
            )}
        </div>
    );
};

export default Home;
