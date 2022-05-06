import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../Services/Contexts/AuthContext";
import { ContractContext } from "../../Services/Contexts/ContractContext";
import Toast from '../Toast';
import '../../Assests/Styles/card.css';
import farmer_default from '../../Assests/Images/farmer_default.jpg';
import { fetchFarmer } from "../../Services/Utils/stakeholder";

const FarmerCard = ({id, farmerObject}) => {
  const {authState} = useContext(AuthContext);
  const {contractState} = useContext(ContractContext);
  const role = authState.stakeholder.role;
  const [farmer, setFarmer] = useState({
    id: "00000",
    name: "",
    location: "",
    rawProducts: [],
  });

  useEffect(() => {
    if(farmerObject){
      setFarmer(farmerObject);
    }
    else if(contractState.farmerContract){
      (async() => {
        setFarmer(await fetchFarmer(authState.address, contractState.farmerContract, id));
      })();
    }
  }, [farmerObject])

  const verify = async () => {
    try{
      await contractState.farmerContract.methods.verify(id).send({from: authState.address});
      setFarmer(farmer => {
        return {
          ...farmer,
          isVerified: true
        }
      })
      Toast("success", "Farmer verified successfully");
    } catch(e){
      Toast("error", e.message);
    }
  }

  return (
    <div className="col-12 col-lg-6 my-1">
      <div className="row d-flex justify-content-around align-items-center">
        <div className="col-12 col-md-4">
          <img 
            src={farmer_default}
            width="100%"
          />
        </div>
        <div className="col-12 col-md-8">
          <span className="card-key">Id: </span>
          <span className="card-value">{farmer.formattedAddress}</span>
          <br/>
          <span className="card-key">Name: </span>
          <span className="card-value">{farmer.name}</span>
          <br/>
          <span className="card-key">Location: </span>
          <span className="card-value">{farmer.location}</span>
          <br/>
          <span className="card-key">Raw Products: </span>
          {farmer.rawProducts.map(rawProduct => (
            <span className="card-value">{rawProduct+", "}</span>
          ))}
          <br/>
          <span className="">
            <span className="card-key"> Verification: </span>
            {farmer.isVerified?
              <span className="">
                <span className="badge bg-success">Verified</span>
              </span>
            :
              <span className="">
                <span className="badge bg-warning">Not Verified</span>
                {role === "admin"?
                  <span 
                    className="badge bg-dark mx-1" 
                    type="button"
                    onClick={verify}
                  >
                    <i class="fa fa-certificate"/>
                    Verify
                  </span>
                : "" }
              </span>
            }
          </span>
        </div>
      </div>
      <hr/>
    </div>
  )
}
export default FarmerCard;