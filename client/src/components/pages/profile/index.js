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
            .then(response => {
                this.setState({ profile: response.data })
                console.log(response.data)
            })
            
            .catch(err => console.log(err))

    }

    handleModal = status => this.setState({ showModal: status })


    render() {
        
        return (

            <>
                <div class="page-bg"></div>

                {!this.state.profile ? <div className="spinner"><Spinner /></div> :
                    
                    <Container as='main'>

                        <Row className="profile-1">
                            <Col md={{span: 6}}>
                            <h1>¡Hola, <span className="text-lightblue">{this.props.loggedInUser.username}</span>!</h1>
                            </Col>
                            <Col md={{span: 6}}>
                                <div className="edit-btn-div">
                                <Link  to={`/profile/edit/${this.props.loggedInUser._id}`}>
                                    <button className="button-login-signup"><span>Editar mi perfil</span></button>
                                </Link>
                                </div>
                            </Col>
                        </Row>
                        <Row className="profile-1">

                            <Col className="card-motorbike" md={{ span: 5, offset: 1 }}>
                                <h3 className="style-events name-moto">Mi moto</h3>

                                <img className="usermotorbike-img" src={this.state.profile.userMotorbike.image_url} alt="userMotorbike" />
                                <p className="style-p name-moto text-lightblue" >{this.state.profile.userMotorbike.brand} {this.state.profile.userMotorbike.model}</p>

                            </Col>

                            <Col md={{ span: 5, offset: 1 }} >
                                <h3 className="style-events">Mis amigos</h3>

                                <ListGroup>
                                    {this.state.profile.friends.map(friend =>
                                        <Link to={`/profile/public/${friend._id}`}><ListGroup.Item key={friend.id} className="center transparent style-friend">{friend.username}</ListGroup.Item></Link>)}
                                </ListGroup>
                            </Col>

                        </Row>
                        <hr />
                        <h3 className="style-events">Eventos a los que voy</h3>
                        <Row className="profile-1">
                        <ListGroup horizontal className="scroll-x">
                            {this.state.profile.events.map(event =>
                                <ListGroup.Item className="transparent">
                                <Link to={`/eventDetails/${event._id}`}>
                                    <Col xs={{span: 12}} >
                                    <Col className="height-img">                                  
                                    <img variant="top" className="event-img" src={event.image_url} alt={event.name} />
                                    </Col>
                                    <Col className="name-event">
                                    <p className="style-p">{event.name}</p>
                                    </Col>
                                    </Col>  
                                </Link>
                                </ListGroup.Item>
                                )}
                        </ListGroup>
                        </Row>
                    </Container>
                }
            </>
        )
    }
}

export default Profile