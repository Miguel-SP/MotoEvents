import React, {Component} from 'react'
import EventService from '../../../../../service/EventService'
import CityAutocomplete from './../../../../UI/Map/CityAutocomplete'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EventForm extends Component {
    constructor (props){
        super (props)
        this.state = {
                name: '',
                description: '',
                location: {
                    city: '',
                    coordinates: []
                },
                image_url: '',
                date: '',
                ownerId: this.props.loggedInUser._id
        }
        this.EventService = new EventService()
    }

    componentDidMount = () => {
        this.props.edit_id &&
            this.EventService
                .getEventDetails(this.props.edit_id)
                .then(response => this.setState(response.data))
                .catch(err => console.log(err))
    }

    getTheCity = (theCity) => this.setState({
            ...this.state,
        location: {
            city: theCity.city,
            coordinates: [theCity.coordinates.lat, theCity.coordinates.lng]
        }
    })

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ ...this.state, [name]: value  })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        if (this.props.edit_id) {
            this.EventService
                .updateEvent(this.props.edit_id, { ...this.state })
                .then(() => {
                    this.props.updateDetails()
                    this.props.handleToast('Evento modificado!')
                })
                .catch(err => console.log(err))
            

        } else {

            this.EventService
                .createEvent(this.state)
                .then(() => {
                    this.props.handleEventSubmit()
                    this.props.handleToast('Evento creado!')
                })
                .catch(err => console.log(err))
        }

    }

    render () {
        return (
            <>
                <h3>{this.props.edit_id ? 'Editar evento' : 'Crea un nuevo evento'}</h3>
                <hr></hr>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                        <Form.Text className="text-muted">Sin faltas de ortografía.</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Ubicación</Form.Label>
                        <CityAutocomplete getTheCity={(theCity => this.getTheCity(theCity))}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.date} name="date" type="date" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.image_url} name="image_url" type="text" />
                    </Form.Group>

                    <Button variant="dark" type="submit">{this.props.edit_id ? 'Editar' : 'Crear'}</Button>
                </Form>
            </>
        )
    }
}

export default EventForm