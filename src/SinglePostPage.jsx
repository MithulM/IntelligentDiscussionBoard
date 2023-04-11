import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import api from './apicalls.jsx';
import './SinglePostPage.css';

function SinglePostPage() {
    const [post, setPost] = useState({});
    let { postId } = useParams();

    useEffect(() => {

        async function fetchPost() {
            try {
                const response = await api.get(`https://eflask-idb-be.herokuapp.com/get_specific_post/data?post_id=${postId}`);
                setPost(response.data);
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

        fetchPost();
    }, [postId]);

    return (
        <div className="single-post-page">
            <div className="post-body-container">
                <h2 className="post-body-title">{post.title}</h2>
                <div className="post-body-text">{post.body}</div>
            </div>
            <div className="comments-container">
                <h3 className="comments-title">Comments</h3>
                <form className="comments-form" action="/create-comment" method="post">
                    <label className="comments-label" htmlFor="comment-body">Leave a comment:</label>
                    <textarea
                        className="comments-input"
                        id="comment-body"
                        name="comment-body"
                        placeholder="Enter your comment here"
                        rows="5"
                        cols="50"
                    ></textarea>
                    <button className="comments-button" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SinglePostPage;
