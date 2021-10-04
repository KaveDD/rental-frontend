import React  from 'react';
import styled, { withTheme } from 'styled-components';
import logo from '../../Images/Logo.png';
const Header = ()=>{
    return(
    
      
        <MainContainer>
          <img src={logo} alt="My logo"  style={{ height: 70, width: 70, borderColor: 'gray', borderWidth: 2,  marginBottom: 10 , marginleft:10} }/>
         <h3>ROUTE MASTER VEHICLE RENTAL ...</h3>
         <h6>Call now</h6> 
         <h6>011-23456300</h6>
       
        </MainContainer>
    )
    
}
export default Header;
//main container
    
const MainContainer = styled.header`
  
background-color:black;
  width:100%;
  height: 4rem;
  h3{
    transform:translate(-140%,-50%);
    color:#66a3ff;
    text-shadow: 0 0 1px white, 0 0 1px black;
    font-weigth:3;
    position:absolute;
    top:6%;
    font: 2rem Helvetica (sans-serif);
    left:50%;
  }
 
  h6{
    transform:translate(92%,-340%);
    color:#66a3ff;
   
  }
  h7{
  
    color:#1a75ff;
    transform:translate(79%,-340%);
  }
`;
