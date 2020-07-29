import React, { Component } from 'react'

import UserService from '../../../service/UserService'
import MotoService from '../../../service/MotoService'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: this.props.loggedInUser,
            username: this.props.loggedInUser.username,
            password: '',
            userMotorbike: this.props.loggedInUser.userMotorbike,
            motorbikes: [],
            errorMessage: ''
        }
        this.UserService = new UserService()
        this.MotoService = new MotoService()
    }


    componentDidMount = () => {
        this.MotoService
            .getAllMotorbikes()
            .then(response => this.setState({ motorbikes: response.data }))
            .catch(err => console.log(err))
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        const id = this.props.match.params.id

        this.UserService
            .editProfile(id, this.state)
            .then(response => {
                this.setState({ loggedInUser: response.data })
                this.props.handleToast(`Perfil actualizado!`)
                this.props.history.push(`/profile/${this.state.loggedInUser._id}`)
            })
            .catch(err => {
                console.log(err.response.data.message)
                err && this.setState({ errorMessage: err.response.data.message })
            })

    }

    render() {
        return (
            !this.state ? <h3>Cargando...</h3> :

                (<Container as="main">

                    <Row>
                        <Col md={{ offset: 2, span: 8 }}>
                            <h3>Editar información de usuario</h3>

                            <hr></hr>

                            <Form onSubmit={this.handleFormSubmit}>

                                <Form.Group>
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                                    <Form.Text className="text-muted">Mínimo cuatro caracteres.</Form.Text>
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>¿Qué moto tienes?</Form.Label>
                                    <select onChange={this.handleInputChange} name="userMotorbike">
                                        {this.state.motorbikes.map(moto => <option key={moto._id} value={moto._id}>{moto.brand} {moto.model}</option>)}
                                    </select>
                                </Form.Group>

                                {this.state.errorMessage && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}

                                <Button variant="dark" type="submit">Confirmar</Button>
                            </Form>

                        </Col>
                    </Row>

                </Container>)
        )
    }
}

export default EditProfile