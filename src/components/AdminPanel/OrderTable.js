import React, {useEffect, useState} from 'react'
import { Container, Table } from 'react-bootstrap'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom'
import jspdf from 'jspdf'

import "jspdf-autotable"



import img from '../../Images/Logo.png';
import Snackbar from '@mui/material/Snackbar';

function OrderTable() {

    const [data, setData] = useState([])
    const [err , setErr] = useState(null)
    const [ snackbar, setSnackbar] = useState(false)

    const handleClose = () => {
        setSnackbar( false);
      };

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
        setSnackbar(true)

    }

    const generatePDF = tickets => {



        const doc = new jspdf();
        const tableColumn = ["Order ID", "Pickup Location", "Pickup Date and Time", "Return Date and Time", "Vehicle Type", "Package Type"];
        const tableRows = [];
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];

        tickets.map(ticket => {
            const ticketData = [
                ticket._id,
                ticket.pickupLocation,
                ticket.pickupDate,
                ticket.returnDate,
                ticket.vehicleType,
                ticket.packageType,
            ];

            tableRows.push(ticketData);

        })

        doc.text("Route Master", 70, 8).setFontSize(13);
        doc.text("Order Detail Report", 14, 16).setFontSize(13);
        doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
        //right down width height
        doc.addImage(img, 'JPEG', 170, 8, 25, 25);
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
        doc.save("Order Details Report.pdf");
    };

    return (
        <div>
            <Container>
                <Box sx={{ mt: 6 }}>
                <Typography variant="h4" gutterBottom component="div" sx={{ textAlign: 'center' , mb : 5}}>
                    Order Details
                </Typography>
                <div class="buttonn">

                    <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(data)} >Generate Report</button> <br></br>

                </div>
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
            <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar}
        onClose={handleClose}
        message="Order Deleted!"
        autoHideDuration={1500}
      />
        </div>
    )
}

export default OrderTable