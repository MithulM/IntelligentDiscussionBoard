import "./Comment.css"

function style(depth) {
    return {
        marginLeft: 25 * depth + "px",
    };
}

function Comment({ comments, depth }) {
    return (
        <>
            {comments.map((comment) => {
                return (
                    <div key={comment.answer_id} style={style(depth)}>
                        <div className="commentBlock">
                            <div className="reply-body">
                                <div className="reply-text">{comment.answer_content}</div>
                                <div className="reply-author">Created By User {comment.user_id}</div>
                                <div className="reply-date">Created on {comment.created_at}</div>
                            </div>
                        </div>
                        {comment.replies && <Comment depth={depth + 1} comments={comment.replies} />}
                    </div>
                );
            })}
        </>
    );
}

export default Comment;