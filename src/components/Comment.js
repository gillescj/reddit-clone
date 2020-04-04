import '../styles/Comment.scss';

import React from 'react';

import moment from 'moment';
import numeral from 'numeral';
import showdown from 'showdown';
import ReactHtmlParser from 'react-html-parser';

const Comment = ({ comment, depth }) => {
    const converter = new showdown.Converter();

    const renderTimeAgo = () => {
        const postDateTime = moment.unix(comment.data.created_utc);
        const postDateFromNow = postDateTime.fromNow();
        return postDateFromNow;
    };

    // Not rendering morechildren
    const renderReplyList = () => {
        if (!comment) return;
        // if (!comment.data) return;
        const parentPermalink = comment.data.permalink;
        if (!comment.data.replies) return;
        return comment.data.replies.data.children.map(reply => {
            if (reply.kind === 'more') {
                return (
                    <div
                        key={`${reply.data.id}unloadedChildren`}
                        className="comment-unloaded"
                    >
                        {
                            <a href={`https://www.reddit.com${parentPermalink}`}>
                                more replies...
                            </a>
                        }
                    </div>
                );
            } else {
                return (
                    <Comment
                        key={reply.data.id}
                        comment={reply}
                        depth={depth === 'odd' ? 'even' : 'odd'}
                    />
                );
            }
        });
    };

    return (
        <div key={comment.data.id} className={`comment ${depth}`}>
            <div className="top-info">
                <span className="comment-author">{comment.data.author}</span>
                <span className="score">
                    {Math.abs(comment.data.score) > 999
                        ? numeral(comment.data.score).format('0.0a')
                        : comment.data.score}{' '}
                    points
                </span>
                <span className="datePosted">{renderTimeAgo()}</span>
            </div>
            <div className="text-content">
                {ReactHtmlParser(converter.makeHtml(comment.data.body))}
            </div>
            {renderReplyList()}
        </div>
    );
};

export default Comment;
