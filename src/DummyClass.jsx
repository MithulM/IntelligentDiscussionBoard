import React from 'react';
import './DummyClass.css';

function DummyClass() {

    const randCont = (min, max) => {
        const length = Math.floor(Math.random() * (max - min + 1)) + min;
        const characters = 'abcdefghijklmnopqrstuvwxyz      ';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    let postList = []
    let numPosts = Math.floor(Math.random() * 3) + 20;
    for (let i = 0; i < numPosts; i++) {
        postList.push({
            id: i,
            question: randCont(10, 20),
            answer: randCont(200, 400)
        })
    }

    return (
        <React.Fragment>
            <div className="classPosts">
                <h1 classname="classTitle">
                    CS 3377.001
                </h1>
                <div className="posts">
                    {
                        postList.map((item) => (
                            <div id={item.id} className="post">
                                <h2>{item.question}?</h2>
                                <p>{item.answer}</p>
                            </div>))
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default DummyClass;