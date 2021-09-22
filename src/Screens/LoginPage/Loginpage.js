import React, { useEffect } from 'react'
import {useState} from "react"
import { Form, Button, Row, Col } from 'react-bootstrap'
import {Link} from "react-router-dom"
import MainScreen from '../../components/MainScreen'
import './Loginpage.css' 
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

const Loginpage = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // to call user actions
    const dispatch = useDispatch();
    
    //access state

    const userLogin = useSelector(state => state.userLogin);
    const {loading,error, userInfo} = userLogin;

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

    const submitHandler = async (e) =>{
        e.preventDefault()
       
     //call action
     
     dispatch(login(email,password));
    }

    return (
        <MainScreen title='LOGIN'>
        <div className='loginContainer'>
            {error && <Error variant="danger">{error}</Error>}
            {loading && <Loading />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="email" 
                value={email}
                placeholder="Enter email" 
                onChange={(e) => setEmail(e.target.value)}
             />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                value={password} 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>
            
            
                <Button  variant="primary" type="submit">
                Login
                </Button>
                
                <Button  className='btn' variant="primary" type="submit">
                 Staff Login
                </Button>
                
           
        </Form>
            <Row className="py-3">
                <Col>
                New Customer Or Partner? <Link to="/register">Register Here</Link>
                </Col>
            </Row>
        </div>
        </MainScreen>
    )
}

export default Loginpage
