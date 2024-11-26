import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://flatquest-p1pn.onrender.com/api",
    withCredentials: true,
});

export default apiRequest;