import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Link } from 'react-router-dom'
import './buttons.scss'
import './home.css'



const Home = () => {


    return (
        <>
            <div className="page-bg"></div>
            <main className="home-main">
                <Container>
                    <Row className='home-title'>
                        <h1 id='welcome-title'>Moto<span className="text-lightblue">Events</span></h1>
                    </Row>

                    <Row className="home-text-row">
                        <Col>
                            <p className="home-description">Únete y crea eventos para disfrutar de las dos ruedas!</p>

                            <div id="home-btn">
                                <Link to="/login"><button className="learn-more">
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text">Inicia sesión</span>
                                </button></Link>
                            </div>
                            <div id="home-btn">
                                <Link to="/signup"><button className="learn-more">
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text">Regístrate</span>
                                </button></Link>
                            </div>


                        </Col>
                    </Row>
                </Container>


            </main>
        </>
    )
}

export default Home