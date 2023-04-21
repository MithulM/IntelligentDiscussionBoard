import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { getAPI, deleteAPI } from './apicalls.jsx';
import { useNavigate } from 'react-router-dom';
import './SinglePostPage.css';
import Modal from './Modal.jsx';

function SinglePostPage() {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [isDelete, setDelete] = useState(false);
    const [isReply, setReply] = useState(false);
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

    async function createAnswer() {

        console.log(document.getElementById("comment-body").value);

        try {
            const response = await api.post(`/create_post/`, {
                content: document.getElementById("comment-body").value,
                post_id: postID,
                user_id: 3
            });
            console.log(response.data);
            setComments([...comments, response.data]);
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else {
                console.log(`Error: ${err.message}`);
            }
        }
    }

    const REPLY_STYLE = {
        position: "relative",
        left: -200,
    }

    return (
        <div className="single-post-page">
            <div className="post-body-container">
                <h2 className="post-body-title">{post.post_title}</h2>
                <div className="post-body-text">{post.post_content}</div>
                <div className="modify">
                    <button onClick={() => setReply(true)} className="create-reply" >Reply</button>
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
                    <button className="ModifyPost edit">Edit</button>
                    <button onClick={() => setDelete(true)} className="ModifyPost delete" >Delete</button>
                    <Modal open={isDelete} onClose={() => setDelete(false)} title="Delete Post" onConfirm={confirmDelete}>
                        Are you sure you want to delete this post?
                    </Modal>
                </div>
            </div>
            <div className="replies">
                {comments.map((comment) => (
                    <div className="reply">
                        <div className="reply-body">
                            <div className="reply-text">{comment.answer_content}</div>
                            <div className="reply-author">Created By User {comment.user_id}</div>
                            <div className="reply-date">Created on {comment.created_at}</div>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    );
}

export default SinglePostPage;
