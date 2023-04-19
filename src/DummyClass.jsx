import React, { useState, useEffect } from 'react';
import './DummyClass.css';
import ClassPosts from './ClassPosts'
import getRandPosts from './utils.jsx'
import { Link } from 'react-router-dom'
import api from './apicalls'

function DummyClass({ courseName }) {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const postsPerPage = 10;

    async function fetchPosts() {
        try {
            const response = await api.get(`/get_all_posts/${postsPerPage}`);
            setPosts(response.data);
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


    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        async function fetchSearchedPosts() {
            try {
                const response = await api.get(`/search/${search}`);
                console.log(`Posts for ${search}`);
                console.log(response.data);
                setPosts(response.data);
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

        if (search.length != 0) {
            fetchSearchedPosts();
        } else {
            fetchPosts();
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