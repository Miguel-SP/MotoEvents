import React, { Component } from 'react'

import UserService from './../../../service/UserService'

import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/esm/ListGroup'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: undefined
        }

        this.UserService = new UserService()

    }
    
    componentDidMount = () => {
        const id = this.props.match.params.id

        this.UserService
            .getProfile(id)
            .then(response => this.setState({ profile: response.data }))
            .catch(err => console.log(err))
    }


    // unjoinEvent = () => {
    //     const id = this.props.match.params.id
    //     const event =                                // Borrar evento de mi perfil

    //     this.UserService
    //         .unjoinEvent(id)
    //         .catch(err => console.log(err))
    // }

    render() {
        
        return (

            !this.state.profile ? <h3>Cargando...</h3> :
                
           ( <Container as='main'>
                <h1>¡Hola, {this.props.loggedInUser.username}!</h1>
    
                <Row>
                    <Col>
                        <p>Eventos a los que voy</p>
                        <ListGroup>
                            {this.state.profile.events.map(event => (
                                <ListGroup.Item key={event._id}>{event.name}<Link className="join-btn btn btn-light" onClick={() => this.unjoinEvent()} to={`/profile/${this.props.loggedInUser._id}`}>X</Link></ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col>
                        <p>Mi moto</p>
                        <p>Modal con gráfico de nivo.rocks</p>
                        {this.props.loggedInUser.motorbike}
                    </Col>
                    <Col>
                        <p>Editar mi perfil</p>
                    </Col>
                </Row>
    
            </Container>)
    
        )
    }

}

export default Profile