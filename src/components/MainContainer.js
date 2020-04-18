import '../styles/MainContainer.scss';

import React, { useState, useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Subreddit from './Subreddit';
import StateContext from './StateContext';
import Home from './Home';
import PostDetail from './PostDetail';
import reddit from '../apis/reddit';

const MainContainer = () => {
    const {
        setPosts,
        pagination,
        setPagination,
        settings,
        setSettings,
        url,
        setUrl,
    } = useContext(StateContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setSettings((previousSettings) => {
            return {
                ...previousSettings,
                page: '',
            };
        });
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsLoading(true);
        setUrl(
            `${settings.page}${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setIsLoading(false);
    }, [settings.orderBy, settings.limit, settings.page, pagination.query]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsLoading(true);
        const fetchData = async () => {
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
            setIsLoading(false);
        };
        fetchData();
    }, [url]);

    return (
        <main className="main-container">
            {isLoading ? (
                <div>Loading...</div>
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
