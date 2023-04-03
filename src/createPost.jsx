import React from 'react';
import './createPost.css';

function CreatePost() {
  return (
    <div className="create-post-container">
      <div className="create-post"style={{ marginLeft: '40px' }}>
        <h2 className="create-post__title">Create Post</h2>
        <form className="create-post__form" action="/createpost" method="post">
          <label className="create-post__label" htmlFor="post-title">
            Post Title
          </label>
          <textarea
            className="create-post__input"
            id="post-title"
            name="post-title"
            placeholder="Title"
            rows="1"
            cols="50"
          ></textarea>
          <label className="create-post__label" htmlFor="post-body">
            Post Body
          </label>
          <textarea
            className="create-post__input create-post__input--body"
            id="post-body"
            name="post-body"
            placeholder="Enter text"
            rows="15"
            cols="50"
          ></textarea>
          <label className="create-post__label" htmlFor="post-class">
          </label>
          <select
            className="create-post__select"
            id="post-class"
            name="post-class"
          >
            <option value="">Select Class</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
          </select>
          <button className="create-post__button" type="submit">
            Post
          </button>
        </form>
      </div>
      <div className="similar-posts">
        <h2 className="similar-posts__title">Similar Posts</h2>
        <textarea
          className="similar-posts__input similar-posts__input--body"
          id="similar-posts-body"
          name="similar-posts-body"
          placeholder="Enter text"
          rows="41"
          cols="100"
        ></textarea>
      </div>
    </div>
  );
}

export default CreatePost;
