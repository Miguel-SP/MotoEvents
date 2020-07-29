import React, { Component } from 'react'
import './profile.css'

import UserService from './../../../service/UserService'

import Radar from './../../UI/RadarGraphic'

import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import Modal from 'react-bootstrap/esm/Modal'
import { Link } from 'react-router-dom'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: undefined,
            showModal: false,
        }

        this.UserService = new UserService()
    }

    componentDidMount = () => {
        const id= this.props.match.params.id
        this.UserService
            .getProfile(id)
            .then(response => {
                this.setState({ profile: response.data })
            })
            .catch(err => console.log(err))

    }

    handleModal = status => this.setState({ showModal: status })

    render() {
        return (

            !this.state.profile ? <h3>Cargando...</h3> :


                (<Container as='main'>

                            <h1>¡Hola, {this.props.loggedInUser.username}!</h1>
                            <div className="edit-btn-div">
                                <Link className="create-btn btn btn-primary" to={`/profile/edit/${this.props.loggedInUser._id}`}>Editar mi perfil</Link>
                            </div>

                            <Row>

                                <Col className="events-col" md={{ span: 4 }}>
                                    <h3>Eventos a los que voy</h3>

                                    <ListGroup>
                                        {this.state.profile.events.map(event =>
                                            <Link to={`/eventDetails/${event._id}`}><ListGroup.Item key={event._id}>{event.name}</ListGroup.Item></Link>)}
                                    </ListGroup>

                                </Col>

                                <Col md={{ span: 5, offset: 1 }}>
                                    <h3>Mi moto</h3>

                                    <Link onClick={() => this.handleModal(true)}><img className="usermotorbike-img" src={this.state.profile.userMotorbike.image_url} alt="userMotorbike" /></Link>

                                    <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                                        <Modal.Body>
                                            <Radar {...this.props} />
                                        </Modal.Body>
                                    </Modal>

                                </Col>

                                <Col md={{ span: 2 }}>
                                    <h3>Mis amigos</h3>

                                    <ListGroup>
                                        {this.state.profile.friends.map(friend =>
                                            <Link to={`/profile/public/${friend._id}`}><ListGroup.Item key={friend.id}>{friend.username}</ListGroup.Item></Link>)}
                                    </ListGroup>

                                </Col>

                            </Row>

                </Container>)

        )
    }

}

export default Profile