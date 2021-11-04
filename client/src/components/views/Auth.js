import React, { useContext } from 'react'
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner'


const Auth = ({ authRoute }) => {

    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)

    let body

    if (authLoading) {
        body =(
            <div className="d-flex justify-content mt4">
                <Spinner animation='border' variant='info'/>
            </div>
        )
    } else if(isAuthenticated) {
        console.log('isAuthenticated' , isAuthenticated)
        return <Redirect to='/dashboard'/>
    }else{
        body = (<>
            {authRoute === 'login' && <LoginForm />}
            {authRoute === 'register' && <RegisterForm />}
        </>)
    }


    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Learn Mern</h1>
                    <h4>Nothings is impossible</h4>
                    {body}
                </div>
            </div>
        </div>
    )
}

export default Auth
