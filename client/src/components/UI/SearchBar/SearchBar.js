import React, { Component } from 'react'
import EventService from './../../../service/EventService'

import Form from 'react-bootstrap/Form'

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            filteredEvents:[]
        }
        this.EventService = new EventService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
        this.EventService
            .searchEvents(this.state)
            .then(response => this.setState({ filteredEvents: response.data }, this.props.filterEventList(response.data)))
            .catch(err => console.log(err))

    }

    onSubmit = e => e.preventDefault()

    render() {

        return (
            <>

                <Form onSubmit={this.onSubmit} className="search-bar">
                    <Form.Group>
                        <Form.Control onKeyUp={this.handleInputChange} value={this.props.name} name="name" type="text" placeholder="Buscar evento" />
                    </Form.Group>
                </Form>

            </>
        )
    }
}

export default SearchForm