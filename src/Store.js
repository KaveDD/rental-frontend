import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from  "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userRedusers';

const reducer = combineReducers({
    //this will contain the reducer
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})

//pass the all user data into a object
const userInfoFromStorage = localStorage.getItem("userInfo")?
    JSON.parse(localStorage.getItem("userInfo")):
    null;

    //pass the values
const initialState = {
    userLogin: {userInfo:userInfoFromStorage},
};

const middleware = [thunk];

// setting up the store
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;