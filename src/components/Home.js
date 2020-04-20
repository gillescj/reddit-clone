import '../styles/Home.scss';

import React, { useContext, useEffect } from 'react';

import StateContext from './StateContext';
import PostList from './PostList';
import ExtraInfo from './ExtraInfo';
const Home = () => {
    const { setSettings, setLoading } = useContext(StateContext);

    useEffect(() => {
        setLoading(true);
        setSettings((previousSettings) => {
            return {
                ...previousSettings,
                page: '',
                subreddit: '',
            };
        });

        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="home">
            <PostList />
            <ExtraInfo infoType="home" />
        </div>
    );
};

export default Home;
