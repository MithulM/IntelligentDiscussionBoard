import React from 'react';
import './createPost.css'
import './HomePage.css'

function CreatePost() {
    return (
        <div>
            <html>
            <head>
            <title>Title of the document</title>
            </head>
        <body>
            <form action="/createpost" method="post">
            <textarea id="text" name="text" placeholder="Title" rows="1" cols="1"></textarea>
            <br>
            </br>
            <textarea id="text" name="text" placeholder="Enter text" rows="12" cols="50"></textarea>
            <br/>
            <li class="button">
            <button type="submit">Post</button>
            </li>
            </form>
        </body>
            </html>
      </div>
    )

}

export default CreatePost;