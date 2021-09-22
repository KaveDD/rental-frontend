import {Button} from 'react-bootstrap'
import React from 'react'
import MainScreen from '../../components/MainScreen'

const AdminHome = () => {
    return (
       <MainScreen title='Welcome'>
           <div className="buttonContainer">
           <a href ='/View_de'>
           <Button  variant="primary" >
                View Customers and Partners
                </Button>
            </a>
            </div>
       </MainScreen>
    )
}

export default AdminHome
