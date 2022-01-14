import React, { useState, useContext, useEffect } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';

import Web3 from 'web3';
import MainContract from '../Abis/Main.json';
import FarmerContract from '../Abis/Farmer.json';
import ManufacturerContract from '../Abis/Manufacturer.json';
import StakeHolderContract from '../Abis/StakeHolder.json';
import ProductContract from '../Abis/Product.json';

import { AuthContext } from '../Context/Contexts/AuthContext';
import { ContractContext } from '../Context/Contexts/ContractContext';
import * as AuthActionCreators from "../Context/ActionCreators/AuthActionCreater";
import * as ContractActionCreators from "../Context/ActionCreators/ContractActionCreater";

const NavbarComponent = () => {
    const { authState, authDispatch } = useContext(AuthContext);
    const { contractState, contractDispatch} = useContext(ContractContext);    
    const [isOpen, setIsOpen] = useState(false);    
    useEffect(()=>{
        (async () => {
            await loadWeb3();
            await loadBlockchainData();
        })();
    },[])
    
    const loadWeb3 = async () =>{
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    
    const loadBlockchainData = async () =>{
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];        
        const networkId = await web3.eth.net.getId();   
        const main = new web3.eth.Contract(MainContract.abi, MainContract.networks[networkId].address);
        const farmer = new web3.eth.Contract(FarmerContract.abi, FarmerContract.networks[networkId].address); 
        const manufacturer = new web3.eth.Contract(ManufacturerContract.abi, ManufacturerContract.networks[networkId].address);
        const stakeholder = new web3.eth.Contract(StakeHolderContract.abi, StakeHolderContract.networks[networkId].address);
        const product = new web3.eth.Contract(ProductContract.abi, ProductContract.networks[networkId].address);        
        if(contractState.main==undefined){
            await contractDispatch(ContractActionCreators.contractMainUpdate(main));
            await contractDispatch(ContractActionCreators.contractFarmerUpdate(farmer));
            await contractDispatch(ContractActionCreators.contractManufacturerUpdate(manufacturer));
            await contractDispatch(ContractActionCreators.contractStakeholderUpdate(stakeholder));
            await contractDispatch(ContractActionCreators.contractProductUpdate(product));
        }
        const adminAddressTemp = await main.methods.adminAddress().call();
        const farmerData = await farmer.methods.getFarmer(account).call();
        const manufacturerData = await manufacturer.methods.getManufacturer(account).call();
        const stakeHolderData = await stakeholder.methods.getStakeHolder(account).call();
        if(account == adminAddressTemp){
            await authDispatch(AuthActionCreators.authStateUpdateRole("Admin"));
        }
        else if(farmerData.isValue) {            
            await authDispatch(AuthActionCreators.authStateUpdate(farmerData));
            await authDispatch(AuthActionCreators.authStateUpdateRole("Farmer"));
        }
        else if(manufacturerData.isValue) {
            await authDispatch(AuthActionCreators.authStateUpdate(manufacturerData));
            await authDispatch(AuthActionCreators.authStateUpdateRole("Manufacturer"));
        }
        else if(stakeHolderData.isValue) {
            await authDispatch(AuthActionCreators.authStateUpdate(stakeHolderData));
            await authDispatch(AuthActionCreators.authStateUpdateRole(stakeHolderData.role));
        }
        else await authDispatch(AuthActionCreators.authStateUpdateRole("New Address"));
    }
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
