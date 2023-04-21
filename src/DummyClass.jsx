import React, { useState, useEffect, useRef } from 'react';
import './DummyClass.css';
import ClassPosts from './ClassPosts'
import getRandPosts from './utils.jsx'
import { Link } from 'react-router-dom'
import { getAPI } from './apicalls'

function DummyClass({ courseName, classID }) {
    const search = useRef("");
    const [posts, setPosts] = useState([]);
    const postsPerPage = 100;

    useEffect(() => {
        getAPI("get_all_posts", [classID, postsPerPage], setPosts);
    }, [classID]);

    const setSearch = (event, classID) => {
        event.preventDefault()
        const { value } = search.current;
        if (value.length != 0) {
            getAPI("search", [value], setPosts);
        } else {
            setCurrentClassID(classID);
        }
    }

    return (
        <React.Fragment>
            <div className="classPage">
                <div className="search">
                        <input className="searchBar"
                            ref={search}
                            type="search"
                            placeholder="Search"
                            rows="1"
                            cols="500"
                        />
                        <button onClick={(event) => setSearch(event, classID)}className="searchButton" type="submit">search</button>
                </div>
                <div className="postsList">
                    <div className="posts">
                        <ClassPosts title={courseName} postList={posts} />
                    </div>
                    <button className="classCreatePostBtn">
                        <Link to="/createpost">
                            Create Post
                        </Link>
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DummyClass;
