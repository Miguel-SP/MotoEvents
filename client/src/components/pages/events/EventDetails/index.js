import React, { Component } from 'react'
import './EventDetails.css'
import CommentsForm from './CommentsForm'
import EventService from './../../../../service/EventService'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
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
        
        this.props.handleToast('Evento eliminado')
    }

    joiningEvent = () => {                                      
        let id = this.props.match.params.id
        let actualUser = this.props.loggedInUser
        
        if (!this.state.eventDetails.joinedUsers.some(us => us === actualUser._id)) {

            this.UserService
                .joinEvent(id)
                .catch(err => console.log(err))
            
            this.EventService
                .userJoined(id)
                .catch(err => console.log(err))
            
            this.props.handleToast('Te has unido!')
        } 
    }

    unjoinEvent = () => {                               
        let id = this.props.match.params.id

        this.UserService
            .unjoinEvent(id)
            .catch(err => console.log(err))

        this.EventService
            .userUnjoin(id)
            .catch(err => console.log(err))
        
        this.props.handleToast('Eliminado de tus eventos')

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
                            <p><b>Fecha:</b> {this.state.eventDetails.date.slice(0, 10)}</p>
                            <p><b>Lugar:</b> {this.state.eventDetails.location.city}</p>
                            <p><b>{this.state.eventDetails.joinedUsers.length}</b> usuarios asistirán este evento</p>
                            <hr></hr>
                            <p>Creado por {this.state.eventDetails.ownerId.username}</p>
                            <hr></hr>
                            <div className="details-btn">
                                
                                {this.state.eventDetails.joinedUsers.some(us => us === this.props.loggedInUser._id)
                                    ? <Link className="join-btn btn btn-light" onClick={() => this.unjoinEvent()}>Dejar de ir</Link>
                                    : <Link className="join-btn btn btn-light" onClick={() => this.joiningEvent()}>Unirse</Link>}

                                <Link className="join-btn btn btn-light" to='/profile/add/myEvents'>Comentar</Link>

                                {(this.props.loggedInUser._id === this.state.eventDetails.ownerId._id) &&
                                    <>
                                    <Link className="join-btn btn btn-light" onClick={() => this.deletingEvent()} to='/eventList'>Editar</Link>
                                    <Link className="btn-danger btn" onClick={() => this.deletingEvent()} to='/eventList'>Borrar</Link>
                                    </>
                                }
                                
                            </div>
                        </Col>
                        <Col className="col-details col-img" md={{ span: 6, offset: 1 }}>
                            <img src={this.state.eventDetails.image_url} alt={this.state.eventDetails.name} />
                        </Col>
                    </Row>

                    <MapWithAMarker location={this.state.eventDetails.location} googleMapURL={`${process.env.MAPS_API_URL}`}
                        loadingElement={<div style={{ height: `30vh` }} />}
                        containerElement={<div style={{ height: `30vh` }} />}
                        mapElement={<div style={{ height: `30vh` }} />} />
                    
                    <ListGroup variant="flush">
                        {this.state.eventDetails.comments.map(comment => 
                            <ListGroup.Item key={comment._id}>{comment.text}</ListGroup.Item>)}
                    </ListGroup>
                    
                    <CommentsForm {...this.props}/>

                    <Link className="btn btn-dark btn-md btn-back" to='/eventList'>Volver</Link>
                </Container>
                )

        )
    }
}

export default EventDetails