import { useContext, useEffect, useState } from 'react';

import '../../Assests/Styles/product.page.css';
import product_default from '../../Assests/Images/product_default.jpg';
import { useLocation } from 'react-router-dom';
import { fetchManufacturer, formattedAddress } from '../../Services/Utils/stakeholder';
import { ContractContext } from '../../Services/Contexts/ContractContext';
import { AuthContext } from '../../Services/Contexts/AuthContext';
import Toast from '../../Components/Toast';
const Product = () => {
  const location = useLocation();
  const { authState } = useContext(AuthContext);
  const { contractState } = useContext(ContractContext);
  const [product, setProduct] = useState(location.state.product);
  const [transferState, setTransferState] = useState({
    from: authState.address,
  });

  const reload = async () => {
    const id = location.state.product.item.id;
    const response = await contractState.productContract.methods.get(id).call({from: authState.address});
    const product = {
      "item": response.item,
      "rawProducts": response.rawProducts,
      "reviews": response.reviews,
      "transactions": response.transactions,
      "manufacturer": await fetchManufacturer(authState.address, contractState.manufacturerContract, response.item["manufacturer"])
    }
    setProduct(product);
  }

  const transfer = async () => {
    await contractState.productContract.methods.transfer(transferState.to, product.item.id).send({from: authState.address});
    // setProduct(product => {
    //   return {
    //     ...product,
    //     "transactions": [
    //       ...product.transactions,
    //       {
    //         "from": transferState.from,
    //         "to": transferState.to,
    //         "date": new Date().toDateString(),
    //       }
    //     ]
    //   }
    // });
    await reload();
    Toast("success", "Product transferred successfully");
    setTransferState({
      from: authState.address,
    });
    // .on('transactionHash', hash => {
    //   console.log(hash);
    // })
    // .on('receipt', receipt => {
    //   console.log(receipt);
    // })
    // .on('confirmation', (confirmationNumber, receipt) => {
    //   console.log(confirmationNumber, receipt);
    // })
    // .on('error', error => {
    //   console.log(error);
    // })
  }

  const features = [
    {
      "icon": <i className="fa fa-certificate fa-2x"/>,
      "label": "Verified Products"
    },
    {
      "icon": <i className="fa fa-shield fa-2x"/>,
      "label": "Secured Transactions"
    },
    {
      "icon": <i className="fa fa-rotate-left fa-2x"/>,
      "label": "Return Policy"
    },
    {
      "icon": <i className="fa fa-lock fa-2x"/>,
      "label": "Blockchain Delivered"
    },
    {
      "icon": <i className="fa fa-check fa-2x"/>,
      "label": "Verified Products"
    }
  ]
  return (
    <div className="wrapper">
      <div className="row top-wrapper">
        <div className="col-12 col-md-4 tw-left">
          <img src={product_default} width="100%"/>
        </div>
        <div className="col-12 col-md-8 tw-right">
          <span className="tw-heading1">
            {product.item["title"]}
          </span>
          <br/>
          <span className='tw-product-stats'>
            <span>
              {product.item["rating"]/10} &nbsp;| &nbsp;
            </span>
            <span>
              {product.reviews.length} ratings &nbsp;| &nbsp;
            </span>
            <span>
              {product.transactions.length} transactions
            </span>
          </span>
          <br/>
          <span className='tw-features d-flex justify-content-around'>
            {features.map(feature => (
              <span className='text-center'>
                {feature.icon}
                <br/>
                <span>{feature.label}</span>
              </span>
            ))}
          </span>
          <span className='tw-brand'>
            Brand: {product.manufacturer["name"]}
          </span>
          <br/>
          <span className='tw-seller text-wrap'>
            Sold by: {`${product.item["currentOwner"].substring(0,6)}...${product.item["currentOwner"].substring(product.item["currentOwner"].length-6)}`}
          </span>
          <br/>
          <div className='tw-transfer-wrapper'>
            <input type="text" placeholder='address' onChange={
              (e) => {
                setTransferState({
                  ...transfer,
                  to: e.target.value
                })
              }
            }/>
            &nbsp;
            &nbsp;
            <button onClick={transfer}>Transfer</button>
          </div>
        </div>
      </div>
      <hr/>
      <div className="middle-wrapper">
        <span className='heading'>
          Ingredients
        </span>
        <br/>
        <span>
          {product.rawProducts.map(rawProduct => (
            <span className='me-2'>
              {rawProduct["name"]} 
              {rawProduct["isVerified"]?
                <i className='fa fa-check'/>
              :
                <i className='fa fa-exclamation'/>
              }
            </span>
          ))}
        </span>
      </div>
      <hr/>
      <div className="bottom-wrapper">
        <div className='row'>
          <div className='col-12 col-md-6'>
            <span className='heading'>
              Transactions
            </span>
            {product.transactions.map(transaction => (
              <div className='my-1 border'>
                Transfer From {formattedAddress(transaction["from"])}
                <br/>
                {new Date(transaction["date"] * 1000).toDateString()}
              </div>
            ))}
          </div>
          <div className='col-12 col-md-6'>
            <span className='heading'>
              Reviews
            </span>
            {product.reviews.map(review => (
              <div className='my-1 border'> 
                {review["rating"]/10} &nbsp; {formattedAddress(review["reviewer"])} &nbsp;
                <span className='badge bg-success'>Verified Review</span>
                <br/>
                Reviewed on: {new Date(review["date"] * 1000).toDateString()}
                <br/>
                {review["comment"]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Product;