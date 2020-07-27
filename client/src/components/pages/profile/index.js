import React, { Component } from 'react'
import './profile.css'

import UserService from './../../../service/UserService'
import EventService from './../../../service/EventService'

import Radar from './../../UI/RadarGraphic'

import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/esm/Modal'
import { Link } from 'react-router-dom'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: undefined,
            showModal: false
        }

        this.UserService = new UserService()
        this.EventService = new EventService()


    }

    componentDidMount = () => {
        const id = this.props.match.params.id

        this.UserService
            .getProfile(id)
            .then(response => this.setState({ profile: response.data }))
            .catch(err => console.log(err))
    }

    handleModal = status => this.setState({ showModal: status })



    unjoinEvent = e => {                               // Cómo pasar el id del evento sobre el que estamos clickando? e.target??
        const id = this.props.match.params.id
        const idEvent = e.target.getAtributte('key')

        this.UserService
            .unjoinEvent(id, idEvent)
            .catch(err => console.log(err))

        this.EventService
            .userUnjoin(id, idEvent)
            .catch(err => console.log(err))
    }


    render() {

        return (

            !this.state.profile ? <h3>Cargando...</h3> :

                (<Container as='main'>
                    <h1>¡Hola, {this.props.loggedInUser.username}!</h1>
                    <div className="edit-btn-div">
                        <Link className="create-btn btn btn-primary" to='#'>Editar mi perfil</Link>
                    </div>


                    <Row>

                        <Col className="events-col" md={{ span: 4 }}>
                            <h3>Eventos a los que voy</h3>

                            <ListGroup>
                                {this.state.profile.events.map(event =>
                                    <ListGroup.Item key={event._id}>{event.name}
                                        <Button className="delete-btn btn btn-danger" onClick={() => this.unjoinEvent()}>X</Button>
                                    </ListGroup.Item>)}
                            </ListGroup>

                        </Col>

                        <Col md={{ span: 7, offset: 1 }}>
                            <h3>Mi moto</h3>

                            {this.props.loggedInUser.motorbike}
                            <Button className="create-btn btn btn-primary" onClick={() => this.handleModal(true)}>Marca y modelo</Button>

                                <Modal size="md" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                                    <Modal.Body>
                                    <Radar {...this.props}/>
                                    </Modal.Body>
                                </Modal>

                        </Col>

                    </Row>

                </Container>)

        )
    }

}

export default Profile