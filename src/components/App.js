import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import StateContext from './StateContext';
import Header from './Header';
import MainContainer from './MainContainer';

const App = () => {
    const [theme, setTheme] = useState('light');
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        before: null,
        after: null,
        query: '',
    });
    const [extraInfo, setExtraInfo] = useState();
    const [settings, setSettings] = useState({
        page: '',
        subreddit: '',
        orderBy: 'hot',
        limit: 10,
    });
    const [url, setUrl] = useState(
        `${settings.page}${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`
    );
    const [loading, setLoading] = useState(true);

    const state = {
        theme,
        setTheme,
        posts,
        setPosts,
        pagination,
        setPagination,
        extraInfo,
        setExtraInfo,
        settings,
        setSettings,
        url,
        setUrl,
        loading,
        setLoading,
    };

    return (
        <>
            <Helmet>
                <body data-theme={theme} />
            </Helmet>
            <StateContext.Provider value={state}>
                <div className="container">
                    <HashRouter>
                        <Header />
                        <MainContainer />
                    </HashRouter>
                </div>
            </StateContext.Provider>
        </>
    );
};

export default App;
