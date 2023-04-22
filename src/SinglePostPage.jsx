import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { getAPI, deleteAPI } from './apicalls.jsx';
import { useNavigate } from 'react-router-dom';
import './SinglePostPage.css';
import { getTimeAgoString } from './utils.jsx';
import Modal from './Modal.jsx';
import Comment from './Comment.jsx';

function SinglePostPage() {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [isDelete, setDelete] = useState(false);
    const [isReply, setReply] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const navigate = useNavigate();
    let { postID } = useParams();

    useEffect(() => {
        getAPI("get_specific_post", [postID], setPost);
    }, [postID]);

    useEffect(() => {
        getAPI("get_answers_for_post", [postID], setComments);
    }, [postID]);

    const confirmDelete = () => {
        deleteAPI("delete_post", postID);
        setDelete(false);
        console.log("/" + post.course.course_number);
        navigate("/" + post.course.course_number.toLowerCase().replace(/\s/g, ''));
    }

    return (
        <div className="single-post-page">
            <div className="post-body-container">
                <div className="onePostInfo">
                    <span className="post-course-title">{post.course && `Course: ${post.course.course_number}`}&nbsp;</span>
                    <span className="post-date">Posted: {post.time_created && `${getTimeAgoString(post.time_created)}`}</span>
                </div>
                <h2 className="post-body-title">{post.post_title}</h2>
                <div className="post-body-text">{post.post_content}</div>
                <br></br>
                <div className="modify">
                    <button onClick={() => setReply(true)} className="ModifyPost" >Reply</button>
                    <Modal open={isReply} onClose={() => setReply(false)} title="Reply">
                        <form className="comments-form">
                            <label className="comments-label">Leave a comment:</label>
                            <textarea
                                className="comments-input"
                                id="comment-body"
                                placeholder="Enter your comment here"
                                rows="10"
                                cols="45"
                            ></textarea>
                        </form>
                    </Modal>
                    <button onClick={() => setEdit(true)} className="ModifyPost edit">Edit</button>
                    <Modal open={isEdit} onClose={() => setEdit(false)} title="Edit Post">
                        <form className="edit-form">
                            <label className="edit-label">Edit your post: </label>
                            <textarea
                                className="edit-input"
                                id="edit-body"
                                placeholder="Edit your post"
                                rows="10"
                                cols="45"
                            ></textarea>
                        </form>
                    </Modal>
                    <button onClick={() => setDelete(true)} className="ModifyPost delete" >Delete</button>
                    <Modal open={isDelete} onClose={() => setDelete(false)} title="Delete Post" onConfirm={confirmDelete}>
                        Are you sure you want to delete this post?
                    </Modal>
                </div>
            </div>
            <div className="replies">
                {comments && <span className="section-title">Replies:</span>}
                <Comment depth={0} comments={comments} />
            </div>
        </div>
    );
}

export default SinglePostPage;
