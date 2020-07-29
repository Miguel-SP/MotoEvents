import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/esm/Container'
import './home.css'



const Home = () => {


    return (
        <main className="home-main">
            <Container>

            <h1>Bienvenido a MotoEvents!</h1>
            <p>Únete y crea eventos para disfrutar de las dos ruedas!</p>
            <p>Moto Events es una aplicación dirigida a cualquier motorista, que quiera conocer nuevos compañeros y disfrutar de eventos relacionados con el mundo de las motos.</p>
            
            </Container>

       
        </main>
    )
}

export default Home