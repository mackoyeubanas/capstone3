/* header component */
import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import UserServiceApi from '../api/UserServiceApi';

class Header extends Component {
    render() {
        const isUserLoggedIn = UserServiceApi.isUserLoggedIn();
        const isUserStaff = UserServiceApi.isUserStaff();
        return (
            <Navbar bg="info" variant="ligth" expand="lg" className="me-auto">
                <Navbar.Brand href="/" id="txt-color">Pahatid Express</Navbar.Brand>
                <Navbar.Toggle  />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/locations">Locations</Nav.Link>
                    {isUserLoggedIn &&
                        <>
                            {!isUserStaff && <Nav.Link href="/myprofile">My Profile</Nav.Link>}
                            {!isUserStaff && <Nav.Link href="/mybookings">My Bookings</Nav.Link>}
                            {!isUserStaff && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
                            {isUserStaff && <Nav.Link href="/staff">Staff Dashboard</Nav.Link>}
                        </>
                    }
                    {isUserLoggedIn &&
                        <NavItem className="me-auto">
                            <Nav.Link onClick={UserServiceApi.logout}>Logout</Nav.Link>
                        </NavItem>
                    }
                    </Nav>
                    <Nav>
                        {!isUserLoggedIn &&
                            <>
                                <Nav.Link href="/signup">Sign Up</Nav.Link>
                                <Nav.Link href="/login">Log in</Nav.Link>
                            </>
                        }
                    </Nav>
               </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;
