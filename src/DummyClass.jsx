import React, { useState, useEffect } from 'react';
import './DummyClass.css';
import ClassPosts from './ClassPosts'
import getRandPosts from './utils.jsx'
import { Link } from 'react-router-dom'
import {getAPI} from './apicalls'

function DummyClass({ courseName }) {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const postsPerPage = 10;

    useEffect(() => {
        getAPI("get_all_posts", [postsPerPage], setPosts);
    }, []);

    useEffect(() => {
        if (search.length != 0) {
            getAPI("search", [search], setPosts);
        } else {
            getAPI("get_all_posts", [postsPerPage], setPosts);
        }
    }, [search])

    return (
        <React.Fragment>
            <div className="classPage">
                <div className="search">
                    <input className="searchBar"
                        type="search"
                        placeholder="Search"
                        rows="1"
                        cols="500"
                        defaultValue={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="searchButton" type="submit">search</button>
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