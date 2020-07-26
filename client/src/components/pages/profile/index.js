import React, { Component } from 'react'
import './profile.css'

import UserService from './../../../service/UserService'

import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/esm/ListGroup'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: undefined
        }

        this.UserService = new UserService()

    }

    componentDidMount = () => {
        const id = this.props.match.params.id

        this.UserService
            .getProfile(id)
            .then(response => this.setState({ profile: response.data }))
            .catch(err => console.log(err))
    }


    // unjoinEvent = (key) => {                         No nos funciona
    //     const id = this.props.match.params.id

    //     this.UserService
    //         .unjoinEvent(id, key)
    //         .catch(err => console.log(err))
    // }

    render() {

        return (

            !this.state.profile ? <h3>Cargando...</h3> :

                (<Container as='main'>
                    <h1>¡Hola, {this.props.loggedInUser.username}!</h1>
                    <div className="edit-btn-div">
                        <Link className="join-btn btn btn-light edit-btn" to='#'>Editar mi perfil</Link>
                    </div>


                    <Row>
                        <Col className="events-col" md={{ span: 4 }}>
                            <h3>Eventos a los que voy</h3>
                            <ListGroup>
                                {this.state.profile.events.map(event => (
                                    <ListGroup.Item key={event._id}>{event.name}<Link className="delete-btn btn btn-danger" onClick={(key) => this.unjoinEvent(key)} to={`/profile/${this.props.loggedInUser._id}`}>X</Link></ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col md={{ span: 7, offset: 1 }}>
                            <h3>Mi moto</h3>
                            <p>Modal con gráfico de nivo.rocks</p>
                            {this.props.loggedInUser.motorbike}
                        </Col>

                    </Row>

                </Container>)

        )
    }

}

export default Profile