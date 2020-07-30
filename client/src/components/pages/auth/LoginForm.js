import React, { Component } from 'react'

import AuthService from './../../../service/AuthService'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './auth.css'


class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
        this.AuthService = new AuthService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.AuthService
            .login(this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.handleToast(`Bienvenido ${this.state.username}!`)
                this.props.history.push('/eventList')
            })
            .catch(err => {
                console.log(err.response.data.message)
                err && this.setState({ errorMessage: err.response.data.message })
            } )
    }

    render() {
        return (
            <Container as="main" className="Top">

                <Row className="back-trans">
                    <Col md={{ offset: 2, span: 8 }}>
                        <h3>Inicio de sesión</h3>

                        <hr></hr>

                        <Form onSubmit={this.handleFormSubmit} className="space">

                            <Form.Group>
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>

                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                            </Form.Group>
                            
                            {this.state.errorMessage && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}

                            <Button variant="dark" type="submit">Iniciar sesión</Button>
                        </Form>

                    </Col>
                </Row>


            </Container>
        )
    }
}

export default LoginForm