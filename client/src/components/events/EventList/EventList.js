import React, { Component } from 'react'
import './EventList.css'

import EventService from '../../../service/EventService'

import EventCard from '../EventCard/EventCard'
import EventForm from '../EventForm/EventForm'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class EventList extends Component {
    constructor() {
        super()
        this.state = {
            events: [],
            showModal: false
        }
        this.EventService = new EventService()
    }


    componentDidMount = () => this.updateEventList()

    updateEventList = () => {
        this.EventService
            .getAllEvents()
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err))
    }

    handleModal = status => this.setState({ showModal: status })

    handleEventSubmit = () => {
        this.handleModal(false)
        this.updateEventList()
    }
    render() {
        return (
            <>
                <Container as='main' className='events-page'>

                    <h1>Eventos activos</h1>

                    <Button onClick={() => this.handleModal(true)} className="create-btn">Crear nuevo evento</Button>

                    {
                        this.state.events.length === 0
                            ?
                            <h3>No hay eventos activos en este momento, crea uno!</h3>
                            :

                            <Row>
                                {this.state.events.map(elm => <EventCard key={elm._id} {...elm} />)}
                            </Row>
                    }

                </Container>

                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <EventForm handleEventSubmit={this.handleEventSubmit} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default EventList