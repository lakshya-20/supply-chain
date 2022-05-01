import { useReducer, createContext, useEffect } from "react";
import { authReducuer } from "../Reducers/AuthReducer";
import { authStateEnableWeb3, authStateLogin, authStateFailed, authStateDisableWeb3, authStateLogout } from '../Actions/AuthActionCreator';
import Web3 from "web3";
import Toast from "../../Components/Toast";

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(authReducuer, {
    isLoading: false,
    errMess: null,
    isWeb3Enabled: false,
    isAuthenticated: false,
    address: null,
    formattedAddress: null,
    stakeholder: {}
  })

  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      authDispatch(authStateEnableWeb3());
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      authDispatch(authStateEnableWeb3());
    }
    else {
      const errMess = "Non-Ethereum browser detected";
      authDispatch(authStateFailed(errMess));
      authDispatch(authStateDisableWeb3());
      Toast("error", errMess);
      throw new Error(errMess);
    }
  }, [])


  const connectWallet = async () => {
    if(authState.isWeb3Enabled) {
      try {
        const selectedAccount = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => accounts[0])
        .catch(() => {
          Toast("error", "Please select an account");
        });
        authDispatch(authStateLogin(selectedAccount));
        Toast("success", "Successfully Logged in");
      } catch( error ) {
        Toast("error", error.message);
      }
    }
  }

  const logout = () => {
    try{
      authDispatch(authStateLogout());
      Toast("success", "Successfully Logged out");
    } catch( error ){
      Toast("error", error.message);
    }
  }

  return (
    <AuthContext.Provider value={{authState, authDispatch, connectWallet, logout}}>
      {children}
    </AuthContext.Provider>
  )
}