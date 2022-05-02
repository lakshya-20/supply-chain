import { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../../Services/Contexts/ContractContext";
import '../../../Assests/Styles/verify.page.css';
import RenderManufacturer from "./renderManufacturer";

const Verifymanufacturer = () => {
  const {contractState} = useContext(ContractContext);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    (async() => {
      if(contractState.manufacturerContract){
        setAddresses(await contractState.manufacturerContract.methods.getAddresses().call());
      }
    })();
  }, [contractState.manufacturerContract])
  return (
    <div className="verify">
      <div className="heading">Verify Manufacturer</div>
      <div className="row">
        {addresses.map(address => (
          <RenderManufacturer id={address} />
        ))}
      </div>
    </div>
  )
}
export default Verifymanufacturer;