import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function SigninRoute({ authed, Component }) {
    return authed ? (
        <Component />
    ) : (
        <Navigate to="/signin" />
    );
}

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
            answer_count: 10,
            course: {
                course_id: 3,
                course_number: "CS 4337",
                course_title: "Computer Algorithms",
            },
            coures_id: 3,
            post_id: i,
            post_content: randCont(200, 400),
            post_title: randCont(10, 20),
            time_created: "Wed, 29 Mar 2023 11:06:20 GMT",
            user: {
                username: "Testsubject",
                user_id: Math.floor(Math.random() * (max - min + 1)) + min,
                email: "Fname.Lname@domain.com"
            },
            user_id: 3
        })
    }
    return postList;
}

export function getTimeAgoString(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();

    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds === 1) {
        return `1 second ago`;
    } else if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes === 1) {
        return `1 minute ago`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours === 1) {
        return `1 hour ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
        return `1 day ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    } else if (diffInWeeks === 1) {
        return `1 week ago`;
    } else if (diffInWeeks < 4) {
        return `${diffInWeeks} weeks ago`;
    } else if (diffInMonths === 1) {
        return `1 month ago`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths} months ago`;
    } else if (diffInYears === 1) {
        return `1 year ago`;
    } else {
        return `${diffInYears} years ago`;
    }
}

export function checkAuth() {
    const auth = Cookies.get("name") !== undefined && Cookies.get("password") !== undefined;
    console.log("auth", auth)
    return (auth);
}

export default getRandPosts;