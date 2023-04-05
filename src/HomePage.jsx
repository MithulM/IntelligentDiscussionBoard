import React from 'react';
import './HomePage.css'
import getRandPosts from './utils.jsx'
import ClassPosts from './ClassPosts';

function HomePage() {

    // Create an object with professer, recommended, self, recent keys, and values for each have an id, question, and answer in lorem ipsum.
    let data = []
    let topics = ["Professor", "Your", "Recent", "Recommended"]
    for (let i = 0; i < topics.length; i++) {
        data.push({
            topic: topics[i],
            id: i,
            posts: getRandPosts(8, 11)
        }
        );
    }

    return (
        <div className="main">
            {data.map((item) => (
                <div key={item.id} className="HomePagePosts">
                    <ClassPosts title={item.topic + " Posts"} postList={item.posts} />
                </div>
            ))}
        </div>
    );
}

export default HomePage;