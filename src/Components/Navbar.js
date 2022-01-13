import React, { useState, useContext } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import { AuthContext } from '../Context/Contexts/AuthContext';
const NavbarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {authState} = useContext(AuthContext);
    return (            
        <Navbar color='dark' dark expand="md" className='px-3'>
            <NavbarBrand className="mr-auto" href="/">
                <img src='https://res.cloudinary.com/dstmsi8qv/image/upload/v1642107674/Supply%20Chain/logo_small_tjpurs.png'/> 
                <span> Global Supply Solutions </span>
            </NavbarBrand>
            <NavbarToggler onClick={()=>{setIsOpen(!isOpen)}} className="navbar-wrapper">
                {isOpen?
                    <i className="fa fa-times"></i>
                :
                    <i className="fa fa-bars"></i>
                }
            </NavbarToggler>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto" navbar>
                    <NavItem>
                        <NavLink href="/transfer">Trasnfer Ownership</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/product">Product Info</NavLink>
                    </NavItem>
                    {authState && authState.auth.id?
                        <NavItem>
                            <NavLink href="#">{authState.auth.name}</NavLink>
                        </NavItem>
                        :
                        <NavItem>
                            <NavLink href="/register">Register</NavLink>
                        </NavItem>
                    }
                </Nav>                
            </Collapse>
        </Navbar>
    );
}

export default NavbarComponent;
