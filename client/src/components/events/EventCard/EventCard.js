
import React from 'react'
import './EventCard.css'

import Card from 'react-bootstrap/Card'


const EventCard = ({name, date, image_url }) => {

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image_url} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{date.slice(0, 10)}</Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Link href="#">Unirme</Card.Link>
                <Card.Link href="#">Detalles</Card.Link>
            </Card.Body>
        </Card>

    )
}

export default EventCard