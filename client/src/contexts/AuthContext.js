import { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { authReducer, SET_AUTH } from '../reducers/AuthReducer'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import setAuthToken from '../utils/SetAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    

    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    const loadUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if(response.data.success){
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {
            logoutUser()
        }
    }

    useEffect(() => loadUser(), [])

    const loginUser = async userForm => {
        try {

            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken)
            }
            await loadUser()

            return response.data

        } catch (error) {
            if (error.response.data)
                return error.response.data

            return { success: false, message: error.message }
        }
    }

    const registerUser = async registerForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, registerForm)
            if(response.data.success){
                if (response.data.success) {
                    localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,
                        response.data.accessToken)
                }
            }
            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data)
                return error.response.data

            return { success: false, message: error.message }
        }
    }

    const logoutUser = async ()=>{
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        setAuthToken(null)
        dispatch({
            type: SET_AUTH,
            payload: {
                isAuthenticated: false,
                user: null,
            }
        })
    }

    const authContextData = { loginUser, registerUser, logoutUser, authState}

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider