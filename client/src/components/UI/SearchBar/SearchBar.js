import React, { Component } from 'react'
import EventService from './../../../service/EventService'

import Form from 'react-bootstrap/Form'

class SearchForm extends Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
        this.EventService = new EventService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        console.log(this.state)
        e.preventDefault()
        this.EventService
            .searchEvents(this.state)
            .then(() => this.props.handleSearchSubmit())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>

                <Form onSubmit={this.handleFormSubmit} className="search-bar">
                            <Form.Group>
                                <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" placeholder="Buscar evento" />
                            </Form.Group>
                </Form>

            </>
        )
    }
}

export default SearchForm