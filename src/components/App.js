import '../styles/App.scss';

import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import PostList from './PostList';
import StateContext from './StateContext';
import Header from './Header';
import reddit from '../apis/reddit';
import Subreddit from './Subreddit';

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
        console.log(pagination.pageNumber);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setLoading(true);
            const url = `${settings.orderBy}.json?limit=5&${pagination.query}&g=GLOBAL`;

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

    return (
        <StateContext.Provider value={state}>
            <div className="container">
                <Header />
                <HashRouter>
                    <Switch>
                        <Route path="/" exact>
                            {!loading ? <PostList /> : <div>Loading...</div>}
                        </Route>
                        <Route path="/r/:subreddit" component={Subreddit} />
                    </Switch>
                </HashRouter>
            </div>
        </StateContext.Provider>
    );
};

export default App;
