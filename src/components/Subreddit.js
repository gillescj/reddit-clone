import React, { useState, useContext, useEffect } from 'react';

import StateContext from './StateContext';
import PostList from './PostList';

const Subreddit = ({ match }) => {
    const [subPage, setSubPage] = useState(1);
    const [subQuery, setSubQuery] = useState('');
    const {
        settings,
        setSettings,
        pagination,
        setPagination,
        loading,
        setUrl
    } = useContext(StateContext);

    useEffect(() => {
        setSettings(previousSettings => {
            return {
                ...previousSettings,
                page: `r/${match.params.subreddit}/`
            };
        });
        const subredditUrl = `r/${match.params.subreddit}/${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`;
        setUrl(subredditUrl);
    }, []);

    return <div>{!loading ? <PostList /> : 'Loading...'}</div>;
};

export default Subreddit;
