import React, { Component } from 'react'
import './EventDetails.css'
import EventService from '../../../../service/EventService'
import UserService from './../../../../service/UserService'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import MapWithAMarker from '../../../UI/Map'



class EventDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventDetails: undefined
        }
        this.EventService = new EventService()
        this.UserService = new UserService()

    }

    componentDidMount = () => {

        const id = this.props.match.params.id

        this.EventService
            .getEventDetails(id)
            .then(response => this.setState({ eventDetails: response.data }))
            .catch(err => console.log(err))
    }

    deletingEvent = () => {
        let id = this.props.match.params.id

        this.EventService
            .deleteEvent(id)
            .catch(err => console.log(err))
    }

    joiningEvent = () => {                                      
        let id = this.props.match.params.id
        let actualUser = this.props.loggedInUser
        
        if (!this.state.eventDetails.joinedUsers.some(us => us === actualUser._id)) {

            this.UserService
                .joinEvent(id)
                .catch(err => console.log(err))
        } 
    }

    userJoin = () => {
        let id = this.props.match.params.id
        let actualUser = this.props.loggedInUser

        if (!this.state.eventDetails.joinedUsers.some(us => us === actualUser._id)) {

            this.EventService
                .userJoined(id)
                .catch(err => console.log(err))
        }
    }


    render() {
        return (

            !this.state.eventDetails ? <h3>Cargando...</h3> :

                (<Container as='main'>
                    <Row>
                        <Col className="col-details" md={{ span: 6, offset: 1 }}>
                            <h3> {this.state.eventDetails.name}</h3>
                            <hr></hr>
                            <p><b>Detalles:</b> {this.state.eventDetails.description}</p>
                            <p><b>Fecha:</b> {this.state.eventDetails.date}</p>
                            <p><b>Lugar:</b> {this.state.eventDetails.location.city}</p>
                            <p><b>{this.state.eventDetails.joinedUsers.length}</b> usuarios asistirán este evento</p>
                            <hr></hr>
                            <p>Creado por {this.state.eventDetails.ownerId.username}</p>
                            <hr></hr>
                            <div className="details-btn">
                                <Link className="join-btn btn btn-light" onClick={() => {
                                    this.joiningEvent()
                                    this.userJoin()
                                }}>Unirse</Link>

                                <Link className="join-btn btn btn-light" to='/profile/add/myEvents'>Comentar</Link>

                                {(this.props.loggedInUser._id === this.state.eventDetails.ownerId._id) &&
                                <Link className="join-btn btn btn-light" onClick={() => this.deletingEvent()} to='/eventList'>Borrar</Link>}
                                
                            </div>
                        </Col>
                        <Col className="col-details" md={{ span: 5, offset: 1 }}>
                            <img src={this.state.eventDetails.image_url} alt={this.state.eventDetails.name} />
                        </Col>
                    </Row>

                    <MapWithAMarker location={this.state.eventDetails.location} googleMapURL={`${process.env.MAPS_API_URL}`}
                        loadingElement={<div style={{ height: `30vh` }} />}
                        containerElement={<div style={{ height: `30vh` }} />}
                        mapElement={<div style={{ height: `30vh` }} />} />

                    <Link className="btn btn-dark btn-md btn-back" to='/eventList'>Volver</Link>
                </Container>
                )

        )
    }
}

export default EventDetails