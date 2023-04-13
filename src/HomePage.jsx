import React, { useState, useEffect } from 'react';
import './HomePage.css'
import Cookies from 'js-cookie';
import ClassPosts from './ClassPosts';
import { getAPI } from './apicalls'

function HomePage() {

    const [userPosts, setUserPosts] = useState([]);
    const [profPosts, setProfPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [recPosts, setRecPosts] = useState([]);

    const profID = 1;
    const userID = 3;

    // Create an object with professer, recommended, self, recent keys, and values for each have an id, question, and answer in lorem ipsum.
    let data = [];
    let topics = [
        {
            topic: "Professor",
            var: profPosts
        },
        {
            topic: "Your",
            var: userPosts,
        },
        {
            topic: "Recent",
            var: recentPosts
        },
        {
            topic: "Recommended",
            var: recPosts
        }
    ];
    for (let i = 0; i < topics.length; i++) {
        data.push({
            topic: topics[i].topic,
            post_id: i,
            posts: topics[i].var
        }
        );
    }

    useEffect(() => {
        getAPI("get_user_posts", [userID], setUserPosts);
    }, []);

    useEffect(() => {
        getAPI("get_recommended_posts", [], setRecPosts);
    }, []);

    useEffect(() => {
        getAPI("get_professor_posts", [profID], setProfPosts);
    }, []);

    useEffect(() => {
        getAPI("get_recent_posts", [], setRecentPosts);
    }, []);

    return (
        <div className="main">
            {data.map((item) => (
                <div key={item.post_id} className="HomePagePosts">
                    <ClassPosts title={item.topic + " Posts"} postList={item.posts} />
                </div>
            ))}
        </div>
    );
}

export default HomePage;