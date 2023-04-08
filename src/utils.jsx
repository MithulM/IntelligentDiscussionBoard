export const randCont = (min, max) => {
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    const characters = 'abcdefghijklmnopqrstuvwxyz      ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export const getRandPosts = (min, max) => {
    let postList = []
    let numPosts = Math.floor(Math.random() * (max - min + 1)) + min;
    for (let i = 0; i < numPosts; i++) {
        postList.push({
            post_id: i,
            title: randCont(10, 20),
            answer: randCont(200, 400)
        })
    }
    return postList;
}

export default getRandPosts;