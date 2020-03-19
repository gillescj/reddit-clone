import '../styles/App.scss';
import axios from 'axios';

import React, { useState, useEffect, useMemo } from 'react';
import PostList from './PostList';
import StateContext from './StateContext';
import Header from './Header';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        before: null,
        after: null
    });
    const [settings, setSettings] = useState({ orderBy: 'hot' });
    const [loading, setLoading] = useState(true);

    const state = useMemo(
        () => ({
            posts,
            setPosts,
            pagination,
            setPagination,
            settings,
            setSettings
        }),
        [posts, setPosts, pagination, setPagination, settings, setSettings]
    );

    useEffect(() => {
        console.log(pagination.pageNumber);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setLoading(true);
            const url = `https://cors-anywhere.herokuapp.com/https://reddit.com/${
                settings.orderBy
            }.json?limit=5&before=${pagination.before ? pagination.before : ''}&after=${
                pagination.after ? pagination.after : ''
            }&g=GLOBAL`;
            // `https://cors-anywhere.herokuapp.com/https://reddit.com/search.json?q=gifs`

            const response = await axios.get(url);

            console.log(response);
            console.log(response.data.data.children);

            setPosts(response.data.data.children);
            const { before, after } = response.data.data;
            console.log(before, after);
            setPagination(previousPagination => {
                return { ...previousPagination, before, after };
            });
            setLoading(false);
        };
        fetchData();
    }, [pagination.pageNumber]);

    return (
        <StateContext.Provider value={state}>
            <div className="container">
                <Header />
                {!loading ? <PostList /> : <div>Loading...</div>}
            </div>
        </StateContext.Provider>
    );
};

export default App;
