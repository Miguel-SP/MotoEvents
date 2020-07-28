import React, { Component } from 'react'
import EventService from './../../../../service/EventService'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CommentsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser._id,
            date: Date.now,
            text: '',
            comments: undefined
        }
        this.EventService = new EventService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {                       // hacer un post con push a los comentarios del evento.
        e.preventDefault()

        const id = this.props.match.params.id
        this.EventService
            .createComment(id, this.state)
            .then(response => {
                this.setState({comments : response.data.comments})
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