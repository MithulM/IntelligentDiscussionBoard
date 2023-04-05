import React from 'react';
import './DummyClass.css';
import ClassPosts from './ClassPosts'
import getRandPosts from './utils.jsx'
import {Routes, Route, Link} from 'react-router-dom'

function DummyClass() {
    return (
        <React.Fragment>
            <div className="classPage">
                <ClassPosts title="CS 4485" postList={getRandPosts(20, 23)} />
            </div>
            <button className="classCreatePostBtn">
                <Link to="/createpost">
                    Create Post
                </Link>
            </button>
        </React.Fragment>
    );
}

export default DummyClass;