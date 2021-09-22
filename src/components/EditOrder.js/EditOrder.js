import React , {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import OrderForm from '../Forms/OrderForm'


function EditOrder() {
    
    const [formValues , setFormValues] = useState({
        pickupLocation :'',
        pickupDate: null,
        pickupTime : null ,
        returnDate : null ,
        returnTime : null ,
        vehicleType : '',
        packageType : '', 
      })

    let { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`http://localhost:8092/api/orders/${id}`)
            const formatData = await data.json()

            const { pickupLocation , pickupDate, returnDate, packageType, vehicleType } = formatData

            const pickupDate_ =  new Date(pickupDate)
            const returnDate_ =  new Date(returnDate)

            setFormValues({
                pickupLocation,
                pickupDate : pickupDate_,
                pickupTime : pickupDate_,
                returnDate : returnDate_,
                returnTime : returnDate_ ,
                vehicleType,
                packageType
            })

            console.log(pickupDate_ ,returnDate_ )

        }

        fetchData()

    }, [])
 


    return (
        <div>
            <Container>
                <div style={{margin: '100px 0'}}>
                    <OrderForm btnText='update' order_id={id} formvalues={formValues} />
                </div>
            </Container>
        </div>
    )
}

export default EditOrder
