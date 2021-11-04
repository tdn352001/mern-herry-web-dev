import { createContext, useReducer, useState } from 'react'
import axios from 'axios'
import PostReducer from '../reducers/PostReducer'

import {
    apiUrl,
    POSTS_LOADED_SUCCESS,
    POSTS_LOADED_FAILED,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST,
} from './constants'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {

    const [postState, dispatch] = useReducer(PostReducer, {
        post: null,
        posts: [],
        postsLoading: true,
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(true)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    })

    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post`)
            if (response.data.success) {
                dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
            }
        } catch (error) {
            dispatch({ type: POSTS_LOADED_FAILED })
            return { success: false, message: error.message }
        }
    }

    const addPost = async (post) => {
        try {

            const response = await axios.post(`${apiUrl}/post/create`, post)
            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post })
                return response.data
            }

        } catch (error) {
            return error.response ? error.response.data : { success: false, message: error.message }
        }
    }


    const updatePost = async (post) => {
        const response = await axios.put(`${apiUrl}/post/${post._id}`, post)
        try {
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.updatedPost })
                return response.data
            }
        } catch (error) {
            if (error.response)
                console.log(error.response.data)
            return { success: false, message: error.message }
        }
    }


    const deletePost = async (id) => {
        const response = await axios.delete(`${apiUrl}/post/${id}`)
        try {
            if (response.data.success) {
                dispatch({ type: DELETE_POST, payload: id })
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }


    const findPostById = (id) => {
        const post = postState.posts.find(post => post._id === id)
        dispatch({ type: FIND_POST, payload: post })
    }

    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        updatePost,
        findPostById,
    }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider