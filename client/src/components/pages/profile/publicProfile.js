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
            profile: undefined,
            showModal: false,
        }

        this.UserService = new UserService()
    }

    componentDidMount = () => {

        this.UserService
            .getProfile(this.props.match.params.id)
            .then(response => {
                this.setState({ profile: response.data })
            })
            .catch(err => console.log(err))

    }

    handleModal = status => this.setState({ showModal: status })

    addFriend = () => {
        const id = this.props.match.params.id
        this.UserService
            .addFriend(id)
            .then(() => this.props.handleToast("Amigo añadido"))
            .catch(err => console.log(err))
    }

    render() {
        return (

            !this.state.profile ? <div className="spinner"><Spinner /></div> :


                (<div className="special">
                    <div class="page-bg"></div>
                    <Container as='main'>
                        
                        <Row className="profile-1">
                        <Col xs={{span: 6}}>
                            <h1 className="style-friend">Perfil de <span className="text-lightblue">{this.state.profile.username}</span><img className="friend-motorbike" src={this.state.profile.userMotorbike.image_url} alt="your friend's motorbike" /></h1>
                        </Col>
                        <Col xs={{span: 6}}>
                        {this.props.loggedInUser.friends.some(friend => friend === this.state.profile._id) ? <h3 className="edit-btn-div">Sois amigos <img src="/corazon_negro.svg" alt="corazon negro" className="heart" /></h3> :
                            (<div className="edit-btn-div">
                                <Link className="create-btn btn btn-primary" onClick={() => this.addFriend()}>Añadir a amigos</Link>
                            </div>)}
                        </Col>
                        </Row>
                        <Row className="profile-1">

                            <Col md={{span:6, offset: 3}}>
                            <h3 className="style-events name-moto">Comparar mi moto con la de <span className="text-lightblue">{this.state.profile.username}</span></h3>
                            
                            <Col md={{ span: 10, offset: 1 }} className="card-motorbike">
                            
                                <Link onClick={() => this.handleModal(true)}><img className="usermotorbike-img" src={this.state.profile.userMotorbike.image_url} alt="userMotorbike" /></Link>

                                <p className="style-p name-moto">{this.state.profile.userMotorbike.brand} {this.state.profile.userMotorbike.model}</p>

                                <Modal size="lg" centered show={this.state.showModal} onHide={() => this.handleModal(false)}>
                                    <Modal.Body>
                                        <Radar {...this.props} />
                                    </Modal.Body>
                                </Modal>

                            </Col>
                            </Col>
                        </Row>
                            <hr />
                            <h3 className="style-events">Eventos a los que está apuntado</h3>
                        <Row className="profile-1">

                                <ListGroup horizontal className="scroll-x">
                                    {this.state.profile.events.map(event =>
                                        <Link to={`/eventDetails/${event._id}`}>
                                            <ListGroup.Item key={event._id} className="transparent">
                                                <Col xs={{span: 12}} >
                                                    <Col>
                                                    <img src={event.image_url} alt={event.name} className="event-img" />
                                                    </Col>                                             
                                                    <Col className="name-event">
                                                    <p className="style-p">{event.name}</p>
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