import { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ManufacturerCard from "../../Components/Cards/ManufacturerCard";
import ProductCard from "../../Components/Cards/ProductCard";
import AddRawProduct from "../../Components/Modals/AddRawProduct";
import LaunchProduct from "../../Components/Modals/LaunchProduct";
import { AuthContext } from "../../Services/Contexts/AuthContext";
import { ContractContext } from "../../Services/Contexts/ContractContext";
import { fetchProduct } from "../../Services/Utils/product";
import { fetchManufacturer } from "../../Services/Utils/stakeholder";

const Manufacturer = () => {
  const { authState } = useContext(AuthContext);
  const { contractState } = useContext(ContractContext);
  const [manufacturerAddress, setManufacturerAddress] = useState(authState.address);
  const [manufacturer, setManufacturer] = useState({
    rawProducts: [],
    launchedProducts: [],
  });
  const [isRPModalOpen, setIsRPModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    if (contractState.manufacturerContract) {
      (async () => {
        await loadManufacturer();
      })();
    }
  }, [])

  const loadManufacturer = async () => {
    if (contractState.manufacturerContract) {
      const manufacturerObject = await fetchManufacturer(authState.address, contractState.manufacturerContract, manufacturerAddress);
      const launchedProducts = [];
      for (let i = 0; i < manufacturerObject.launchedProductIds.length; i++) {
        const launchedProduct = await fetchProduct(authState.address, contractState.productContract, manufacturerObject.launchedProductIds[i]);
        launchedProduct["manufacturer"] = manufacturerObject;
        launchedProducts.push(launchedProduct);
      }
      setManufacturer({
        ...manufacturerObject,
        launchedProducts,
      });
    }
  }

  const toggleRPModal = async () => {
    setIsRPModalOpen(!isRPModalOpen);
    await loadManufacturer();
  }

  const toggleProductModal = async () => {
    setIsProductModalOpen(!isProductModalOpen);
    await loadManufacturer();
  }

  return (
    <div>
      <AddRawProduct isModalOpen={isRPModalOpen} toggleModalOpen={toggleRPModal} />
      <LaunchProduct isModalOpen={isProductModalOpen} toggleModal={toggleProductModal} manufacturerRP={manufacturer.rawProducts} />
      <div className="d-flex justify-content-center">
        <ManufacturerCard id={manufacturerAddress} manufacturerObject={manufacturer}/>
      </div>
      <div className="row d-flex align-items-start">
        <div className="col-12 col-md-6">
          <span className="d-flex justify-content-around">
            <span className="text-center heading">Raw Products</span>
            <i className="text-center fa fa-plus fa-2x" onClick={toggleRPModal} type="button"/>
          </span>
          {manufacturer.rawProducts.map((rawProduct, index) => (
            <div key={index} className="col-12 my-2">
              <Card className="border-dark rounded">
                <CardBody>
                  <CardTitle className="">
                    <div className="d-flex justify-content-between align-items-center">
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
        <div className="col-12 col-md-6">
          <span className="d-flex justify-content-around align-items-center">
            <span className="text-center heading">Launched Products</span>
            <i className="text-center fa fa-plus fa-2x" onClick={toggleProductModal} type="button"/>
          </span>
          {manufacturer.launchedProducts.map((product, index) => (
            <div key={index} className="col-12 my-2">
              <ProductCard product={product}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Manufacturer;