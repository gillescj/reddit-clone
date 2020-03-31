import React from 'react';
import Comment from './Comment';

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

    return (
        <div className="post-detail">
            <div>Post Detail: {match.params.postFullName}</div>
            <Comment
                id="12"
                author="coolguy99"
                score={11333}
                datePosted={0}
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam molestias veniam natus obcaecati modi nobis id unde necessitatibus blanditiis. Numquam?"
                replies={[
                    {
                        id: '10',
                        author: 'usertestname',
                        score: 373,
                        datePosted: 10000,
                        content:
                            'Lorem ipsum dolor sit. Nam molestias veniam natus obcaecati modi nobis id unde necessitatibus blanditiis. Numquam?'
                    }
                ]}
            />
        </div>
    );
};

export default PostDetail;
