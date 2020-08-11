import React, { Component } from 'react'

import UserService from './../../../service/UserService'

import Spinner from './../../UI/Spinner'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import { Link } from 'react-router-dom'
import './profile.css'


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
        const id = this.props.match.params.id
        this.UserService
            .getProfile(id)
            .then(response => this.setState({ profile: response.data }))
            .catch(err => console.log(err))

    }

    handleModal = status => this.setState({ showModal: status })


    render() {

        return (

            <>

                {!this.state.profile ? <div className="spinner"><Spinner /></div> :


                    (<div>
                        <div className="page-bg"></div>
                        <Container as='main'>

                            <Row className="profile-row">
                                <Col md={{ span: 6 }}>
                                    <h1>¡Hola, <span className="text-lightblue">{this.props.loggedInUser.username}</span>!</h1>
                                </Col>
                                <Col md={{ span: 6 }}>
                                    <div className="edit-btn-div">
                                        <Link to={`/profile/edit/${this.props.loggedInUser._id}`}>
                                            <button className="button-login-signup"><span>Editar mi perfil</span></button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="profile-row">

                                <Col className="card-motorbike" md={{ span: 6 }}>
                                    <h3>Moto actual</h3>

                                    <img className="usermotorbike-img" src={this.state.profile.userMotorbike.image_url} alt="userMotorbike" />
                                    <p className="style-p" >{this.state.profile.userMotorbike.brand} {this.state.profile.userMotorbike.model}</p>

                                </Col>

                                <Col className="card-motorbike" md={{ span: 6 }} >
                                    <h3>Lista de amigos</h3>

                                    <ListGroup>
                                        {this.state.profile.friends.map(friend =>
                                            <Link to={`/profile/public/${friend._id}`}><ListGroup.Item action variant="light" key={friend.id} className="center style-friend">{friend.username}</ListGroup.Item></Link>)}
                                    </ListGroup>
                                </Col>

                            </Row>
                            <hr />
                            <h3 className="style-p">Eventos a los que voy</h3>
                            <Row className="profile-row">
                                <ListGroup horizontal className="scroll-x">
                                    {this.state.profile.events.map(event =>
                                        <ListGroup.Item className="transparent">
                                            <Link to={`/eventDetails/${event._id}`}>
                                                <Col xs={{ span: 12 }} >
                                                    <Col>
                                                        <img variant="top" className="event-img" src={event.image_url} alt={event.name} />
                                                    </Col>
                                                    <Col>
                                                        <p className="name-event">{event.name}</p>
                                                    </Col>
                                                </Col>
                                            </Link>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Row>
                        </Container>
                    </div>)
                }
            </>
        )
    }
}

export default Profile