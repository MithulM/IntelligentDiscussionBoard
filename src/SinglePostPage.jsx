import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import api from './apicalls.jsx';

function SinglePostPage() {
    const [post, setPost] = useState("");
    let { postId } = useParams();
    console.log(postId);

    // useEffect(() => {

    //     async function fetchPost() {
    //         try {
    //             const response = await api.get(`https://eflask-idb-be.herokuapp.com/get_specific_post/data?post_id=${postId}`);
    //             console.log(response.data);
    //             setPost(post);
    //         } catch (err) {
    //             if (err.response) {
    //                 console.log(err.response.data);
    //                 console.log(err.response.status);
    //                 console.log(err.response.headers);
    //             } else {
    //                 console.log(`Error: ${err.message}`);
    //             }
    //         }
    //     }


    //     fetchPost();
    // }, []);

    return (
        <div>
            <h1>
                {postId}
            </h1>
        </div>

    );
}

export default SinglePostPage;