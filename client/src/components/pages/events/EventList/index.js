import React, { Component } from 'react'
import './EventList.css'

import EventService from '../../../../service/EventService'

import EventCard from './EventCard'
import SearchForm from '../../../UI/SearchBar'
import CustomModal from './CustomModal'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from '../../../UI/Spinner'


class EventList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            showModal: false,
            edit_id: undefined
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

    handleSearchSubmit = (filteredEvents) => {
        this.setState({ events: filteredEvents })
    }




    render() {
        return (
            <>
                <div class="page-bg"></div>

                {this.state.events.length === 0 ? <div className="spinner"><Spinner /></div> :

                    <Container as='main' className='events-page'>

                        <Row className="eventlist-top-row">
                            <Col xs={{ span: 6 }} className="active-events-col">
                                <h1>Eventos activos</h1>
                            </Col>
                            
                            <Col xs={{ span: 6 }} className="create-event-col">
                                {this.props.loggedInUser && <button class="button-login-signup" onClick={() => this.handleModal(true)}><span>Crear evento</span></button>}
                            </Col>
                           
                        </Row>

                        <SearchForm events={this.state.events} filterEventList={this.handleSearchSubmit} />

                        <Row>{this.state.events.map(elm => <EventCard loggedInUser={this.props.loggedInUser} key={elm._id} {...elm} />)}</Row>

                    </Container>}

                <CustomModal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)} handleEventSubmit={this.handleEventSubmit} {...this.props} />
     
            </>
        )
    }
}

export default EventList