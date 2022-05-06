import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../Services/Contexts/AuthContext";
import { ContractContext } from "../../../Services/Contexts/ContractContext";
import '../../../Assests/Styles/verify.page.css';
import Toast from "../../../Components/Toast";
import farmer_default from "../../../Assests/Images/admin/rawProducts_o0t5az.jpg";

const RenderFarmer = ({id}) => {
  const {authState} = useContext(AuthContext);
  const {contractState} = useContext(ContractContext);
  const [farmer, setFarmer] = useState({
    id: "00000",
    name: "",
    location: "",
    rawProducts: [],
  });
  useEffect(() => {
    if(contractState.farmerContract){
      (async() => {
        const response = await contractState.farmerContract.methods.getFarmer(id).call({from: id});
        setFarmer(farmer => {
          return {
            ...response.farmer,
            formattedAddress: id.substring(0, 6) + "..." + id.substring(id.length - 4, id.length),
            rawProducts: response.rawProducts
          }
        });
      })();
    }
  }, [])

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
        <div className="col-4">
          <img 
            src={farmer_default}
            width="100%"
          />
        </div>
        <div className="col-8">
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
          <span className="row text-center">
            {farmer.isVerified?
              <span className="">
                <span className="badge bg-success">Verified</span>
              </span>
            :
              <span className="">
                <span 
                  className="badge bg-info" 
                  type="button"
                  onClick={verify}
                >
                  Verify
                </span>
              </span>
            }
          </span>
        </div>
      </div>
    </div>
  )
}
export default RenderFarmer;