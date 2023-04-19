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
                        <Link to={`/cs4332/${item.post_id}`} key={item.post_id} className="post">
                            <p>{item.title}</p>
                            <p>{item.answer}</p>
                        </Link>))
                }
            </div>
        </div>
    )
}

export default ClassPosts;