import { useContext } from "react";

import { AuthContext } from "../Services/Contexts/AuthContext";
import { ContractContext } from "../Services/Contexts/ContractContext";
import '../Assests/Styles/dashboard.page.css';
import img_cover from '../Assests/Images/dashboard/top_wrapper.jpg';
import img_traceability from '../Assests/Images/dashboard/traceability.jpg';
import img_tradeability from '../Assests/Images/dashboard/tradeability.jpg';
import img_reputation from '../Assests/Images/dashboard/reputation_system.jpg';

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const { contractState } = useContext(ContractContext);
  console.log( authState );
  console.log( contractState );
  return (
    <div>
      <div className="top-wrapper">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-md-6">
            <img src={img_cover} width="100%"/>
          </div>
          <div className="col-12 col-md-6">
            <div className="tw-about text-center">
              <p className="tw-heading">
                Global Supply Solutions🚛 
              </p>
              <p className="tw-sub-heading">
                We plan, implement, and control the movement 
                and storage of goods within a supply chain and 
                between the points of origin and consumption.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="middle-wrapper">
        Middle Wrapper
      </div>
      <div className="bottom-wrapper">
        Bottom Wrapper
      </div>
    </div>
  )
}
export default Dashboard;