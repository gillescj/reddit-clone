import '../styles/MainContainer.scss';

import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import PostList from './PostList';
import Subreddit from './Subreddit';
import StateContext from './StateContext';
import ExtraInfo from './ExtraInfo';

const MainContainer = () => {
    const { loading } = useContext(StateContext);
    return (
        <main className="main-container">
            <Switch>
                <Route path="/" exact>
                    {!loading ? <PostList /> : <div>Loading...</div>}
                </Route>
                <Route path="/r/:subreddit" component={Subreddit} />
            </Switch>
            <ExtraInfo />
        </main>
    );
};

export default MainContainer;
