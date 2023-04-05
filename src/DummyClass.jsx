import React from 'react';
import './DummyClass.css';
import ClassPosts from './ClassPosts'
import getRandPosts from './utils.jsx'

function DummyClass() {
    return (
        <React.Fragment>
            <div className="classPage">
                <ClassPosts title="CS 4485" postList={getRandPosts(20, 23)} />
            </div>
        </React.Fragment>
    );
}

export default DummyClass;