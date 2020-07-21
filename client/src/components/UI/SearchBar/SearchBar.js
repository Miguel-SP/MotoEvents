import React, { Component } from 'react'
import EventService from './../../../service/EventService'

import Form from 'react-bootstrap/Form'

class SearchForm extends Component {
    constructor() {
        super()
        this.state = {
            events:[]
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
            .searchEvents(this.state)
            .then(response => this.setState({ events: response.data}))
            .catch(err => console.log(err))
        console.log(this.state)
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