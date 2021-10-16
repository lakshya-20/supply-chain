import { useEffect, useState } from 'react';
import Web3 from 'web3';
import MainContract from './Abis/Main.json';
import './App.css';

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
    <div className="App">
      Admin Address: {adminAddress}
      <br/>
      Current Address: {account}
      <br/>
      Role: {role}
      <br/>
      Stakeholder Data: {JSON.stringify(stakeholder)}
    </div>
  );
}

export default App;
