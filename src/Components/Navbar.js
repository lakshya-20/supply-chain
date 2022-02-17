import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import logo from '../logo.png';
const NavbarComponent = ({mainContract, account}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (            
        <Navbar color="dark" dark expand="md">
            <NavbarBrand className="col-sm-3 col-md-2 mr-0">
                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
                &nbsp; FOOD SUPPLY CHAIN
            </NavbarBrand>
            {/* <NavbarToggler onClick={()=>setIsOpen(!isOpen)} /> */}
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto" navbar>
                    {/* <NavItem>
                        <NavLink href="/components/">Trasnfer Ownership</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/components/">Product Info</NavLink>
                    </NavItem> */}
                    <small className="text-secondary">
                        <small id="account">{account}</small>
                    </small>
                </Nav>                
            </Collapse>
        </Navbar>
    );
}

export default NavbarComponent;
