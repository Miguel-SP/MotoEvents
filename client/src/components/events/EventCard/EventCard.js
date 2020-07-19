
import React from 'react'
import './EventCard.css'

import {Link} from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'



const EventCard = ({ _id, name, date, image_url, created_by}) => {

    return (
        <Col className="card-col" sm={12} md={6} lg={4}>
            <Card className="event-card" >
                <Card.Img variant="top" src={image_url} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{date.slice(0, 10)}</Card.Text>
                </Card.Body>
                <Card.Body className="card-buttons">
                    <Link to="/profile/add/myEvents" className="join-btn btn btn-light">Unirme</Link>
                    <Link to={`/eventDetails/${_id}`} className="join-btn btn btn-light">Detalles</Link>
                </Card.Body>
                <Card.Footer>Iniciado por {created_by}</Card.Footer>
            </Card>
        </Col>

    )
}

export default EventCard