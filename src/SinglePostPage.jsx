import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import api from './apicalls.jsx';
import './SinglePostPage.css';

function SinglePostPage() {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    let { postId } = useParams();

    useEffect(() => {

        async function fetchPost() {
            try {
                const response = await api.get(`/get_specific_post/${postId}`);
                console.log(response.data)
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
    }, []);

    useEffect(() => {

        async function fetchPost() {
            try {
                const response = await api.get(`/get_answers_for_post/${postId}`);
                console.log(response.data)
                setComments(response.data);
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
    }, []);

    async function createAnswer() {

        console.log(document.getElementById("comment-body").value);

        try {
            const response = await api.post(`/create_post`, {
                content: document.getElementById("comment-body").value,
                post_id: postId,
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

    return (
        <div className="single-post-page">
            <div className="post-body-container">
                <h2 className="post-body-title">{post.post_title}</h2>
                <div className="post-body-text">{post.post_content}</div>
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
                        rows="10"
                        cols="60"
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
