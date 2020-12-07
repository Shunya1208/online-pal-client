import axios from "axios";

const instance = axios.create({
    baseURL: "https://online-pal1208.herokuapp.com/api/v1/messages"
})

export default instance;