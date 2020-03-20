import React, { useState, useContext, useEffect } from 'react';

import reddit from '../apis/reddit';
import StateContext from './StateContext';
import PostList from './PostList';

const Subreddit = ({ match }) => {
    console.log(match.params.subreddit);

    const {
        setPosts,
        settings,
        pagination,
        setPagination,
        loading,
        setLoading
    } = useContext(StateContext);

    // Back button not working
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const url = `r/${match.params.subreddit}.json?limit=10&${pagination.query}&g=GLOBAL&sort=${settings.sortBy}`;
            const response = await reddit.get(url);

            console.log(response);
            console.log(response.data.data.children);

            setPosts(response.data.data.children);
            const { after } = response.data.data;
            console.log(after);

            setPagination(previousPagination => {
                return {
                    ...previousPagination,
                    before: response.data.data.children[0].name,
                    after
                };
            });
            setLoading(false);
        };
        fetchData();
    }, [pagination.pageNumber]);

    return <div className="">{!loading ? <PostList /> : 'Loading...'}</div>;
};

export default Subreddit;
