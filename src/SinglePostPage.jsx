import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { getAPI, deleteAPI } from './apicalls.jsx';
import { useNavigate } from 'react-router-dom';
import './styles/SinglePostPage.css';
import { getTimeAgoString } from './utils.jsx';
import Comment from './Comment.jsx';
import PostFooter from "./postFooter.jsx"

function SinglePostPage() {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    let { postID } = useParams();

    useEffect(() => {
        getAPI("get_specific_post", [postID], setPost);
    }, [postID]);

    useEffect(() => {
        getAPI("get_answers_for_post", [postID], setComments);
    }, [postID]);

    return (
        <div className="single-post-page">
            <div className= "wrap-everything">
            <div className="post-container">
                <div className="post-body-container">
                    <div className="onePostInfo">
                        <span className="post-course-title">{post.course && `Course: ${post.course.course_number}`}&nbsp;</span>
                        <span className="post-date">Posted: {post.time_created && `${getTimeAgoString(post.time_created)}`}</span>
                    </div>
                    <h2 className="post-body-title">{post.post_title}</h2>
                    <div className="post-body-text">{post.post_content}</div>
                    <br></br>
                    <PostFooter />
                </div>
            </div>
            <div className="comment-container">
                {comments && <span className="section-title">Replies:</span>}
                <Comment depth={0} comments={comments} />
            </div>
        </div>
        </div>
    );
}

export default SinglePostPage;
