import React, { Component } from 'react'
import EventService from '../../../../../service/EventService'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CommentsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text:'',
            date: Date.now,
            ownerId: this.props.loggedInUser._id
        }
        this.EventService = new EventService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.EventService
            .createEvent(this.state)
            .then(() => {
                this.props.handleEventSubmit()
                this.props.handleToast('Comentario enviado!')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <hr></hr>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.text} name="text" type="text" />
                        <Form.Text className="text-muted">Máximo 200 caracteres</Form.Text>
                    </Form.Group>

                    <Button variant="dark" type="submit">Enviar</Button>
                </Form>
            </>
        )
    }
}

export default CommentsForm