
import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Navigation = () => {

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" >
            <Navbar.Brand href="/">Moto Events</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Inicio</Nav.Link>
                    <Nav.Link href="/eventList">Eventos</Nav.Link>
                    <Nav.Link href="/eventList">Registro</Nav.Link>
                    <Nav.Link href="/eventList">Iniciar sesión</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation