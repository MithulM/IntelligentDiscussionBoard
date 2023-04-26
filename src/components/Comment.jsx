import { getTimeAgoString } from "../utils";
import { useRef, useState } from "react"
import { getAPI, postAPI, deleteAPI, putAPI } from "../apicalls.jsx"
import ModalButton from "./ModalButton";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faEdit, faTrashAlt, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "../styles/Comment.css"

function Comment({ postID, comments, depth, setComments }) {

    const [isDelete, setDelete] = useState(false);
    const [isReply, setReply] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [editContent, setEditContent] = useState("");

    const { auth } = useAuth();

    const replyRef = useRef("");
    const editContentRef = useRef("");

    const confirmReply = async (answer_id) => {
        const response = await postAPI("create_answer", {
            post_id: postID,
            parent_answer: answer_id,
            user_id: auth.user_id,
            answer_content: replyRef.current.value
        }, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${auth.accessToken}`
            },
            withCredentials: true,
        });
        console.log(response);
        const updatedComments = await getAPI("get_answers_for_post", [postID], setComments);
        setComments(updatedComments);
    }

    const confirmEdit = async (answer_id) => {
        const response = await putAPI("edit_post", {
            answer_id: answer_id,
            answer_content: editContentRef.current.value
        }, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${auth.accessToken}`
            },
            withCredentials: true,
        });
        console.log(response);
        setEditContent(comment.answer_content);
        setEdit(true);
        const updatedComments = await getAPI("get_answers_for_post", [postID], setComments);
        setComments(updatedComments);
    }

    const confirmDelete = async (answer_id) => {
        await deleteAPI("delete_answer", {
            answer_id: answer_id
        }, {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${auth.accessToken}`
        });
        const updatedComments = await getAPI("get_answers_for_post", [postID], setComments);
    }
    return (
        <div className="childComments">
            {comments.map((comment) => {
                const items = [];

                // Loop to generate n items
                for (let i = 0; i < depth; i++) {
                    items.push(<div key={i} className="threadLine">​</div>);
                }

                return (
                    <div key={comment.answer_id}>
                        <div className="commentInfo">
                            {items}
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
                                <div className="modify">
                                    <button className="vote-icon upvote">
                                        <FontAwesomeIcon icon={faArrowUp} />
                                    </button>
                                    <span className="vote-icon">
                                        <span className="upvote-number">{comment.vote_count}</span>
                                    </span>
                                    <button className="vote-icon downvote">
                                        <FontAwesomeIcon icon={faArrowDown} />
                                    </button>
                                    <ModalButton title="Reply" className="ModifyPost" isOpen={isReply} buttonName={<FontAwesomeIcon icon={faReply} />} setFunc={setReply} onConfirm={(e) => confirmReply(comment.answer_id)}>
                                        <form className="comments-form">
                                            <label className="comments-label">Leave a comment:</label>
                                            <textarea
                                                className="comments-input"
                                                id="comment-body"
                                                placeholder="Enter your comment here"
                                                rows="10"
                                                cols="45"
                                                ref={replyRef}
                                            ></textarea>
                                        </form>
                                    </ModalButton>
                                    {(comment.user.user_id !== auth.user_id) ?
                                        (undefined) :
                                        <ModalButton title="Edit Post" className="ModifyPost edit" isOpen={isEdit} buttonName={<FontAwesomeIcon className="icon reply-icon" icon={faEdit} />} setFunc={setEdit} onConfirm={(e) => confirmEdit(comment.answer_id)}>
                                            <form className="edit-form">
                                                <label className="edit-label">Edit your reply: </label>
                                                <textarea
                                                    className="edit-input"
                                                    id="edit-body"
                                                    placeholder="Edit your Reply"
                                                    rows="10"
                                                    cols="45"
                                                    defaultValue={editContent}
                                                    ref={editContentRef}
                                                ></textarea>
                                            </form>
                                        </ModalButton>}
                                    {(comment.user.user_id !== auth.user_id) ?
                                        (undefined) :
                                        <ModalButton isOpen={isDelete} title="Delete Reply" className="ModifyPost delete" setFunc={setDelete} buttonName={<FontAwesomeIcon className="icon delete-icon" icon={faTrashAlt} />} onConfirm={(e) => confirmDelete(comment.answer_id)}>
                                            <p>Are you sure you want to delete this reply?</p>
                                        </ModalButton>}
                                </div>
                            </div>
                        </div>
                        {comment.replies && <Comment postID={postID} setComments={setComments} depth={depth + 1} comments={[...comment.replies].reverse()} />}
                    </div>
                );
            })}
        </div>
    );
}

export default Comment;
