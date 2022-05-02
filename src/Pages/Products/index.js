import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import '../../Assests/Styles/products.page.css';
import ProductCard from "../../Components/Cards/ProductCard";
import { AuthContext } from "../../Services/Contexts/AuthContext";
import { ContractContext } from "../../Services/Contexts/ContractContext";
import { fetchManufacturer } from "../../Services/Utils/stakeholder";

const Products = () => {
  const { authState } = useContext(AuthContext);
  const { contractState } = useContext(ContractContext);
  const [productIds, setProductids] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    if(contractState.productContract){
      (async () => {
        const productIds = await contractState.productContract.methods.getItemIds().call({from: authState.address});        
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
          products[productIds[i]] = product;
        }
        setProducts(products);
        setProductids(productIds);
      })();
    }
  },[])

  return (
    <div className="wrapper">
      <div className="heading">Products</div>
      <div className="row">
        {productIds.map((id, index) => (
          <div className="col-12 col-md-6">
            <NavLink className="nav-link" to={`/products/${id}`} state={{product: products[id]}}>
              <ProductCard key={index} product={products[id]} />
            </NavLink>
          </div>
        ))}
      </div>

    </div>
  )
}
export default Products;