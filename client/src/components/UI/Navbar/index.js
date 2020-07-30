
import React, { Component } from 'react'
import AuthService from '../../../service/AuthService'
import './navbar.css'


import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'


class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navExpanded: false
        }
        
        this.AuthService = new AuthService()
        console.log(this.props)
    }

    setNavExpanded = expanded => this.setState({ navExpanded: expanded })

    setNavClose = () => this.setState({ navExpanded: false })

    logout = () => {
        this.AuthService
            .logout()
            .then(() => {
                this.props.setTheUser(false)
                this.props.handleToast(`Hasta la próxima!`)
            })
            .catch(err => console.log(err))
    }

    render() {
        

        return (
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar" onToggle={this.setNavExpanded} expanded={this.state.navExpanded}>
                
                <Navbar.Brand>
                    <Link to="/"><img src="/parafavicon.svg" alt='logomoto' class="filter-red" />{' '} MotoEvents</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto" onClick={this.setNavClose}>
                        <Nav.Link as="span">
                            <NavLink to="/" exact activeStyle={{ color: '#E8E5E2' }}>Inicio</NavLink>
                        </Nav.Link>
                        <Nav.Link as="span">
                            <NavLink to="/eventList" exact activeStyle={{ color: '#E8E5E2' }}>Eventos</NavLink>
                        </Nav.Link>

                        {this.props.loggedInUser ?
                            (
                                <>
                                    <Nav.Link as="span">
                                        <span onClick={this.logout}>Cerrar sesión</span>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <NavLink to={`/profile/${this.props.loggedInUser._id}`} activeStyle={{ color: '#E8E5E2' }}>Perfil de {this.props.loggedInUser.username}</NavLink>
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as="span">
                                        <NavLink to="/signup" activeStyle={{ color: '#E8E5E2' }}>Registro</NavLink>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <NavLink to="/login" activeStyle={{ color: '#E8E5E2' }}>Inicio sesión</NavLink>
                                    </Nav.Link>
                                </>
                            )
                        }


                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )

    }
}

export default Navigation