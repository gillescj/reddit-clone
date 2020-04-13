import '../styles/Home.scss';

import React, { useContext, useEffect } from 'react';

import StateContext from './StateContext';
import PostList from './PostList';
import ExtraInfo from './ExtraInfo';
const Home = () => {
    const { settings, setSettings, pagination, loading, setUrl } = useContext(
        StateContext
    );

    useEffect(() => {
        setSettings((previousSettings) => {
            return {
                ...previousSettings,
                page: '',
                subreddit: '',
            };
        });
        const homeUrl = `/${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`;
        setUrl(homeUrl);
    }, []);

    return (
        <div className="home">
            {loading ? (
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
