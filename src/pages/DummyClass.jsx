import React, { useState, useEffect, useRef } from 'react';
import '../styles/DummyClass.css';
import ClassPosts from '../components/ClassPosts'
import ModalButton from '../components/ModalButton';
import { getAPI } from '../apicalls'

function DummyClass({ courseName, classID }) {
    const search = useRef("");
    const [posts, setPosts] = useState([]);
    const [searchQ, setSearchQ] = useState([]);
    const [isCreate, setCreate] = useState(false);
    const postsPerPage = 100;

    useEffect(() => {
        getAPI("get_all_posts", [classID, postsPerPage], setPosts);
    }, [classID]);

    useEffect(() => {
        if (searchQ.length === 0) {
            getAPI("get_all_posts", [classID, postsPerPage], setPosts);
        }
    }, [searchQ])

    const setSearch = (event, classID) => {
        event.preventDefault();
        const { value } = search.current;
        if (value.length != 0) {
            getAPI("search", [value], setPosts);
        } else {
            getAPI("get_all_posts", [classID, postsPerPage], setPosts);
        }
    }

    return (
        <React.Fragment>
            <div className="classPage">
                <div className="search">
                    <ModalButton title="Create Post" className="classCreatePostBtn" isOpen={isCreate} buttonName="Create post" setFunc={setCreate}>
                    </ModalButton>
                    <input className="searchBar"
                        ref={search}
                        type="search"
                        placeholder="Search"
                        rows="1"
                        cols="500"
                        onChange={(e) => setSearchQ(e.target.value)}
                    />
                    <button onClick={(event) => setSearch(event, classID)} className="searchButton" type="submit">search</button>
                </div>
                <div className="postsList">
                    <div className="posts">
                        <ClassPosts title={courseName} postList={[...posts].reverse()} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DummyClass;
