import React from 'react'
import { Card, Button, Badge, Accordion,  } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import temp from '../../components/Temp.names/temp'

const View_de = () => {

    const deleteHandler = (id) =>{
        if(window.confirm("Are You Sure")){

        }
    }


    return (
       <MainScreen title='View Your Customers'>
           <Link to = "#">
           <Button>View My Partners</Button>
           </Link><hr />
                {
                   temp.map(temp => (
                <Accordion>
                    <Card Style={{margin:10}}>
                    <Card.Header style={{display: "flex"}}>
                        <span
                        style={{
                            color: "black",
                            textDecoration: "none",
                            flex: 1,
                            cursor: "pointer",
                            alignSelf: "center",
                            fontSize: 18,
                        }}>
                            
                                {temp.Name}
                               
                            
                        </span> 
                        <div>
                            <Button variant="danger" className="mx-2"
                                     onClick={() => deleteHandler(temp._id)}>
                                 Remove 
                            </Button>
                        </div>
                       
                    </Card.Header>
                    
                    <Card.Body>
                        <Badge bg="success">
                            NIc No : {temp.NIC}
                        </Badge>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {temp.content}<br /> 
                            {temp.category}
                        </p>

                    </blockquote>
                    </Card.Body>
                   
                </Card>
                </Accordion>
                   ))

                }


           

       </MainScreen>
    )
}

export default View_de
