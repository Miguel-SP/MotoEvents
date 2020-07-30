import React, { Component } from 'react'
import CommentsForm from './CommentsForm'
import CustomModal from './../EventList/CustomModal'
import EventService from './../../../../service/EventService'
import UserService from './../../../../service/UserService'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import MapWithAMarker from '../../../UI/Map'
import Spinner from '../../../UI/Spinner'
import './arrowback.scss'
import './EventDetails.css'



class EventDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventDetails: undefined,
            edit_id: this.props.match.params.id,
            showModal: false,
        }
        this.EventService = new EventService()
        this.UserService = new UserService()

    }


    componentDidMount = () => this.updateDetails()


    updateDetails = () => {
        const id = this.props.match.params.id

        this.EventService
            .getEventDetails(id)
            .then(response => this.setState({ eventDetails: response.data }))
            .catch(err => console.log(err))
        this.handleModal(false)
    }

    deletingEvent = () => {
        let id = this.props.match.params.id

        this.EventService
            .deleteEvent(id)
            .catch(err => console.log(err))

        this.updateDetails()

        this.props.handleToast('Evento eliminado')
    }


    joiningEvent = () => {
        let id = this.props.match.params.id
        let actualUser = this.props.loggedInUser
        console.log(this.state.eventDetails)

        if (!this.state.eventDetails.joinedUsers.some(ev => ev._id === actualUser._id)) {

            this.UserService
                .joinEvent(id)
                .catch(err => console.log(err))

            this.EventService
                .userJoined(id)
                .catch(err => console.log(err))

            this.updateDetails()

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

        this.updateDetails()

        this.props.handleToast('Eliminado de tus eventos')
    }

    handleModal = status => this.setState({ showModal: status })


    render() {

        return (
            <>
                <div class="page-bg"></div>

                {!this.state.eventDetails ? <div className="spinner"><Spinner /></div> :

                    <Container as='main'>
                        <Row>

                            <Col className="col-details" md={{ span: 6, offset: 1 }}>
                                <h3> {this.state.eventDetails.name}</h3>
                                <hr></hr>
                                <p><b>Detalles:</b> {this.state.eventDetails.description}</p>
                                <p><b>Fecha:</b> {this.state.eventDetails.date.slice(0, 10)}</p>
                                <p><b>Lugar:</b> {this.state.eventDetails.location.city}</p>
                                <p>Usuarios que asistirán:</p>
                                {this.state.eventDetails.joinedUsers.map(us => <p><b><Link to={`/profile/public/${us._id}`}>{us.username}</Link></b></p>)}
                                <hr></hr>
                                <p>Creado por <b><Link to={`/profile/public/${this.state.eventDetails.ownerId._id}`}>{this.state.eventDetails.ownerId.username}</Link></b></p>
                                <hr></hr>
                                <div className="details-btn">

                                    {this.state.eventDetails.joinedUsers.some(ev => ev._id === this.props.loggedInUser._id)
                                        ? <button class="button-login-signup" onClick={() => this.unjoinEvent()}><span>Dejar de ir</span></button>
                                        : <button class="button-login-signup" onClick={() => this.joiningEvent()}><span>Unirse</span></button>}

                                    {(this.props.loggedInUser._id === this.state.eventDetails.ownerId._id) &&
                                        <>
                                        <button class="btn-edit btn-edit-details" onClick={() => this.handleModal(true)}><span>Editar</span></button>
                                        <Link to='/eventList'><button class="btn-edit btn-edit-details" onClick={() => this.deletingEvent()} ><span>Borrar</span></button></Link>
                                        </>}

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

                        <ListGroup variant="flush" className="comments-group">
                            {this.state.eventDetails.comments.map(comment =>
                                <ListGroup.Item className="comments-list" key={comment._id}>
                                    <div>{comment.text}</div>
                                    <div>Por <span style={{ color: '#42AB9E' }}><Link to={`/profile/public/${this.state.eventDetails.ownerId._id}`}>{comment.user}</Link></span> el {comment.date.slice(0, 10)}</div>
                                </ListGroup.Item>)}
                        </ListGroup>

                        <CommentsForm {...this.props} updateDetails={this.updateDetails} />

                        <CustomModal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)} updateDetails={this.updateDetails} edit_id={this.props.match.params.id} {...this.props} />

                        <Link to='/eventList'><span class="arrowback left"></span></Link>
                    </Container>
                }
            </>
        )
    }
}

export default EventDetails