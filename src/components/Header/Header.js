import React from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
const AdminNavbar = () => {
    const history = useHistory();
    const handleClick = (path) => {
        history.push(path);
    }

    return (
        <NavbarContainer>
        <nav className="navbar navbar-expand-lg navbar-light ">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
                <ul className="navbar-nav mr-auto">
                    <li onClick={() => handleClick("/home")} className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    
                    <li onClick={() => handleClick("/admin/vehicles/")} className="nav-item active">
                        <a className="nav-link" href="#">Vehicles</a>
                    </li>
                    <li onClick={() => handleClick("/admin/vehicles/CreateVehicle")} className="nav-item active">
                        <a className="nav-link" href="#">Create Vehicle</a>
                    </li>
                    <li onClick={() => handleClick("/admin/categories/")} className="nav-item active">
                        <a className="nav-link" href="#">Categories</a>
                    </li>
                    <li onClick={() => handleClick("/admin/orders")} className="nav-item active">
                        <a className="nav-link" href="#">Orders</a>
                    </li>
                </ul>
            </div>
        </nav >
        </NavbarContainer>
    );
}

export default AdminNavbar;
//main navbar container
const NavbarContainer = styled.div` 
background: black;
.nav-link{
color:white !important;
&:hover{
    background-image: linear-gradient(to right top, black, black);
    height: 30px;  /* this doesn't work */
   
}
 ul{
     margin-left="67%"
 }
`;