import '../styles/App.scss';

import React, { useState, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import StateContext from './StateContext';
import Header from './Header';
import MainContainer from './MainContainer';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        before: null,
        after: null,
        query: '',
    });
    const [settings, setSettings] = useState({ page: '', orderBy: 'hot', limit: 25 });
    const [url, setUrl] = useState(
        `${settings.page}${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`
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
            setLoading,
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
            setLoading,
        ]
    );

    return (
        <StateContext.Provider value={state}>
            <div className="container">
                <HashRouter>
                    <Header />
                    <MainContainer />
                </HashRouter>
            </div>
        </StateContext.Provider>
    );
};

export default App;
