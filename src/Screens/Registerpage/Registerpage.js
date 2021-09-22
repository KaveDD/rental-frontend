import React, { useEffect, useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import MainScreen from '../../components/MainScreen'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'

const Registerpage = (props) => {

    const [Name, setName] =  useState("")
    const [NIC, setNIC] = useState("")
    const [Email, setEmail] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [Phone, setPhone] = useState("")
    const [Address, setAddress] = useState("")
    const [UserType, setUserType] = useState("")
    const [pic, setPic] = useState(
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.nicepng.com%2Fpng%2Fdetail%2F136-1366211_group-of-10-guys-login-user-icon-png.png&imgrefurl=https%3A%2F%2Fwww.nicepng.com%2Fourpic%2Fu2q8i1t4t4t4q8a9_group-of-10-guys-login-user-icon-png%2F&tbnid=gHyezIyavOkvwM&vet=12ahUKEwjW5Nys7sHyAhUBFXIKHfdLDNIQMygCegUIARDLAQ..i&docid=9FF7Wj-v_9JOdM&w=820&h=480&q=user&ved=2ahUKEwjW5Nys7sHyAhUBFXIKHfdLDNIQMygCegUIARDLAQ")
    const [Password, setPassword] = useState("")
    const [message, setMessage] = useState(null)
    const [picMessage, setPicMessage] = useState(null)
    
    const  dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const {loading, error, userInfo} = userRegister;

    useEffect(() =>{
        if(userInfo){
            if(userInfo.data.UserType == "customer"){
                props.history.push('/abc')
            }
            else if(userInfo.data.UserType == "admin"){
                props.history.push('/AdminHome')
            }
            else if(userInfo.data.UserType == "partner") {
                props.history.push('/PartnerHome')
            }
        }
    }, [userInfo])

    
   const submitHandler = async (e) => {
        e.preventDefault();

        if (Password !== ConfirmPassword) {
            setMessage("Passwords Do Not Match");    
        }
        else{
            dispatch(register(Name, NIC, Email, Password,Phone, Address, UserType));
            

        }  
    };

        

    return (
        <MainScreen title='CUSTOMER REGISTER'>
            <div className="loginContainer">
            <Row className="py-3">
                <Col>
                If You are a Partner.... <Link to="/partnerreg">Click Here to Register</Link>
                </Col>
            </Row>
            {error && <Error variant="danger">{error}</Error>}
            {message && <Error variant = "danger">{message}</Error>}
            {loading && <Loading/>}

            <Form onSubmit={submitHandler}>
            <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control 
                type="Name" 
                value={Name}
                placeholder="Your First and Last Name" 
                onChange={(e) => setName(e.target.value)}
             />
            </Form.Group>

            <Form.Group controlId="NIC">
            <Form.Label>NIC</Form.Label>
            <Form.Control 
                type="NIC" 
                value={NIC}
                placeholder="Your NIC or Passport No:" 
                onChange={(e) => setNIC(e.target.value)}
             />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
                type="Email" 
                value={Email}
                placeholder="Email Address" 
                onChange={(e) => setEmail(e.target.value)}
             />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                value={Password} 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
                type="password" 
                value={ConfirmPassword} 
                placeholder="Confirm Password" 
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control 
                type="Phone" 
                value={Phone} 
                placeholder="Modile Number" 
                onChange={(e) => setPhone(e.target.value)}
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Address">
            <Form.Label>Address</Form.Label>
            <Form.Control 
                type="Address" 
                value={Address} 
                placeholder="Address" 
                onChange={(e) => setAddress(e.target.value)}
            />
            </Form.Group>

            <Form.Group as={Col} controlId="UserType">
            <Form.Label>UserType</Form.Label>
            <Form.Select defaultValue="customer" 
            type="UserType"
            value={UserType}
            onChange={(e) => setUserType(e.target.value)}>
            <option>customer</option>
            </Form.Select>
            </Form.Group>

            <Form.Group className="pic">
            <Form.Label>Choose Youer Profile Picture</Form.Label>
            <Form.Control
              id="custom-file"
              type="file"
              lable="Upload Your Picture Here"
              custom
              onChange={(e) => setPic(e.target.value)}
              
            />
            
            </Form.Group>
            
            
                <Button  variant="primary" type="submit">
                Register
                </Button>
                
                
                
           
        </Form>

            </div>
        </MainScreen>
    )
}

export default Registerpage
