import '../styles/MainContainer.scss';

import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Subreddit from './Subreddit';
import StateContext from './StateContext';
import ExtraInfo from './ExtraInfo';
import Home from './Home';
import PostDetail from './PostDetail';

const MainContainer = () => {
    const { loading } = useContext(StateContext);
    return (
        <main className="main-container">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/r/:subreddit" component={Subreddit} />
                        <Route path="/p/:postId" component={PostDetail} />
                    </Switch>
                    <ExtraInfo />
                </>
            )}
        </main>
    );
};

export default MainContainer;
