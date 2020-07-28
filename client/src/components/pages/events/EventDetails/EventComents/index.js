import React from 'react'

import Card from 'react-bootstrap/Card'

const ComentCard = props => {

    return (

                <Card border="primary">
                    <Card.Body>
                        <Card.Text>{props.ownerId.username}</Card.Text>
                        <Card.Text>{props.coments.text}</Card.Text>
                    </Card.Body>
                    <Card.Footer>Fecha {props.coments.date}</Card.Footer>
                </Card>

    )
}

export default ComentCard