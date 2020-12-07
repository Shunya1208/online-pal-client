import axios from "axios";

const instance = axios.create({
    baseURL: "https://lit-chamber-33999.herokuapp.com/api/v1/messages"
})

export default instance;