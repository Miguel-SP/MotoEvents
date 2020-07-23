import React, { Component } from 'react'
import './EventDetails.css'
import EventService from './../../../../service/EventService'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import MapWithAMarker from './../../../UI/Map/Map'



class EventDetails extends Component {
    constructor() {
        super()
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

    render() {
        return (

                !this.state.eventDetails ? <h3>Cargando...</h3> :

                    (<Container as='main'>

                        {this.state.eventDetails.location}
                        <p>Nº de usuarios que asistirán</p>
                        <Row>
                            <Col className="col-details" md={{ span: 6, offset: 1 }}>
                                <h3> {this.state.eventDetails.name}</h3>
                                <hr></hr>
                                <p><b>Detalles:</b> {this.state.eventDetails.description}</p>
                                <p><b>Fecha:</b> {this.state.eventDetails.date}</p>
                                <hr></hr>
                                <p>Creado por {this.state.eventDetails.created_by}</p>
                                <hr></hr>
                                <div className="details-btn">
                                    <Link className="join-btn btn btn-light" to='/profile/add/myEvents'>Unirse</Link>
                                    <Link className="join-btn btn btn-light" to='/profile/add/myEvents'>Comentar</Link>
                                </div>
                            </Col>
                            <Col className="col-details" md={{ span: 5, offset: 1 }}>
                                <img src={this.state.eventDetails.image_url} alt={this.state.eventDetails.name} />
                            </Col>
                        </Row>

                        <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHrgPHA7BELu_lBj8LSDBoIrS9y9vsKK8&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `30vh` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                        <Link className="btn btn-dark btn-md" to='/eventList'>Volver</Link>
                    </Container>
                    )
                
        )
    }
}

export default EventDetails