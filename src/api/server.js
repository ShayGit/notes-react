import axios from "axios";

const  BASE_URL = "http://18.192.69.125:80";

const instance = axios.create({
  baseURL: BASE_URL,
});


export default instance;
