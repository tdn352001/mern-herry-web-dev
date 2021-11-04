import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useState } from 'react'
import AlertMessage from '../layout/AlertMessage'


const LoginForm = () => {

    // Data trong form
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const { username, password } = loginForm

    // cập nhật dữ liệu khi mà nhập trong input
    const onChangeLoginForm = e => setLoginForm({
        ...loginForm,
        [e.target.name]: e.target.value
    })


    // Xử lý đoạn submit form
    const { loginUser } = useContext(AuthContext)
    const [alert, setAlert] = useState(null)


    // khi ấn submit form   
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success){
                setAlert(null)
            }else{
                setAlert({type: 'info', message: loginData.message})
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Form onSubmit={handleLogin}>
                <AlertMessage info={alert}/>
                <Form.Group>
                    <Form.Control
                        className="mt-4"
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={username}
                        onChange={onChangeLoginForm}
                        required />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        className="mt-4"
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={onChangeLoginForm}
                        required />
                </Form.Group>

                <Button className="mt-4" variant='success' type='submit'>Login</Button>
            </Form>



            <p className="mt-4">
                Don't have an account?
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-4'>
                        Register
                    </Button>
                </Link>
            </p>
        </>
    )
}



export default LoginForm
