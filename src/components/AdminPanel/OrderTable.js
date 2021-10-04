import React, {useEffect, useState} from 'react'
import { Container, Table } from 'react-bootstrap'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom'

function OrderTable() {

    const [data, setData] = useState([])
    const [err , setErr] = useState(null)

    async function fetchData() {

        try {
            const data = await fetch('http://localhost:8092/api/orders')
            setData(await data.json())

        } catch (error) {
            setErr(error)
        }

        
    }

    useEffect(() => {       
        fetchData()
    }, [])

    
    const handleDelete = async (id) => {
        
        await fetch(`http://localhost:8092/api/orders/${id}`, {
            method : 'DELETE'
        })

        fetchData()
    }

    return (
        <div>
            <Container>
                <Box sx={{ mt: 6 }}>
                <Typography variant="h4" gutterBottom component="div" sx={{ textAlign: 'center' , mb : 5}}>
                    Order Details
                </Typography>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Pickup Location</th>
                            <th>Pickup Date and Time</th>
                            <th>Return Date and Time</th>
                            <th>Vehicle Type</th>
                            <th>Package Type</th>
                        </tr>
                    </thead>
                    <tbody>
                         {data.map(( order ) => (
                            <tr>
                                <td>{order._id}</td>
                                <td>{order.pickupLocation}</td>
                                <td>{(new Date(order.pickupDate)).toLocaleString()}</td>
                                <td>{(new Date(order.returnDate)).toLocaleString()}</td>
                                <td>{order.vehicleType}</td>
                                <td>{order.packageType}</td>
                                <td>
                                    <Link to={`/orders/update/${order._id}`}>
                                        <IconButton color="secondary" variant="outlined" aria-label="add an alarm">
                                            <EditIcon />
                                        </IconButton>
                                        </Link>
                                        <IconButton color="primary" variant="outlined" aria-label="add to shopping cart" onClick={() => {
                                            handleDelete(order._id)
                                        }}>
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                </td>
                            </tr>
                            )
                         )}
                    </tbody>
                </Table>
                </Box>
                {err && <p style={{ color : 'red' }}>Failed to fetch Data</p>}
            </Container>
        </div>
    )
}

export default OrderTable
