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
            eventDetails: undefined,
            joinedEvents:[],

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
        const id = this.props.match.params.id

        this.EventService
            .deleteEvent(id)
            .catch(err => console.log(err))
    }

    joiningEvent = () => {                                      // Nos está llegando null en la promise del Event Id.
        const id = this.props.match.params.id
        
        this.UserService
            .joinEvent(id)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }


    render() {
        return (

            !this.state.eventDetails ? <h3>Cargando...</h3> :

                (<Container as='main'>

                    {this.state.eventDetails.location.city}
                    <p>Nº de usuarios que asistirán</p>
                    <Row>
                        <Col className="col-details" md={{ span: 6, offset: 1 }}>
                            <h3> {this.state.eventDetails.name}</h3>
                            <hr></hr>
                            <p><b>Detalles:</b> {this.state.eventDetails.description}</p>
                            <p><b>Fecha:</b> {this.state.eventDetails.date}</p>
                            <hr></hr>
                            <p>Creado por {this.state.eventDetails.ownerId.username}</p>
                            <hr></hr>
                            <div className="details-btn">
                                <Link className="join-btn btn btn-light" onClick={() => this.joiningEvent()}>Unirse</Link>
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

                    <Link className="btn btn-dark btn-md" to='/eventList'>Volver</Link>
                </Container>
                )

        )
    }
}

export default EventDetails