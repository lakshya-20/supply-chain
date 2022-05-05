import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Input, InputGroup } from "reactstrap";

import '../../Assests/Styles/products.page.css';
import ProductCard from "../../Components/Cards/ProductCard";
import { AuthContext } from "../../Services/Contexts/AuthContext";
import { ContractContext } from "../../Services/Contexts/ContractContext";
import { fetchManufacturer } from "../../Services/Utils/stakeholder";
import fake_product from '../../Assests/Images/fake_product.jpg';
import Toast from "../../Components/Toast";

const Products = () => {
  const { authState } = useContext(AuthContext);
  const { contractState } = useContext(ContractContext);
  const [productIds, setProductids] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    if(contractState.productContract){
      (async () => {
        const productIds = await contractState.productContract.methods.getItemIds().call({from: authState.address});        
        setProductids(productIds);
      })();
    }
  },[])

  useEffect(() => {
    if(contractState.productContract){
      (async () => {
        const products = {};
        for(let i = 0; i < productIds.length; i++){
          const response = await contractState.productContract.methods.get(productIds[i]).call({from: authState.address});
          const product = {
            "item": response.item,
            "rawProducts": response.rawProducts,
            "reviews": response.reviews,
            "transactions": response.transactions,
            "manufacturer": await fetchManufacturer(authState.address, contractState.manufacturerContract, response.item["manufacturer"])
          }
          if(product.item.manufacturer != "0x0000000000000000000000000000000000000000"){
            products[productIds[i]] = product;
          }
        }
        console.log(products)
        setProducts(products);
      })();
    }
  }, [productIds])

  return (
    <div className="wrapper">
      <div className="heading">Products</div>
      <div align="center">
        <div className="col-10 col-md-3">
          <InputGroup>
            <Input placeholder="Search" id="search"/>
            <Button onClick={()=> {
              const productId = document.getElementById("search").value;
              if(productId == ""){
                Toast("error", "Please enter a product id");
                return;
              }
              setProductids([productId]);
            }}>Search</Button>
          </InputGroup>
        </div>
      </div>
      <div className="row">
        {Object.keys(products).map(productId => {
          const product = products[productId];
          return(
            <div className="col-12 col-md-6">
              <NavLink className="nav-link" to={`/products/${productId}`} state={{product}}>
                <ProductCard key={productId} product={product} />
              </NavLink>
            </div>  
          )
        })}
        {productIds.length > 0 && Object.keys(products).length === 0 ?
          <div align="center">
            <div className="col-10 col-md-6">
              <img src={fake_product} width="100%" />
              <span>
                No products found
              </span>
            </div>
          </div>
        :
          ""
        }
      </div>

    </div>
  )
}
export default Products;