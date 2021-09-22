
import React from 'react'
import { Container, Row, Button, Image } from 'react-bootstrap'
import "./LandingPage.css"
 


const Landingpage = () => {
    return (
        <div className="main">
            <Container>
            <Row>
                <dev className="lp-text">
                    <dev>
                        
                        <h1 className="title">WelCome to Route Master..</h1>
                        <p className="subtitle">Drive Carefully. All lives are very Important!!!!!</p>
                    </dev>
                    <dev className="buttonContainer">
                        <a href='/login'>
                            <Button size='lg' className='landingbutton'>Login</Button>
                        </a>

                        <a href='/register'>
                            <Button size='lg' className='landingbutton' variant="outline-primary">Sign Up</Button>
                        </a>
                        
                    </dev>
                </dev>
            </Row>
            </Container>
        </div>
    )
}

export default Landingpage
