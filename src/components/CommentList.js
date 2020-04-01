import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => {
    const renderCommentList = () => {
        if (!comments) return;
        return comments.map(comment => {
            return <Comment key={comment.data.id} comment={comment} depth="odd" />;
        });
    };

    return <div className="comment-list">{renderCommentList()}</div>;
};

export default CommentList;
