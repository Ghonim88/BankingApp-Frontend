import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

export default instance;
 

//TODO: try to store the token here so it is always available and avoid doublicate code