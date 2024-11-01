import axios from 'axios';

const API = axios.create({ baseURL: process.env.BASE_URL || "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (post) => API.post('/posts', post);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const fetchPost = (id) => API.get(`/posts/${id}`);

export const comment = (value,id) => API.post(`/posts/${id}/commentPost`,{value});


export const signin = (formData) => API.post('/users/signin', formData); 
export const signup = (formData) => API.post('/users/signup', formData); 
