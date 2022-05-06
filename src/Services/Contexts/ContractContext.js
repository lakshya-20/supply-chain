import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { contractReducer } from "../Reducers/ContractReducer";

import MainContract from '../../Smart-Contract/ABI/Main.json';
import StakeholderContract from '../../Smart-Contract/ABI/Stakeholder.json';
import FarmerContract from '../../Smart-Contract/ABI/Farmer.json';
import ManufacturerContract from '../../Smart-Contract/ABI/Manufacturer.json';
import ProductContract from '../../Smart-Contract/ABI/Product.json';
import { contractStateMain, contractStateProduct, contractStateStakeholder } from '../Actions/ContractActionCreator';
import { authStateStakeholder } from '../Actions/AuthActionCreator';
import { AuthContext } from "./AuthContext";

export const ContractContext = createContext();
export const ContractContextProvider = ({children}) => {
  const [contractState, contractDispatch] = useReducer(contractReducer, {
    isLoading: false,
    errMess: null,
    mainContract: null,
    stakeholderContract: null,
    productContract: null
  })
  const [networkId, setNetworkId] = useState(null);
  const { authState, authDispatch } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if(authState.isWeb3Enabled){
        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();
        setNetworkId(networkId);
        const main = new web3.eth.Contract(MainContract.abi, MainContract.networks[networkId].address);
        contractDispatch(contractStateMain(main));
        const product  = new web3.eth.Contract(ProductContract.abi, ProductContract.networks[networkId].address);
        contractDispatch(contractStateProduct(product));
      }
    })();
  }, [authState.isWeb3Enabled])

  useEffect(() => {
    (async () => {
      if(authState.isAuthenticated && contractState.mainContract){
        const web3 = window.web3;
        const role = await contractState.mainContract.methods.getRole(authState.address).call();
        if( role === "farmer"){
          const farmer = new web3.eth.Contract(FarmerContract.abi, FarmerContract.networks[networkId].address);
          contractDispatch(contractStateStakeholder(farmer));
        }
        else if(role === 'manufacturer'){
          const manufacturer = new web3.eth.Contract(ManufacturerContract.abi, ManufacturerContract.networks[networkId].address);
          contractDispatch(contractStateStakeholder(manufacturer));
        }
        else {
          const stakeholder = new web3.eth.Contract(StakeholderContract.abi, StakeholderContract.networks[networkId].address);
          contractDispatch(contractStateStakeholder(stakeholder));
        }
      }
    })();
  }, [authState.isAuthenticated, contractState.mainContract])

  useEffect(() => {
    (async () => {
      if(contractState.stakeholderContract){
        let stakeholderDetails = await contractState.stakeholderContract.methods.get(authState.address).call({from: authState.address});
        stakeholderDetails = {
          id: stakeholderDetails.id,
          name: stakeholderDetails.name,
          location: stakeholderDetails.location,
          role: stakeholderDetails.role == "" ? "new" : stakeholderDetails.role,
          isVerified: stakeholderDetails.isVerified
        }
        authDispatch(authStateStakeholder(stakeholderDetails));
      }
    })();
  }, [contractState.stakeholderContract])

  return (
    <ContractContext.Provider value={{contractState, contractDispatch}}>
      {children}
    </ContractContext.Provider>
  )

}