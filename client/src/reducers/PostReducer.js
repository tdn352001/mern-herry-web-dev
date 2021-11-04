import { POSTS_LOADED_SUCCESS, UPDATE_POST, DELETE_POST, POSTS_LOADED_FAILED, ADD_POST, FIND_POST} from '../contexts/constants'

const PostReducer = (state, action) => {
    console.log(state, action)
    const {type, payload} = action
    switch (type) {
        case POSTS_LOADED_SUCCESS:
            return {
                ...state,
                posts: payload,
                postsLoading: false,
            }
        case POSTS_LOADED_FAILED:
            return {
                ...state,
                postsLoading: false,
            }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, payload],
            }
        case UPDATE_POST:
            const newPosts = state.posts.map(post => post._id === payload._id ? payload : post)
            return {
                ...state,
                posts: newPosts,
                post: null,
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload)
            } 
            case FIND_POST:
                return {
                    ...state,
                    post: payload,
                }
        default: 
            return state
    }
   
}

export default PostReducer
