import React, { useContext } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import myLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import { AuthContext } from '../../contexts/AuthContext'

const NavbarMenu = () => {

    const {
        authState: {user: {username}},
        logoutUser
    } = useContext(AuthContext)

    const handleLogout = () => {
        logoutUser();
    }

    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Navbar.Brand className='font-weight-bolder text-white'>
                <img src={myLogo} alt='My Logo' width='32' height='32' className='mr-4' />
                TDN352001
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto' style={{marginRight: 'auto'}}>
                    <Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>
                        About
                    </Nav.Link>
                </Nav>

                <Nav style={{ marginRight: '12px' }}>
                    <Nav.Link className='font-weight-bolder text-white' disabled>
                        Welcome {username}
                    </Nav.Link>
                    <Button 
                        variant='secondary' 
                        onClick={handleLogout}
                        className='font-weight-bolder text-white'>
                        <img src={logoutIcon} alt='My Logo' width='32' height='32' className='mr-4' />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu
