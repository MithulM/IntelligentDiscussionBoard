import React, { useState, useEffect, useRef } from 'react';
import '../styles/DummyClass.css';
import ClassPosts from '../components/ClassPosts'
import ModalButton from '../components/ModalButton';
import { getAPI, postAPI } from '../apicalls'
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from '../hooks/useAuth';
import Modal from "../components/Modal";

function DummyClass({ courseName, classID }) {
    const search = useRef("");
    const [posts, setPosts] = useState([]);
    const [searchQ, setSearchQ] = useState([]);
    const [isCreate, setCreate] = useState(false);
    const [isHelpOpen, setHelpOpen] = useState(false);
    const [similarPosts, setSimilarPost] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [groupsList, setGroupList] = useState([]);
    const [GPTResponse, setGPTResponse] = useState("");
    const postsPerPage = 100;

    const { auth } = useAuth();

    const setVar = (blah) => {
        console.log(blah);
    }
    useEffect(() => {
        const getGroups = async () => {

            const seen = new Set();
            const newGroups = [];
            for (let i = 0; i < posts.length; i++) {
                if (!seen.has(posts[i].post_id)) {
                    const group = await getAPI("get_related_posts", [posts[i].post_id, classID, postsPerPage], setVar);
                    newGroups.push(group);
                    for (let j = 0; j < group.length; j++) {
                        seen.add(group[j].post_id);
                    }
                }
            }
            setGroupList(newGroups);
        }
        getGroups();
    }, [posts]);

    useEffect(() => {
        getAPI("get_all_posts", [classID, postsPerPage], setPosts);
    }, [classID]);

    useEffect(() => {
        getAPI("search_with_title_content", [classID, content || "X", title || "X", 10], setSimilarPost);
    }, [title, content]);

    useEffect(() => {
        if (searchQ.length === 0) {
            getAPI("get_all_posts", [classID, postsPerPage], setPosts);
        }
    }, [searchQ])

    const setSearch = (event, classID) => {
        event.preventDefault();
        const { value } = search.current;
        if (value.length != 0) {
            getAPI("search", [classID, value, postsPerPage], setPosts);
        } else {
            getAPI("get_all_posts", [classID, postsPerPage], setPosts);
        }
    }

    const refresh = () => {
        getAPI("get_all_posts", [classID, postsPerPage], setPosts);
    }
    const quickHelpContent = useRef(null);

    const createPost = async () => {
        const response =
            await postAPI("create_post", {
                user_id: auth.user_id,
                course_id: classID,
                post_title: title,
                post_content: content
            }, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${auth.accessToken}`
                },
                withCredentials: true,
            });
        getAPI("get_all_posts", [classID, postsPerPage], setPosts);
        console.log(response);
    }

    const handleQuickHelpSubmit = async () => {
        const response = await postAPI("get_quick_answer", {
            course_id: classID,
            content: quickHelpContent.current.value,
        }, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${auth.accessToken}`
            },
            withCredentials: true,
        });
        setGPTResponse(response);
    };

    const handleQuickHelpClose = async () => {
        setGPTResponse("");
        setHelpOpen(false);
    };

    return (
        <React.Fragment>
            <div className="classPage classbody">
                <div className="jumbotron classbody">
                    <h1>{courseName}</h1>
                </div>
                <div className="container-fluid classbody">
                    <div className="search">
                        <button onClick={() => setHelpOpen(true)} className="searchButton" >Quick Help</button>
                        <Modal open={isHelpOpen} onClose={handleQuickHelpClose} title="Quick Help" onConfirm={handleQuickHelpSubmit}>
                            {(GPTResponse) ?
                                (<div className="quickHelpAnswer" >{GPTResponse}</div>) :
                                (<form>
                                    <label htmlFor="content">Content:</label>
                                    <textarea
                                        id="content"
                                        ref={quickHelpContent}
                                        style={{ width: "100%", height: "200px" }}
                                    />
                                </form>)}
                        </Modal>
                        <ModalButton title="Create Post" className="searchButton" isOpen={isCreate} buttonName="Create post" setFunc={setCreate} onConfirm={createPost}>
                            <div className="create-post-container">
                                <form className="createPostForm">
                                    <label htmlFor="title">Title:</label>
                                    <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} style={{ width: "100%" }} />
                                    <br />
                                    <label htmlFor="content">Content:</label>
                                    <textarea
                                        id="content"
                                        onChange={(e) => setContent(e.target.value)}
                                        style={{ width: "100%", height: "200px" }}
                                    />
                                </form>
                                <div className="similar-post">
                                    <ClassPosts title="Similar Posts" postList={similarPosts} />
                                </div>
                            </div>
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
                        <button onClick={refresh}><FontAwesomeIcon className="icon refresh-icon" icon={faArrowsRotate} /></button>
                    </div>
                    <div className="postsList">
                        {groupsList.map((group) => {
                            console.log("group: ", group);
                            return (
                                <div className="relatedPosts">
                                    <ClassPosts title={"​"} postList={[...group].reverse()} />
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default DummyClass;
