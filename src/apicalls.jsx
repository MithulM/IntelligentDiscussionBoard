import axios from 'axios'

const serverURL = "https://eflask-idb-be.herokuapp.com";

export const create_post = async (user_id, course_id, title, content) => {
    let response = await fetch(serverURL + 'create_post', {
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

    return await response.json();
}

export const get_all_posts = async (amt) => {
    // let response = { content: "error" };
    // await fetch(serverURL + 'get_all_posts', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: {
    //         n: amt
    //     }
    // });

    // return await response.json();

    axios.get(serverURL + "get_all_posts")
        .then(res => {
            console.log(res.data)
            return res.data;
        }).catch(err => {
            console.log("You got an Error")
            console.log(err);
        })
}

export const search = async (sen, amt) => {
    const response = await fetch(serverURL + 'search', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sentence: sen,
            n: amt
        })
    });

    return await response.json();
}

export default axios.create({
    baseURL: serverURL
});
