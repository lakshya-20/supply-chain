import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import MainContract from './Abis/Main.json';
import './App.css';
import Admin from './Components/Admin';
import ConsumerComponent from './Components/Consumer';
import FooterComponent from './Components/Footer';
import Manufacturer from './Components/Manufacturer';
import NavbarComponent from './Components/Navbar';
import Register from './Components/Register';

function App() {
  const [mainContract, setMainContract] = useState(undefined);
  const [adminAddress, setAdminAddress] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [role, setRole] = useState(undefined);
  const [stakeholder, setStakeholder] = useState(undefined);
  useEffect(()=>{
    (async () => {
      await loadWeb3();
      await loadBlockchainData();
    })();
  },[])

  useEffect(()=>{
    (async () => {
      await loadStackholderData();
    })();
  },[mainContract])

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
    setAccount(account);
    const networkId = await web3.eth.net.getId();
    const mainContractData = MainContract.networks[networkId];
    if(mainContractData){
      const main = new web3.eth.Contract(MainContract.abi, mainContractData.address)      
      setRole(await main.methods.checkIdentity(account).call());
      setAdminAddress(await main.methods.admin().call());
      setMainContract(main);
    }
  }

  const loadStackholderData = async () => {
    if(role==="Farmer") setStakeholder(await mainContract.methods.findFarmer(account).call());
    else if(["Distributer", "Retailer", "Consumer", "Manufacturer"].includes(role)) setStakeholder(await mainContract.methods.findStakeholder(account).call());
  }

  return (
    <>
    <NavbarComponent mainContract={mainContract} account={account} />
    <div className="App container" style={{marginBottom: "100px", minHeight:"500px"}}>
      {stakeholder?
        <div className="d-flex justify-content-center">
          <div className="col-10 col-sm-8">
            <Card inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
              <CardTitle tag="h5">{stakeholder.name}</CardTitle>
              {role=="Farmer"?
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
                <CardText>Role: {stakeholder.role}</CardText>
              }
            </Card>
          </div>
        </div>
      :
        ""
      }      
      {/* {stakeholder? `Stakeholder Data: ${JSON.stringify(stakeholder)}` : ""} */}
      {role==="NewAddress"? <Register mainContract={mainContract} account={account}/> : ""}
      {role==="Admin"? <Admin mainContract={mainContract} account={account}/> : ""}
      {role==="Manufacturer"? <Manufacturer mainContract={mainContract} account={account}/> : ""}
      {role==="Distributer"? <ConsumerComponent mainContract={mainContract} account={account} role={role}/> : ""}
      {role==="Consumer"? <ConsumerComponent mainContract={mainContract} account={account} role={role}/> : ""}
    </div>
    <FooterComponent 
      mainContract={mainContract} 
      account={account}
      adminAddress = {adminAddress}
      role={role}
    />
    </>
  );
}

export default App;
