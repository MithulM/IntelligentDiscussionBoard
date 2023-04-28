import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css'
import ClassPosts from '../components/ClassPosts';
import { getAPI } from '../apicalls'
import useAuth from '../hooks/useAuth';

function HomePage() {

  const { auth } = useAuth();

  const [userPosts, setUserPosts] = useState([]);
  const [profPosts, setProfPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [recPosts, setRecPosts] = useState([]);

  let data = [];
  let topics = [
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

  if (auth.role !== "professor") {
    topics.splice(1, 0, {
      topic: "Professor",
      var: profPosts,
    });
  }

  for (let i = 0; i < topics.length; i++) {
    data.push({
      topic: topics[i].topic,
      topic_id: i,
      posts: topics[i].var,
    });
  }

  useEffect(() => {
    getAPI("get_user_posts", [auth.user_id], setUserPosts);
  }, []);

  useEffect(() => {
    getAPI("get_recommended_posts", [], setRecPosts);
  }, []);


  useEffect(() => {
    getAPI("get_recent_posts", [], setRecentPosts);
  }, []);

  useEffect(() => {
    getAPI("get_student_professor_posts", [auth.user_id], setProfPosts);
  }, []);

  return (
    <div>
      <div className="jumbotron">
        <h1>Welcome {auth.user}. Posts From Your Classes</h1>
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
