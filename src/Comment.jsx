import { getTimeAgoString } from "./utils";
import "./Comment.css"
import SinglePostPage from "./SinglePostPage.css";

function style(depth) {
    return {
        marginLeft: 25 * depth + "px",
    };
}

function Comment({ comments, depth }) {
    return (
        <div className="fullComments">
            {comments.map((comment) => {
                return (
                    <div key={comment.answer_id} style={style(depth)}>
                        <div className="commentBlock">
                            <div className="post-header">
                                <h2 className="post-title">{comment.title}</h2>
                                <div className="post-info">
                                    <span className="post-author">u/{comment.user_id}&nbsp;</span>
                                    <span className="post-date">{getTimeAgoString(comment.time_created)}</span>
                                </div>
                            </div>
                            <div className="post-body">
                                <p>{comment.answer_content}</p>
                            </div>
                            <div className="modify">
                                <div className="post-actions">
                                    <button className="ModifyPost">Reply</button>
                                    <button className="ModifyPost edit">Edit</button>
                                    <button className="ModifyPost delete">Delete</button>
                                </div>
                            </div>
                        </div>
                        {comment.replies && <Comment depth={depth + 1} comments={comment.replies} />}
                    </div>
                );
            })}
        </div>
    );
}

export default Comment;