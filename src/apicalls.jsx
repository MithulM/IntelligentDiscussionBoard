import axios from 'axios'

const serverURL = "https://eflask-idb-be.herokuapp.com";

export default axios.create({
    baseURL: serverURL
});
