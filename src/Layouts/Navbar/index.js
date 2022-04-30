import { useContext } from "react";
import { AuthContext } from "../../Services/Contexts/AuthContext";

const Navbar = () => {
  const {authState, connectWallet, logout}  = useContext(AuthContext);
  return (
    <div>
      Navbar
      <br/>
      {"address: " + authState.address +" role: "+  authState.role+" isAuthenticated: "+ authState.isAuthenticated}
      <br/>
      {authState.isAuthenticated? 
        <button onClick={logout}>Logout</button>  
      : 
        <button onClick={connectWallet}>Login</button>
      }
      <br/>
      {authState.errMess}
    </div>
  )
}
export default Navbar;