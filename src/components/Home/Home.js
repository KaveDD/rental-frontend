import React from 'react'
import OrderForm from '../Forms/OrderForm'
import { Container } from 'react-bootstrap'


function Home() {
    return (
        <div  >
            <Container>
                <div style={{margin: '100px 0'}}>
                    <OrderForm btnText='Submit' />
                </div>
            </Container>
        </div>
    )
}

export default Home
