import '../styles/App.scss';

import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import StateContext from './StateContext';
import Header from './Header';
import reddit from '../apis/reddit';
import MainContainer from './MainContainer';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        before: null,
        after: null,
        query: ''
    });
    const [settings, setSettings] = useState({ page: 'main', orderBy: 'hot', limit: 5 });
    const [url, setUrl] = useState(
        `${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`
    );
    const [loading, setLoading] = useState(true);

    const state = useMemo(
        () => ({
            posts,
            setPosts,
            pagination,
            setPagination,
            settings,
            setSettings,
            url,
            setUrl,
            loading,
            setLoading
        }),
        [
            posts,
            setPosts,
            pagination,
            setPagination,
            settings,
            setSettings,
            url,
            setUrl,
            loading,
            setLoading
        ]
    );

    useEffect(() => {
        setUrl(
            `${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`
        );
    }, [settings.orderBy, settings.limit, pagination.query]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setLoading(true);
            console.log(url);

            const response = await reddit.get(url);

            const { after } = response.data.data;

            setPagination(previousPagination => {
                return {
                    ...previousPagination,
                    before: response.data.data.children[0].data.name,
                    after
                };
            });

            setPosts(response.data.data.children);
            setLoading(false);
        };
        fetchData();
    }, [url]);

    return (
        <StateContext.Provider value={state}>
            <div className="container">
                <Header />
                <HashRouter>
                    <MainContainer />
                </HashRouter>
            </div>
        </StateContext.Provider>
    );
};

export default App;
