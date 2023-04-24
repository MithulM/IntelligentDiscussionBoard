import { getTimeAgoString } from "../utils";
import "../styles/Comment.css"
import PostFooter from "./postFooter";

function style(depth) {
    return {
        marginLeft: 20 * depth + "px",
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
                                    <span className="post-author">{comment.user.username}&nbsp;</span>
                                    <span className="post-date">{getTimeAgoString(comment.time_created)}</span>
                                </div>
                            </div>
                            <div className="post-body">
                                <p>{comment.answer_content}</p>
                            </div>
                            <PostFooter postID={comment.answer_id} />
                        </div>
                        {comment.replies && <Comment depth={depth + 1} comments={comment.replies} />}
                    </div>
                );
            })}
        </div>
    );
}

export default Comment;
