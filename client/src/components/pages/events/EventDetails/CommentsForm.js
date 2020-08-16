import React, { Component } from 'react'
import EventService from './../../../../service/EventService'

import Form from 'react-bootstrap/Form'

class CommentsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser.username,
            userId: this.props.loggedInUser._id,
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

    handleFormSubmit = e => {
        e.preventDefault()

        const id = this.props.match.params.id
        this.EventService
            .createComment(id, this.state)
            .then(response => {
                this.setState({ comments: response.data.comments, text: '' })
                this.props.updateDetails()
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
                        <Form.Label>Deja un comentario</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.text} name="text" type="text" className="form-transp"/>
                        <Form.Text className="text-muted">Máximo 200 caracteres</Form.Text>
                    </Form.Group>
                </Form>
            </>
        )
    }
}

export default CommentsForm