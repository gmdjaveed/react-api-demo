import axios from "axios";

/*
https://axios-http.com/docs/api_intro:

Ex:
axios(config)
// Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});*/

//https://jsonplaceholder.typicode.com/posts ,
const jsonPlaceholderBaseUrl = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: jsonPlaceholderBaseUrl,
});

const getPosts = () => api.get("/posts");
const deletePost = (id) => api.delete(`/posts/${id}`);
const createPost = (post) => api.post("/posts", post);
const updatePost = (id, post) => api.put(`/posts/${id}`, post);

export { getPosts, deletePost, createPost, updatePost };
