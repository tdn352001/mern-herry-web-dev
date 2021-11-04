import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'



const RegisterForm = () => {

    // Data trong form
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })

    const { username, password, confirmPassword } = registerForm

    // cập nhật dữ liệu khi mà nhập trong input
    const onChangeRegisterForm = e => setRegisterForm({
        ...registerForm,
        [e.target.name]: e.target.value
    })


    // Xử lý đoạn submit form
    const { registerUser } = useContext(AuthContext)
    const [alert, setAlert] = useState(null)


    // khi ấn submit form   
    const handleRegister = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setAlert({type: 'danger', message: 'Password do not match'})
            setTimeout(() => setAlert(null), 5000) 
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success){
                setAlert({ type: 'danger', message: registerData.message })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form onSubmit={handleRegister}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        className="mt-4"
                        type='text'
                        value={username}
                        onChange={onChangeRegisterForm}
                        placeholder='Username'
                        name='username'
                        required />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        className="mt-4"
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={onChangeRegisterForm}
                        name='password'
                        required />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        className="mt-4"
                        type='password'
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        required />
                </Form.Group>

                <Button className="mt-4" variant='success' type='submit'>Register</Button>
            </Form>

            <p className="mt-4">
                Already have an account?
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-4'>
                        Login
                    </Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm