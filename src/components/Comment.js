import '../styles/Comment.scss';

import React from 'react';

import moment from 'moment';
import numeral from 'numeral';

const Comment = ({ id, author, score, datePosted, content, replies }) => {
    const renderTimeAgo = () => {
        const postDateTime = moment.unix(datePosted);
        const postDateFromNow = postDateTime.fromNow();
        return postDateFromNow;
    };

    const renderReplyList = () => {
        if (!replies) return;
        if (replies.length === 0) return;
        return replies.map(reply => {
            return (
                <Comment
                    key={reply.id}
                    author={reply.author}
                    score={reply.score}
                    datePosted={reply.datePosted}
                    content={reply.content}
                    replies={reply.replies}
                />
            );
        });
    };

    return (
        <div key={id} className="comment">
            <div className="top-info">
                <span className="comment-author">{author}</span>
                <span className="score">
                    {Math.abs(score) > 999 ? numeral(score).format('0.0a') : score} points
                </span>
                <span className="datePosted">{renderTimeAgo()}</span>
            </div>
            <p className="text-content">{content}</p>
            {renderReplyList()}
        </div>
    );
};

export default Comment;
