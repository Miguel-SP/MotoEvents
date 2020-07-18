import React, { Component } from 'react'
import './EventList.css'

import EventService from '../../../service/EventService'

import EventCard from '../EventCard/EventCard'

import Container from 'react-bootstrap/Container'

class EventList extends Component {
    constructor() {
        super()
        this.state = {
            events: []
        }
        this.EventService = new EventService()
    }


    componentDidMount = () => {
        this.EventService
            .getAllEvents()
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err))

    }

    render() {
        return (
            <Container as='main' className='events-page'>
                
                <h1>Eventos activos</h1>
                
                {
                    this.state.events.length
                    ?
                        this.state.events.map(elm => <EventCard {...elm}/>)
                    :
                    <h3>No hay eventos activos en este momento, crea uno!</h3>
                }

            </Container>
        )
    }
}

export default EventList