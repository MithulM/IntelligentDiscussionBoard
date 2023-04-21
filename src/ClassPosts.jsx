import React, { useEffect } from 'react'
import './ClassPosts.css'
import { Link } from 'react-router-dom';
import { getTimeAgoString } from './utils.jsx';
import { getAPI } from './apicalls.jsx';

function ClassPosts({ title, postList }) {

    return (
        <div className="classPosts">
            <h1 className="classTitle">
                {title}
            </h1>
            <div className="posts">{
                postList.map((item) => (
                    <Link to={`/cs4332/${item.post_id}`} key={item.post_id} className="post">
                        <div className="postHeading">
                            <span className='postTitle'>{item.post_title}</span>
                            <span className="author">{item.user.username}</span>
                            <span> </span>
                            <span className="time">{getTimeAgoString(item.time_created)}</span>
                        </div>
                        <div className="contentPreview">
                            <p>{item.post_content}</p>
                        </div>
                        <div className="answerCount">
                            No. of comments: <span>{item.answer_count}</span>
                        </div>
                    </Link>))}
            </div>
        </div >
    )
}

export default ClassPosts;