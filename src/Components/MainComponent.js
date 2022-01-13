import { useEffect, useState, useContext } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import Web3 from 'web3';

import MainContract from '../Abis/Main.json';
import FarmerContract from '../Abis/Farmer.json';
import ManufacturerContract from '../Abis/Manufacturer.json';
import StakeHolderContract from '../Abis/StakeHolder.json';
import ProductContract from '../Abis/Product.json';

import Admin from './AdminScreens/Admin';
import ConsumerComponent from './Consumer';
import Manufacturer from './Manufacturer';
import Register from './Register';

import { AuthContext } from '../Context/Contexts/AuthContext';
import { ContractContext } from '../Context/Contexts/ContractContext';
import * as AuthActionCreators from "../Context/ActionCreators/AuthActionCreater";
import * as ContractActionCreators from "../Context/ActionCreators/ContractActionCreater";


const MainComponent = () =>{
    const { authState, authDispatch } = useContext(AuthContext);
    const { contractState, contractDispatch} = useContext(ContractContext);    

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
        await contractDispatch(ContractActionCreators.contractMainUpdate(main));
        await contractDispatch(ContractActionCreators.contractFarmerUpdate(farmer));
        await contractDispatch(ContractActionCreators.contractManufacturerUpdate(manufacturer));
        await contractDispatch(ContractActionCreators.contractStakeholderUpdate(stakeholder));
        await contractDispatch(ContractActionCreators.contractProductUpdate(product));
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

    const renderComponent = (role) =>{
        if(role==="New Address"){
            return <Register/> 
        }
        else if(role==="Manufacturer"){
            return  <Manufacturer/>
        }
        else if(role==="Consumer"){
            return <ConsumerComponent/>
        }
        else if(role==="Admin"){
            return <Admin/>
        }
    }

    return (
        <div className='container'>
            {renderComponent(authState.role)}
            {/* {stakeholder?
            <div className="d-flex justify-content-center text-center">
                <div className="col-10 col-sm-8">
                <Card inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardTitle tag="h5">{stakeholder.name}</CardTitle>
                    {currAddressRole=="Farmer"?
                    <>
                    <CardText>
                        Role: Farmer
                        <br/>
                        Verification: {stakeholder.isVerified?"Done":"Not Done"}
                        <br/>
                        Raw Products: {JSON.stringify(stakeholder.rawProducts)}
                    </CardText>
                    </>
                    :
                    <CardText>Role: {stakeholder.role==null?"Manufacturer":stakeholder.role}</CardText>
                    }
                </Card>
                </div>
            </div>
            :
            ""
            }            */}                
        </div>
    )
}

export default MainComponent;