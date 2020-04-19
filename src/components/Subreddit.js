import '../styles/Subreddit.scss';
import React, { useEffect, useContext } from 'react';

import StateContext from './StateContext';
import PostList from './PostList';
import ExtraInfo from './ExtraInfo';

const Subreddit = ({ match }) => {
    const { settings, setSettings, pagination, loading, setUrl } = useContext(
        StateContext
    );

    useEffect(() => {
        setSettings((previousSettings) => {
            return {
                ...previousSettings,
                page: `r/${match.params.subreddit}/`,
                subreddit: match.params.subreddit,
            };
        });
        const subredditUrl = `r/${match.params.subreddit}/${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`;
        setUrl(subredditUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="subreddit">
            <PostList />
            <ExtraInfo infoType="subreddit" />
        </div>
    );
};

export default Subreddit;
