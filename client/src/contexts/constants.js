export const apiUrl = process.env.NODE_ENV !== 'production' 
        ? 'http://localhost:5000' : 'https://frozen-crag-62359.herokuapp.com'


export const LOCAL_STORAGE_TOKEN_NAME = 'user_token'

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS'
export const DELETE_POST = 'DELETE_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const POSTS_LOADED_FAILED = 'POSTS_LOADED_FAILED'
export const FIND_POST = 'FIND_POST'