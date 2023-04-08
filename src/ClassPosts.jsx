import React from 'react'
import './ClassPosts.css'
import { Link } from 'react-router-dom';

function ClassPosts({ title, postList }) {


    return (
        <div className="classPosts">
            <h1 className="classTitle">
                {title}
            </h1>
            <div className="posts">
                {
                    postList.map((item) => (
                        <Link to={`${item.post_id}`} key={item.post_id} className="post">
                            <h2>{item.title}</h2>
                            <p>{item.answer}</p>
                        </Link>))
                }
            </div>
        </div>
    )
}

export default ClassPosts;