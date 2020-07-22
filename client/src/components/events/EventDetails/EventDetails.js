import React, { Component } from 'react'
import './EventDetails.css'
import EventService from './../../../service/EventService'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link, Redirect } from 'react-router-dom'



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

            this.props.loggedInUser ?

                (!this.state.eventDetails ? <h3>Cargando...</h3> :

                    (<Container as='main'>
                        <h3>Aquí va el mapa</h3>
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
                        <Link className="btn btn-dark btn-md" to='/eventList'>Volver</Link>
                    </Container>
                    )
                )
                
            : <Redirect to='/login' />)
    }
}

export default EventDetails