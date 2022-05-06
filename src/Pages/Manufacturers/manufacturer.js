import { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ManufacturerCard from "../../Components/Cards/ManufacturerCard";
import AddRawProduct from "../../Components/Modals/AddRawProduct";
import { AuthContext } from "../../Services/Contexts/AuthContext";
import { ContractContext } from "../../Services/Contexts/ContractContext";
import { fetchManufacturer } from "../../Services/Utils/stakeholder";

const Manufacturer = () => {
  const { authState } = useContext(AuthContext);
  const { contractState } = useContext(ContractContext);
  const [manufacturerAddress, setManufacturerAddress] = useState(authState.address);
  const [manufacturer, setManufacturer] = useState({
    rawProducts: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (contractState.manufacturerContract) {
      (async () => {
        await loadManufacturer();
      })();
    }
  }, [])

  const loadManufacturer = async () => {
    if (contractState.manufacturerContract) {
      setManufacturer(await fetchManufacturer(authState.address, contractState.manufacturerContract, manufacturerAddress));
    }
  }

  const toggleModalOpen = async () => {
    setIsModalOpen(!isModalOpen);
    await loadManufacturer();
  }

  return (
    <div>
      <AddRawProduct isModalOpen={isModalOpen} toggleModalOpen={toggleModalOpen} />
      <div className="d-flex justify-content-center">
        <ManufacturerCard id={manufacturerAddress} manufacturerObject={manufacturer}/>
      </div>
      <div className="row">
        <span className="text-center heading">Raw Products</span>
        <i className="text-center fa fa-plus fa-2x" onClick={toggleModalOpen} type="button"/>
        {manufacturer.rawProducts.map((rawProduct, index) => (
          <div key={index} className="col-12 col-md-6 my-2">
            <Card className="border-dark rounded">
              <CardBody>
                <CardTitle className="">
                  <div className="d-flex justify-content-between">
                    <span>{rawProduct.name}</span>
                    <span>
                      {rawProduct.isVerified ? 
                        <span className="badge bg-success">Verified</span>
                      :
                        <span className="badge bg-danger">Not Verified</span>
                      }
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="badge bg-dark">Suppliers</span>
                    <br/>
                    {rawProduct.boughtFromIds.map((boughtFromId, index) => (
                      <span className="badge bg-secondary ">
                        {boughtFromId}
                      </span>
                    ))}
                  </div>
                </CardTitle>
              </CardBody>
            </Card>
          </div>
          ))}
      </div>
    </div>
  )
}
export default Manufacturer;