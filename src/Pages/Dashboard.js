import { useContext } from "react";
import { AuthContext } from "../Services/Contexts/AuthContext";
import { ContractContext } from "../Services/Contexts/ContractContext";

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const { contractState } = useContext(ContractContext);
  console.log( authState );
  console.log( contractState );
  return (
    <div>
      Dashboard
    </div>
  )
}
export default Dashboard;