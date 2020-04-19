import '../styles/MainContainer.scss';

import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Subreddit from './Subreddit';
import StateContext from './StateContext';
import Home from './Home';
import PostDetail from './PostDetail';
import reddit from '../apis/reddit';
import Loader from './Loader';

const MainContainer = () => {
    const {
        setPosts,
        pagination,
        setPagination,
        settings,
        setSettings,
        url,
        setUrl,
        loading,
        setLoading,
    } = useContext(StateContext);

    useEffect(() => {
        setSettings((previousSettings) => {
            return {
                ...previousSettings,
                page: '',
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (settings.page.includes('/p/')) return;
        setUrl(
            `${settings.page}${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings.orderBy, settings.limit, pagination.query, settings.subreddit]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setLoading(true);
            const response = await reddit.get(url);

            setPagination((previousPagination) => {
                return {
                    ...previousPagination,
                    before: response.data.data.children[0].data.name,
                    after:
                        response.data.data.children[
                            response.data.data.children.length - 1
                        ].data.name,
                };
            });

            setPosts(response.data.data.children);
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return (
        <main className="main-container">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Switch>
                            <Route path="/r/:subreddit" exact component={Subreddit} />
                            <Route
                                path="/r/:subreddit/p/:postId"
                                component={PostDetail}
                            />
                        </Switch>
                    </Switch>
                </>
            )}
        </main>
    );
};

export default MainContainer;
