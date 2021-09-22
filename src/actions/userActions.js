import {
     USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS } from "../constants/userConstants"
import axios from 'axios'

export const login =(email, password) => async (dispatch) =>{
 
try {
    //call the reducer
    dispatch({ type: USER_LOGIN_REQUEST});

            const config = {
                headers: {
                   "Content-type":"application/json" 
                },
            };

            
            let reqBody ={
                Email:email,
                Password:password 
            }
            let  data = await axios.post('http://localhost:8092/api/customer/login',reqBody).
            then(function(response){
                       
                return response;
            }); 

            /*const { data } = await axios.post('http://localhost:8092/api/customer/login',
            {
                email,
                password,
            },
            config
            );*/
            
        //if request sussecc then it will call the success reduser and get data
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data})
            
            
            localStorage.setItem('userInfo',JSON.stringify(data));
            

        }
        catch(error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                    error.response && error.response.data.message?
                    error.data.response.message:
                    error.message,
            })
        }
    }

    export const logout = () => async (dispatch) => {
        localStorage.removeItem("userInfo");
        dispatch({ type : USER_LOGOUT});
    }


export const register = (Name, NIC, Email, Password,Phone, Address, UserType) => async (dispatch) =>{
    try{
        dispatch({type: USER_REGISTER_REQUEST});
        const config = {
            headers: {
               "Content-type":"application/json" 
            },
        };

       
        let reqBody ={
            Name:Name,
            NIC:NIC,
            Email:Email,
            Password:Password,
            Phone:Phone,
            Address:Address,
            UserType:UserType

        }
        let  data = await axios.post('http://localhost:8092/api/customer',reqBody).
        then(function(response){
                    
            return response;
        });
//after done user register request calling the register success and get data
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        
        localStorage.setItem('userInfo',JSON.stringify(data));
        
    }
    catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message?
                error.response.data.message:
                error.message,
        }) 
    }

}
