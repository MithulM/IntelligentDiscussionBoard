import axios from 'axios'

const serverURL = "https://eflask-idb-be.herokuapp.com";
// serverURL = "localhost:5000"

export async function getAPI(apiCall, params, setVar, config = {}) {
    try {
        let URLparams = "";
        for (let i = 0; i < params.length; i++) {
            URLparams += "/" + String(params[i]);
        }
        console.log(serverURL + "/" + apiCall + URLparams, config);
        const response = await axios.get(serverURL + "/" + apiCall + URLparams, config);
        console.log(apiCall, response.data);
        setVar(response.data);
        return response.data;
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(apiCall + ` Error: ${err.message}`);
        }
    }
}

export async function postAPI(apiCall, params, headers) {
    try {
        console.log(serverURL + "/" + apiCall, params, headers);
        const response = await axios.post(serverURL + "/" + apiCall, params, headers);
        console.log("Post: ", response.data);
        return response.data;
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(apiCall + ` Error: ${err.message}`);
        }
    }
}

export async function putAPI(apiCall, params, headers) {
    try {
        console.log(serverURL + "/" + apiCall, params, headers);
        const response = await axios.put(serverURL + "/" + apiCall, params, headers);
        console.log("Edit: ", response.data);
        return response.data;
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(apiCall + ` Error: ${err.message}`);
        }
    }
}

export async function deleteAPI(apiCall, params, headers) {
    try {
        const response = await axios.delete(serverURL + "/" + apiCall, {
            data: params,
            headers: headers
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(apiCall + ` Error: ${err.message}`);
        }
    }
}

export default axios.create({
    baseURL: serverURL
});
