import { useContext } from "react";
import { ContractContext } from "../Services/Contexts/ContractContext";

const Dashboard = () => {
  const { contractState } = useContext(ContractContext);
  console.log( contractState );
  return (
    <div>
      Dashboard
    </div>
  )
}
export default Dashboard;