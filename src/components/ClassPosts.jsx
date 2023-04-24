import React, { useEffect } from 'react'
import '../styles/ClassPosts.css'
import { Link } from 'react-router-dom';
import { getTimeAgoString } from '../utils.jsx';
import PostFooter from './postFooter';

function ClassPosts({ title, postList }) {

    return (
        <div className="classPosts">
            <h1 className="classTitle">
                {title}
            </h1>
            <div className="posts">{
                postList.map((post) => (
                    <Link to={`/${post.course.course_number.toLowerCase().replace(/\s/g, '')}/${post.post_id}`} key={post.post_id} className="post">
                        <div className="postHeading">
                            <span className='postTitle'>{post.post_title}</span>
                            <span className="author">{post.user.username}</span>
                            <span> </span>
                            <span className="time">{getTimeAgoString(post.time_created)}</span>
                        </div>
                        <div className="contentPreview">
                            <p>{post.post_content}</p>
                        </div>
                        <div className="answerCount">
                            <span>No. of comments:</span>
                            <span>&nbsp;</span>
                            <span className="numComment">{post.answer_count}</span>
                            <span>{post.course.course_number}</span>
                        </div>
                    </Link>))}
            </div>
        </div>
    )
}

export default ClassPosts;