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
    const [settings, setSettings] = useState({ orderBy: 'hot' });
    const [loading, setLoading] = useState(true);

    const state = useMemo(
        () => ({
            posts,
            setPosts,
            pagination,
            setPagination,
            settings,
            setSettings,
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
            loading,
            setLoading
        ]
    );

    useEffect(() => {
        // console.log(pagination.pageNumber);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setLoading(true);
            const url = `${settings.orderBy}.json?limit=5&${pagination.query}&g=GLOBAL`;
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
    }, [pagination.pageNumber]);

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
