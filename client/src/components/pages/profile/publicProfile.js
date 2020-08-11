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
import Spinner from '../../UI/Spinner'


class PublicProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            publicProfile: undefined,
            loggedProfile: undefined,
            showModal: false
        }

        this.UserService = new UserService()
    }

    componentDidMount = () => this.updatePublicProfile()

    updatePublicProfile = () => {

        this.UserService
            .getProfile(this.props.match.params.id)
            .then(response => this.setState({ publicProfile: response.data }))
            .catch(err => console.log(err))
        
        this.UserService
            .getProfile(this.props.loggedInUser._id)
            .then(response => this.setState({ loggedProfile: response.data }))
            .catch(err => console.log(err))

    }

    handleModal = status => this.setState({ showModal: status })

    addFriend = () => {
        const id = this.props.match.params.id

        if (!this.state.loggedProfile.friends.some(friend => friend._id === this.state.publicProfile._id)) {
            
            this.UserService
                .addFriend(id)
                .then(() => this.props.handleToast("Amigo añadido"))
                .catch(err => console.log(err))
            
            this.updatePublicProfile()
        }
    }

    render() {
        return (

            !(this.state.publicProfile && this.state.loggedProfile) ? <div className="spinner"><Spinner /></div> :


                (<div>
                    <div class="page-bg"></div>
                    <Container as='main'>

                        <Row className="profile-row">
                            <Col xs={{ span: 6 }}>
                                <h1 className="style-friend">Perfil de <span className="text-lightblue">{this.state.publicProfile.username}</span><img className="friend-motorbike" src={this.state.publicProfile.userMotorbike.image_url} alt="your friend's motorbike" /></h1>
                            </Col>
                            <Col xs={{ span: 6 }}>
                                {this.state.loggedProfile.friends.some(friend => friend._id === this.state.publicProfile._id) ? <h4 className="edit-btn-div">Sois amigos</h4> :
                                    (<div className="edit-btn-div">
                                        <button onClick={() => this.addFriend()} className="button-login-signup"><span>Añadir amigo</span></button>
                                    </div>)}
                            </Col>
                        </Row>

                        <Row className="profile-row">
                            <Col md={{ span: 10, offset: 1 }}>
                                <p className="compare-title">Comparar mi moto con la de <span className="text-lightblue">{this.state.publicProfile.username}</span></p>

                                <Col md={{ span: 10, offset: 1 }} className="card-motorbike">

                                    <Link onClick={() => this.handleModal(true)}><img className="usermotorbike-img" src={this.state.publicProfile.userMotorbike.image_url} alt="userMotorbike" /></Link>

                                    <p className="style-p">{this.state.publicProfile.userMotorbike.brand} {this.state.publicProfile.userMotorbike.model}</p>

                                    <Modal size="lg" centered show={this.state.showModal} onHide={() => this.handleModal(false)}>
                                        <Modal.Body>
                                            <Radar {...this.props} />
                                        </Modal.Body>
                                    </Modal>

                                </Col>
                            </Col>
                        </Row>

                        <hr />
                        <h3 className="style-p">Eventos a los que está apuntado</h3>
                        <Row className="profile-row">
                            <ListGroup horizontal className="scroll-x">
                                {this.state.publicProfile.events.map(event =>
                                    <Link to={`/eventDetails/${event._id}`}>
                                        <ListGroup.Item key={event._id} className="transparent">
                                            <Col xs={{ span: 12 }} >
                                                <Col>
                                                    <img src={event.image_url} alt={event.name} className="event-img" />
                                                </Col>
                                                <Col>
                                                    <p className="name-event">{event.name}</p>
                                                </Col>
                                            </Col>
                                        </ListGroup.Item>
                                    </Link>)}
                            </ListGroup>

                        </Row>
                    </Container>
                </div>)

        )
    }

}

export default PublicProfile