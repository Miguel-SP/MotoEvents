
import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'


const Navigation = () => {

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" >
            <Navbar.Brand><Link to="/">Moto Events</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as="span">
                        <NavLink to="/" exact activeStyle={{ color: 'white' }}>Inicio</NavLink>
                    </Nav.Link>
                    <Nav.Link as="span">
                        <NavLink to="/eventList" exact activeStyle={{ color: 'white' }}>Eventos</NavLink>
                    </Nav.Link>
                    <Nav.Link as="span">
                        <NavLink to="/signup" exact activeStyle={{ color: 'white' }}>Registro</NavLink>
                    </Nav.Link>
                    <Nav.Link as="span">
                        <NavLink to="/login" exact activeStyle={{ color: 'white' }}>Iniciar sesión</NavLink>
                    </Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation