import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST } from '../constants/actionTypes.js';
export default (state = {isLoading:true,posts:[]}, action) => {
    switch (action.type) {

        case FETCH_POST:
            return { ...state, post: action.payload };

        case START_LOADING:
            return {...state, isLoading: true };
            case END_LOADING:
            return {...state, isLoading: false };
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case COMMENT:
            return {
                ...state, posts: state.posts.map((post) => {
                    if(post._id === action.payload._id) return action.payload;
                    return post;
                })
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages

            };
        case CREATE:
                return { ...state, posts: [...state.posts,action.payload] };
        case UPDATE:
                return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case DELETE:
                return { ...state ,posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
}