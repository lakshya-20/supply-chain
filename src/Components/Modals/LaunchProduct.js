import { useContext, useState, useEffect } from "react"
import { Button, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import '../../Assests/Styles/launchProduct.modal.css';
import { AuthContext } from "../../Services/Contexts/AuthContext"
import { ContractContext } from "../../Services/Contexts/ContractContext";
import Toast from "../Toast";

const LaunchProduct = ({isModalOpen, toggleModal, manufacturerRP}) => {
  const { authState } = useContext(AuthContext);
  const { contractState, updateStats } = useContext(ContractContext);
  const [product, setProduct] = useState({
    id: "",
    title: "",
    selectedRawProducts: {}
  })

  const toggleRP = (rawProductIndex) => {
    setProduct(product => {
      return {
        ...product,
        selectedRawProducts: {
          ...product.selectedRawProducts,
          [rawProductIndex]: !product.selectedRawProducts[rawProductIndex]
        }
      }
    });
  }

  const launch = async () => {
    if(product.id === "" || product.title === "") {
      Toast("error", "Product id and title required!");
      return;
    }
    const selectedRPIndexes = Object.keys(product.selectedRawProducts).filter(key => product.selectedRawProducts[key]);
    const selectedRP = selectedRPIndexes.map(key => {
      return {
        "name": manufacturerRP[key].name,
        "isVerified": manufacturerRP[key].isVerified
      }
    })
    if(selectedRP.length == 0){
      Toast("error", "Please select atleast one raw product");
      return;
    }
    await contractState.productContract.methods.add(product.id, product.title, selectedRP).send({from: authState.address});
    await contractState.manufacturerContract.methods.launchProduct(product.id).send({from: authState.address});
    Toast("success", "Launced Product!");
    setProduct({
      id: "",
      title: "",
      selectedRawProducts: {}
    })
    toggleModal();
    updateStats();
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader>Launch Product </ModalHeader>
        <ModalBody>
          <InputGroup>
            <InputGroupText>
              Product ID
            </InputGroupText>
            <Input placeholder="product id"
              value={product.id}
              onChange={(e) => setProduct(product => ({ ...product, id: e.target.value }))}
            />
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupText>
              Product Title
            </InputGroupText>
            <Input placeholder="product title"
              value={product.title}
              onChange={(e) => setProduct(product => ({ ...product, title: e.target.value }))}
            />
          </InputGroup>
          <div className="row mt-2 justify-content-around">
            {Object.keys(manufacturerRP).map((rawProductIndex) => {
              const rawProduct = manufacturerRP[rawProductIndex];
              return (
                <div className={`
                  col-5 d-flex justify-content-between 
                  align-items-center my-2 mx-1 raw-product-card 
                  ${product.selectedRawProducts[rawProductIndex]? "raw-product-card-selected": ""}
                  `} key={rawProductIndex}
                  onClick={() => toggleRP(rawProductIndex)}
                  type = "button"
                >
                  <span className="raw-product-card-name">{rawProduct.name}</span>
                  {rawProduct.isVerified?
                    <span className="badge bg-success">Verified</span>
                  :
                    <span className="badge bg-warning">Not Verified</span>
                  }
                </div>
              )
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={launch}>Launch</Button>
          {" "}
          <Button onClick={() => {
            setProduct({
              id: "",
              title: "",
              selectedRawProducts: {}
            })
            toggleModal();
          }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default LaunchProduct;