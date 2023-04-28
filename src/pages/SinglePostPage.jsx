import React, { useRef, useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { getAPI, deleteAPI, postAPI, putAPI } from '../apicalls.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/SinglePostPage.css';
import { getTimeAgoString } from '../utils.jsx';
import Comment from '../components/Comment.jsx';
import ModalButton from "../components/ModalButton.jsx"
import useAuth from '../hooks/useAuth.jsx';
import { faReply, faEdit, faTrashAlt, faComment, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SinglePostPage() {

    const [isDelete, setDelete] = useState(false);
    const [isReply, setReply] = useState(false);
    const [isEdit, setEdit] = useState(false);

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const replyRef = useRef("");
    const editTitleRef = useRef("");
    const editContentRef = useRef("");

    const navigate = useNavigate();
    const { auth } = useAuth();
    let { postID } = useParams();

    const confirmReply = async () => {
        const response = await postAPI("create_answer", {
            post_id: postID,
            parent_answer: null,
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
        getAPI("get_answers_for_post", [postID], setComments);
    }

    const confirmEdit = async () => {
        const response = await putAPI("edit_post", {
            post_id: postID,
            user_id: auth.user_id,
            post_title: editTitleRef.current.value,
            post_content: editContentRef.current.value
        }, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${auth.accessToken}`
            },
            withCredentials: true,
        });
        console.log(response);
        getAPI("get_specific_post", [postID], setPost);
    }

    const confirmDelete = async () => {
        await deleteAPI("delete_post", {
            post_id: postID
        }, {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${auth.accessToken}`
        });
        navigate(-1);
    }

    const refresh = () => {
        getAPI("get_specific_post", [postID], setPost);
        getAPI("get_answers_for_post", [postID], setComments);
        setDelete(false);
        setEdit(false);
        setReply(false);
    }

    useEffect(() => {
        getAPI("get_specific_post", [postID], setPost);
    }, [postID]);

    useEffect(() => {
        getAPI("get_answers_for_post", [postID], setComments);
    }, [postID]);

    return (
        <div className="single-post-page">
            <div className="wrap-everything">
                <div className="post-container">
                    <div className="post-body-container">
                        <div className="onePostInfo">
                            <span className="post-course-title">{post.course && `Course: ${post.course.course_number}`}&nbsp;</span>
                            <span className="post-date">Posted: {post.time_created && `${getTimeAgoString(post.time_created)}`}</span>
                        </div>
                        <h2 className="post-body-title">{post.post_title}</h2>
                        <div className="post-body-text">{post.post_content}</div>
                        <br></br>
                        <div className="modify">
                            <FontAwesomeIcon className="icon comments" icon={faComment} />
                            <span>{post.answer_count} Replies</span>
                            <ModalButton title="Reply" className="ModifyPost" isOpen={isReply} buttonName={<FontAwesomeIcon className="icon" icon={faReply} />} setFunc={setReply} onConfirm={confirmReply}>
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
                            {(post.user_id !== auth.user_id) ?
                                (null) :
                                <ModalButton title="Edit Post" className="ModifyPost edit" isOpen={isEdit} buttonName={<FontAwesomeIcon className="icon reply-icon" icon={faEdit} />} setFunc={setEdit} onConfirm={confirmEdit}>
                                    <form className="edit-form">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            required
                                            placeholder="Enter a title"
                                            defaultValue={post.post_title}
                                            ref={editTitleRef}
                                        />
                                        <label className="edit-label">Edit your post: </label>
                                        <textarea
                                            className="edit-input"
                                            id="edit-body"
                                            placeholder="Edit your post"
                                            rows="10"
                                            cols="45"
                                            required
                                            defaultValue={post.post_content}
                                            ref={editContentRef}
                                        ></textarea>
                                    </form>
                                </ModalButton>}
                            {(post.user_id === auth.user_id || auth.role === "professor") ?
                                (<ModalButton isOpen={isDelete} title="Delete Post" className="ModifyPost delete" setFunc={setDelete} buttonName={<FontAwesomeIcon className="icon delete-icon" icon={faTrashAlt} />} onConfirm={confirmDelete}>
                                    <p>Are you sure you want to delete this post?</p>
                                </ModalButton>) : (null)}
                            <button onClick={refresh}><FontAwesomeIcon clssName="icon refresh-icon" icon={faArrowsRotate} /></button>
                        </div>
                    </div>
                </div>
                <div className="comment-container">
                    {comments && <span className="section-title">Replies:</span>}
                    <Comment postID={postID} postUser={post} setComments={setComments} depth={0} comments={[...comments].reverse()} />
                </div>
            </div>
        </div>
    );
}

export default SinglePostPage;
