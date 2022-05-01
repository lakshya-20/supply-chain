import { useContext } from "react";

import { AuthContext } from "../../Services/Contexts/AuthContext";
import { ContractContext } from "../../Services/Contexts/ContractContext";
import '../../Assests/Styles/dashboard.page.css';
import MiddleWrapper from './MiddleWrapper';
import TopWrapper from './TopWrapper';
const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const { contractState } = useContext(ContractContext);
  console.log( authState );
  console.log( contractState );
  return (
    <div>
      <TopWrapper/>
      <MiddleWrapper/>
    </div>
  )
}
export default Dashboard;