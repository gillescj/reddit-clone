import '../styles/Comment.scss';

import React from 'react';

import moment from 'moment';
import numeral from 'numeral';

const Comment = ({ comment, depth }) => {
    const parser = new DOMParser();
    const renderTimeAgo = () => {
        const postDateTime = moment.unix(comment.data.created_utc);
        const postDateFromNow = postDateTime.fromNow();
        return postDateFromNow;
    };

    // Not rendering everything
    const renderReplyList = () => {
        if (!comment) return;
        if (!comment.data) return;
        if (!comment.data.replies) return;
        if (comment.data.replies.length === 0) return;
        return comment.data.replies.data.children.map(reply => {
            return (
                <Comment
                    key={reply.data.id}
                    comment={reply}
                    depth={depth === 'odd' ? 'even' : 'odd'}
                />
            );
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
            <p className="text-content">
                {
                    parser.parseFromString(
                        `<!doctype html><body>${comment.data.body}`,
                        'text/html'
                    ).body.textContent
                }
            </p>
            {renderReplyList()}
        </div>
    );
};

export default Comment;
