import { useContext } from "react";
import { AuthContext } from "../../Services/Contexts/AuthContext";

const Main  = () => {
  const {authState, connectWallet, logout} = useContext(AuthContext);
  console.log(authState)
  return (
    <div>
      Main Component
      <br/>
      {"Logged in? " + authState.isAuthenticated}
      <br/>
      {"address: " + authState.address +" role: "+  authState.role}
      <br/>
      <button onClick={connectWallet}>Login</button>
      <br/>
      <button onClick={logout}>Logout</button>
      <br/>
      {authState.errMess}
    </div>
  )
}
export default Main;