import React from 'react';

// import StateContext from './StateContext';

const PostDetail = ({ match }) => {
    // const { settings, setSettings, pagination, loading, setUrl } = useContext(
    //     StateContext
    // );

    // useEffect(() => {
    //     setSettings(previousSettings => {
    //         return {
    //             ...previousSettings,
    //             page: `r/${match.params.subreddit}/`
    //         };
    //     });
    //     const subredditUrl = `r/${match.params.subreddit}/${settings.orderBy}.json?limit=${settings.limit}&${pagination.query}&g=GLOBAL`;
    //     setUrl(subredditUrl);
    // }, []);

    return <div>Post Detail: {match.params.postFullName}</div>;
};

export default PostDetail;
