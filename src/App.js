import { useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import './App.css';
import Web3 from 'web3';

import MainContract from './Abis/Main.json';
import FarmerContract from './Abis/Farmer.json';
import ManufacturerContract from './Abis/Manufacturer.json';
import StakeHolderContract from './Abis/StakeHolder.json';
import ProductContract from './Abis/Product.json';

import Admin from './Components/AdminScreens/Admin';
import ConsumerComponent from './Components/Consumer';
import FooterComponent from './Components/Footer';
import Manufacturer from './Components/Manufacturer';
import NavbarComponent from './Components/Navbar';
import Register from './Components/Register';

function App() {
  const [mainContract, setMainContract] = useState(undefined);
  const [farmerContract, setFarmerContract] = useState(undefined);
  const [manufacturerContract, setManufacturerContract] = useState(undefined);
  const [stakeHolderContract, setStakeHolderContract] = useState(undefined);
  const [productContract, setProductContract] = useState(undefined);
  
  const [adminAddress, setAdminAddress] = useState(undefined);
  const [currAddress, setCurrAddress] = useState(undefined);
  const [currAddressRole, setCurrAddressRole] = useState(undefined);
  const [stakeholder, setStakeholder] = useState(undefined);

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
    setCurrAddress(account);
    const networkId = await web3.eth.net.getId();   
    const main = new web3.eth.Contract(MainContract.abi, MainContract.networks[networkId].address);
    const farmer = new web3.eth.Contract(FarmerContract.abi, FarmerContract.networks[networkId].address); 
    const manufacturer = new web3.eth.Contract(ManufacturerContract.abi, ManufacturerContract.networks[networkId].address);
    const stakeHolder = new web3.eth.Contract(StakeHolderContract.abi, StakeHolderContract.networks[networkId].address);
    const product = new web3.eth.Contract(ProductContract.abi, ProductContract.networks[networkId].address);
    await Promise.all([
      setMainContract(main),
      setFarmerContract(farmer),
      setManufacturerContract(manufacturer),
      setStakeHolderContract(stakeHolder),
      setProductContract(product)
    ]);
    const adminAddressTemp = await main.methods.adminAddress().call();
    setAdminAddress(adminAddressTemp);
    const farmerData = await farmer.methods.getFarmer(account).call();
    const manufacturerData = await manufacturer.methods.getManufacturer(account).call();
    const stakeHolderData = await stakeHolder.methods.getStakeHolder(account).call();
    if(account == adminAddressTemp){
      setCurrAddressRole("Admin");
    }
    else if(farmerData.isValue) {
      setCurrAddressRole("Farmer");
      setStakeholder(farmerData);
    }
    else if(manufacturerData.isValue) {
      setCurrAddressRole("Manufacturer");
      setStakeholder(manufacturerData);
    }
    else if(stakeHolderData.isValue) {
      setCurrAddressRole(stakeHolderData.role);
      setStakeholder(stakeHolderData);
    }
    else setCurrAddressRole("NewAddress");
  }

  return (
    <>
    <NavbarComponent account={currAddress} />
    <div className="App container" style={{marginBottom: "100px", minHeight:"500px"}}>
      {stakeholder?
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
      }           
      {/* {role==="NewAddress"? <Register mainContract={mainContract} account={account}/> : ""}
      {role==="Admin"? <Admin mainContract={mainContract} account={account}/> : ""}
      {role==="Manufacturer"? <Manufacturer mainContract={mainContract} account={account}/> : ""}
      {role==="Distributer"? <ConsumerComponent mainContract={mainContract} account={account} role={role}/> : ""}
      {role==="Consumer"? <ConsumerComponent mainContract={mainContract} account={account} role={role}/> : ""} */}
      {currAddressRole==="NewAddress"? 
        <Register 
          farmerContract = {farmerContract} 
          manufacturerContract = {manufacturerContract} 
          stakeHolderContract = {stakeHolderContract}
          account={currAddress}
        /> 
      : ""}
      {currAddressRole==="Admin"? 
        <Admin 
          farmerContract = {farmerContract} 
          manufacturerContract = {manufacturerContract}
          account = {currAddress}
        /> 
      : ""}
      {currAddressRole==="Manufacturer"? 
        <Manufacturer 
        farmerContract = {farmerContract}
        manufacturerContract = {manufacturerContract}
        productContract = {productContract}
        account = {currAddress}
        /> 
      : ""}
      {["Distributer","Consumer"].includes(currAddressRole) ? 
        <ConsumerComponent 
          farmerContract = {farmerContract}
          productContract = {productContract}
          manufacturerContract = {manufacturerContract}
          stakeHolderContract = {stakeHolderContract}
          account={currAddress} 
          role={currAddressRole}
        /> 
      : ""}
    </div>
    <FooterComponent 
      account={currAddress}
      adminAddress = {adminAddress}
      role={currAddressRole}
    />
    </>
  );
}

export default App;
