import React, { useContext, useEffect } from 'react';

import StateContext from './StateContext';
import PostList from './PostList';

const Home = () => {
    const { settings, setSettings, pagination, loading, setUrl } = useContext(
        StateContext
    );

    useEffect(() => {
        setSettings((previousSettings) => {
            return {
                ...previousSettings,
                page: '',
            };
        });
        const homeUrl = `/${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`;
        setUrl(homeUrl);
    }, []);

    return <div className="home">{!loading ? <PostList /> : 'Loading...'}</div>;
};

export default Home;
