
import React from 'react'
import './EventCard.css'

import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'



const EventCard = props => {

        return (
            <Col className="card-col" sm={12} md={6} lg={4}>
                <Card border="light" className="event-card" >
                    <Card.Img variant="top" src={props.image_url} />
                    <Card.Body>
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Text>{props.date.slice(0, 10)}</Card.Text>
                    </Card.Body>
                    <Card.Body className="card-buttons">
                        {props.loggedInUser && (
                            <>
                                <Link to="/profile/add/myEvents" className="join-btn btn btn-light">Unirme</Link>
                                <Link to={`/eventDetails/${props._id}`} className="join-btn btn btn-light">Detalles</Link>
                            </>)
                        }
                    </Card.Body>
                    <Card.Footer>Iniciado por {props.ownerId.username}</Card.Footer>
                </Card>
            </Col>
    
        )
}

export default EventCard