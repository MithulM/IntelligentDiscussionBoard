import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css'
import ClassPosts from '../components/ClassPosts';
import { getAPI } from '../apicalls'

function HomePage() {
  const [userPosts, setUserPosts] = useState([]);
  const [profPosts, setProfPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [recPosts, setRecPosts] = useState([]);

  const profID = 1;
  const userID = 3;

  let data = [];
  let topics = [
    {
      topic: "Professor",
      var: profPosts,
    },
    {
      topic: "Your",
      var: userPosts,
    },
    {
      topic: "Recent",
      var: recentPosts,
    },
    {
      topic: "Recommended",
      var: recPosts,
    },
  ];
  for (let i = 0; i < topics.length; i++) {
    data.push({
      topic: topics[i].topic,
      topic_id: i,
      posts: topics[i].var,
    });
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
    <div>
      <div className="jumbotron">
        <h1>Posts From Your Community</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          {data.map((item) => (
            <div key={item.topic_id} className="col-md-6 HomePagePosts">
              <ClassPosts title={item.topic + " Posts"} postList={item.posts} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
