import React, { useState, useEffect } from 'react';
import './DummyClass.css';
import ClassPosts from './ClassPosts'
import getRandPosts from './utils.jsx'
import { Routes, Route, Link } from 'react-router-dom'
import api from './apicalls'
import { get_all_posts } from './apicalls.jsx';

function DummyClass({ courseName }) {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await api.get('/get_all_posts');
                let postList = [];
                for (let key in response.data) {
                    postList[key] = response.data[key];
                }
                for (let i = 0; i < postList.length; i++)
                    console.log(postList[i]);
                setPosts(postList);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        }


        fetchPosts();
    }, []);

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