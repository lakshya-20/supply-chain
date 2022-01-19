import React, { useState, useContext } from "react";
import { ContractContext } from "../../Context/Contexts/ContractContext";
import styles from "../Styles/productInfo.module.css"

const ProductInfo = () => {
    const {contractState, contractDispatch} = useContext(ContractContext);
    const [serialNo, setSerialNo] = useState(undefined);
    const [productInfo, setProductInfo] = useState({
        id: undefined,
        name: "",
        rawProductsVerification: {},
        manufacturer:{
            id: "",
            name: "",
            isRenewableUsed: false
        },
        owner: {
            id: "",
            name: ""
        },
        status: null
    });

    const handleSubmit = async () => {
        setProductInfo({
            ...productInfo,
            status: "loading"
        })
        const product = await contractState.product.methods.getProduct(serialNo).call();
        console.log(product)
        const manufacturer = await contractState.manufacturer.methods.getManufacturer(product.manufacturer).call();
        var owner;
        if(product.manufacturer === product.ownership){
            owner = manufacturer;
        }
        else{
            owner = await contractState.stakeholder.methods.getStakeHolder(product.ownership).call();
        }
        const rawProductsVerification = {};
        for(var i=0; i<product.rawProducts.length; i++){
            const rawProduct = product.rawProducts[i];
            const farmerAddress = await contractState.manufacturer.methods.getRawProductInfo(product.manufacturer, rawProduct).call();
            const farmer = await contractState.farmer.methods.getFarmer(farmerAddress).call();
            rawProductsVerification[rawProduct] = farmer.isVerified;
        }        
        setTimeout(()=>{
            setProductInfo({
                ...productInfo,
                id: product.id,
                name: product.name,
                rawProductsVerification: rawProductsVerification,
                manufacturer: {
                    id: manufacturer.id,
                    name: manufacturer.name,
                    isRenewableUsed: manufacturer.isRenewableUsed,
                },
                owner:{
                    id: owner.id,
                    name: owner.name   
                },
                status: "loaded"
            })
        }, 3000)
    }

    const renderRawProduct = (rawProduct, isVerified) => {
        return (
            <div className="d-flex justify-content-between p-1">
                <span className={`${styles.thirdHeading}`}>{rawProduct}&nbsp;</span>
                {isVerified?                    
                    <span className={`${styles.rawProductVerified}`}>
                        Verified&nbsp;
                        <i className="fa fa-check-circle fa-lg" style={{color:"green"}}></i>
                    </span>
                :
                    <span className={`${styles.rawProductNotVerified}`}>
                        Not Verified&nbsp;
                        <i className="fa fa-exclamation fa-lg" style={{color:"black"}}></i>
                    </span>
                }
            </div>
        )
    }
    return (
        <div className="">
            <div className="d-flex justify-content-center">
                <div className={`${styles.search} col-10 col-md-3 col-lg-2`}>
                    <input type="text" className={`${styles.searchTerm}`} placeholder="Product Serial No" onChange={(e) => setSerialNo(e.target.value)}
                    onKeyUp={(e)=>{
                        if(e.keyCode===13){
                            handleSubmit();
                        }
                    }}/>
                    <button type="submit" className={`${styles.searchButton}`} onClick={()=>handleSubmit()}>
                        <i className="fa fa-search"></i>
                    </button>                
                </div>                
            </div>    
            <hr/>  
            {productInfo.status===null?                
                <div className="text-center">
                    <img 
                        className={`${styles.statusImg}`}
                        src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1642173473/Supply%20Chain/search_mthxfk.jpg"
                    />
                </div>                
            :
                ""
            }
            {productInfo.status==="loading"?                
                <div className="text-center">
                    <img 
                        className={`${styles.statusImg}`}
                        src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1642167226/Supply%20Chain/searching_oginrn.gif"
                    />
                </div>                
            :
                ""
            }
            {productInfo.status==="loaded" && productInfo.id?                
                <>                
                <div className="col-12 text-center">
                    <span className={`${styles.firstHeading}`}>{productInfo.name}</span>                    
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-lg-4 text-center">                                                
                        <img src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1642164799/Supply%20Chain/rawProducts_o0t5az.jpg"
                            className={`${styles.productImg}`}
                        />
                    </div>
                    <div className="col-12 col-sm-12 col-lg-4 text-center">
                        <span className={`${styles.secondHeading}`}>Ingredients</span>
                        <br/>
                        <span>
                            {React.Children.toArray(
                                Object.keys(productInfo.rawProductsVerification).map((rawProduct)=>{
                                    return (
                                        renderRawProduct(rawProduct,productInfo.rawProductsVerification[rawProduct])
                                    )
                                })
                            )}
                        </span>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-4 text-center">
                        <span className={`${styles.secondHeading}`}>Manufacturer</span>
                        <span className={`${styles.thirdHeading} d-flex justify-content-between`}>
                            {productInfo.manufacturer.name}                        
                            {productInfo.manufacturer.isRenewableUsed?
                                <i className="fa fa-fire" style={{color:"green"}}></i> 
                                :
                                <i className="fa fa-fire" style={{color:"red"}}></i> 
                            }
                        </span>
                        <span className={`${styles.secondHeading}`}>Owner</span>
                        <br/>
                        <span className={`${styles.thirdHeading}`}>
                            {productInfo.owner.name}
                        </span>
                        <br/>
                        <span className={`${styles.thirdHeading}`}>
                            {productInfo.owner.id}
                        </span>
                    </div>
                </div>
                </>
            :
                ""
            }
            {productInfo.status==="loaded" && productInfo.id==""?
                <div className="text-center">
                    <img 
                        className={`${styles.statusImg} text-center`}
                        src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1642170258/Supply%20Chain/52Z_2110.w012.n001.9B.p12.9_mbn62s.jpg" 
                    />
                </div>    
            :
                ""
            }
        </div>
    )
}

export default ProductInfo;