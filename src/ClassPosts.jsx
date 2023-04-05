import React from 'react'
import './ClassPosts.css'

function ClassPosts({ title, postList }) {
    return (
        <React.Fragment>
            <div className="classPosts">
                <h1 className="classTitle">
                    {title}
                </h1>
                <div className="posts">
                    {
                        postList.map((item) => (
                            <div key={item.id} className="post">
                                <h2>{item.question}?</h2>
                                <p>{item.answer}</p>
                            </div>))
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default ClassPosts;