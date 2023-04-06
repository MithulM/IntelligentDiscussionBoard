export const createPost = async (user_id, course_id, title, content) => {
    const response = await fetch('https://eflask-idb-be.herokuapp.com/create_post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user_id,
            course_id: course_id,
            title: title,
            content: content
        })
    });

    return response;
}

export default createPost;
