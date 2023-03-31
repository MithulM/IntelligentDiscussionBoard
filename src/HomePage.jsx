import React from 'react';
import './HomePage.css'

function HomePage() {

    const randCont = (min, max) => {
        const length = Math.floor(Math.random() * (max - min + 1)) + min;
        const characters = 'abcdefghijklmnopqrstuvwxyz      ';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    // Create an object with professer, recommended, self, recent keys, and values for each have an id, question, and answer in lorem ipsum.
    let data = []
    let topics = ["Professor", "Your", "Recent", "Recommended"]
    for (let i = 0; i < topics.length; i++) {
        let postList = []
        let numPosts = Math.floor(Math.random() * 3) + 8;
        for (let j = 0; j < numPosts; j++) {
            postList.push({
                id: j,
                question: randCont(10, 20),
                answer: randCont(200, 400)
            })
        }
        data.push({
            topic: topics[i],
            id: i,
            posts: postList
        }
        );
    }

    return (
        <div className="main">
            {data.map((item) => (<div id={item.id} className="HomePageConvenience">
                <div>
                    <h1>{item.topic} posts</h1>
                    <div className="posts">
                        {
                            item.posts.map((item2) => (
                                <div id={item2.id} className="post">
                                    <h2>{item2.question}?</h2>
                                    <p>{item2.answer}</p>
                                </div>))
                        }
                    </div>
                </div>
            </div>))}
        </div>
    );
}

export default HomePage;