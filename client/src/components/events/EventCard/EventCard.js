
import React, {Component} from 'react'
import './EventCard.css'

import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'



class EventCard extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        
        return (
            <Col className="card-col" sm={12} md={6} lg={4}>
                <Card className="event-card" >
                    <Card.Img variant="top" src={this.props.image_url} />
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>{this.props.date.slice(0, 10)}</Card.Text>
                    </Card.Body>
                    <Card.Body className="card-buttons">
                        {this.props.loggedInUser && (
                            <>
                                <Link to="/profile/add/myEvents" className="join-btn btn btn-light">Unirme</Link>
                                <Link to={`/eventDetails/${this.props._id}`} className="join-btn btn btn-light">Detalles</Link>
                            </>)
                        }
                    </Card.Body>
                    <Card.Footer>Iniciado por {this.props.created_by}</Card.Footer>
                </Card>
            </Col>
    
        )

    }

}

export default EventCard