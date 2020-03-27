import React, { useState, useContext, useEffect } from 'react';

import reddit from '../apis/reddit';
import StateContext from './StateContext';
import PostList from './PostList';

const Subreddit = ({ match }) => {
    const {
        settings,
        setSettings,
        pagination,
        setPagination,
        loading,
        setLoading,
        setUrl
    } = useContext(StateContext);

    useEffect(() => {
        setPagination(previousPagination => {
            return {
                ...previousPagination,
                pageNumber: 1,
                query: ''
            };
        });
        setSettings(previousSettings => {
            return {
                ...previousSettings,
                page: `r/${match.params.subreddit}/`
            };
        });
        const subredditUrl = `r/${match.params.subreddit}/${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`;
        setUrl(subredditUrl);
    }, []);

    return <div className="">{!loading ? <PostList /> : 'Loading...'}</div>;
};

export default Subreddit;
