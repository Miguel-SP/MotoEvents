
import React from 'react'
import './EventCard.css'

import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'



const EventCard = props => {

    return (
        <Col className="card-col" sm={12} md={6} lg={4}>
            
            <Link to={props.loggedInUser ? `/eventDetails/${props._id}` : `/login`}>

                <Card border="light" className="event-card" >
                    <Card.Img variant="top" src={props.image_url} />
                    <Card.Body>
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Text>{props.date.slice(0, 10)}</Card.Text>
                    </Card.Body>
                    <Card.Footer>Iniciado por {props.ownerId.username}</Card.Footer>
                </Card>
            </Link>
        </Col>   

    )
}

export default EventCard
