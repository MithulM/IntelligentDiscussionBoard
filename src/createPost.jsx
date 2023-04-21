import React, { useState, useRef } from 'react';
import './createPost.css';
import { Link } from 'react-router-dom';
import ClassPosts from './ClassPosts';
import getRandPosts from './utils';
import { getAPI, postAPI } from './apicalls.jsx'

function CreatePost() {
  const title = useRef();
  const content = useRef();
  const courseId = useRef();
  const userId = useRef();

  async function submitPost(event) {
    event.preventDefault();
    console.log("User Id: " + userId);
    console.log("Course Id: " + courseId);
    console.log("Title: " + title)
    console.log("Content: " + content);
    const response = await postAPI("create_post", {user_id: Number(userId), course_id: Number(courseId), title: title, content: content});
    console.log(response);
  }



  return (
    <div className="create-post-container">
      <div className="create-post">
        <h2 className="create-post__title">Create Post</h2>
        <form className="create-post__form" onSubmit={submitPost}>
          <label ref={title} className="create-post__label" htmlFor="post-title">
            Post Title
          </label>
          <input
            className="create-post__input"
            type="text"
            placeholder="Title"
            defaultValue={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="create-post__label" htmlFor="post-body">
            Post Content
          </label>
          <textarea
            className="create-post__input"
            placeholder="Enter text"
            rows="15"
            cols="50"
            defaultValue={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <label className="create-post__label" htmlFor="post-class">
            Class
          </label>
          <select
            className="create-post__select"
            id="post-class"
            name="post-class"
            defaultValue={courseId}
            required
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Select Class</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
          </select>
          <label className="create-post__label" htmlFor="post-user">
            User
          </label>
          <select
            className="create-post__select"
            id="post-user"
            name="post-user"
            defaultValue={userId}
            required
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select User</option>
            <option value="1">User 1</option>
            <option value="2">User 2</option>
            <option value="3">User 3</option>
          </select>
          <button className="create-post__button" type="submit">
            Post
          </button>
        </form>
      </div>
      <div className="similar-posts">
        <ClassPosts title="Similar Posts" postList={getRandPosts(5, 10)} />
      </div>
    </div>
  );
}

export default CreatePost;
