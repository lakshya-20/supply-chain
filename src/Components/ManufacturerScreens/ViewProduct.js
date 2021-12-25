import React, { useState } from "react";
import {Button, Form, FormGroup, Input,
    Card, CardTitle, CardText } from 'reactstrap';
const ViewProduct = ({farmerContract, productContract, manufacturerContract, stakeHolderContract, account}) => {
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
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = await productContract.methods.getProduct(serialNo).call();
        console.log(product)
        const manufacturer = await manufacturerContract.methods.getManufacturer(product.manufacturer).call();
        var owner;
        if(product.manufacturer === product.ownership){
            owner = manufacturer;
        }
        else{
            owner = await stakeHolderContract.methods.getStakeHolder(product.ownership).call();
        }
        const rawProductsVerification = {};
        for(var i=0; i<product.rawProducts.length; i++){
            const rawProduct = product.rawProducts[i];
            const farmerAddress = await manufacturerContract.methods.getRawProductInfo(product.manufacturer, rawProduct).call();
            const farmer = await farmerContract.methods.getFarmer(farmerAddress).call();
            rawProductsVerification[rawProduct] = farmer.isVerified;
        }
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
            }
        })
    }

    const renderRawProduct = (rawProduct, isVerified) => {
        return (
            <div className="d-flex justify-content-around">
                <span>{rawProduct}&nbsp;</span>
                {isVerified?
                    <i className="fa fa-check-circle fa-lg" style={{color:"green"}}></i>
                :
                    <i className="fa fa-exclamation fa-lg" style={{color:"yellow"}}></i>
                }
            </div>
        )
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">
                <Form onSubmit={(e)=>handleSubmit(e)} className="col-12 pt-3 text-center">
                    <FormGroup>
                        <Input 
                            type="text"
                            name="serialNo"
                            value={serialNo}
                            placeholder="Product Serial No"
                            onChange={(e) => setSerialNo(e.target.value)}
                            className="text-center"
                        />
                    </FormGroup>
                    <br/>
                    <Button>View Product</Button>
                </Form>
                <br/>
                {productInfo.id?
                    <Card body className="text-left">
                        <div>
                            <CardTitle tag="h5">{productInfo.name}</CardTitle>
                        </div>
                        
                        <CardText>
                            <div className="d-flex justify-content-center">
                                <div className="col-10">
                                    <strong>Raw Products</strong>
                                    <span>
                                        {React.Children.toArray(
                                            Object.keys(productInfo.rawProductsVerification).map((rawProduct)=>{
                                                return (
                                                    renderRawProduct(rawProduct,productInfo.rawProductsVerification[rawProduct])
                                                )
                                            })
                                        )}
                                    </span>
                                    <p/>
                                    <strong>Manufacturer</strong> 
                                    <span className="d-flex justify-content-around">
                                        {productInfo.manufacturer.name}                        
                                        {productInfo.manufacturer.isRenewableUsed?
                                            <i className="fa fa-fire" style={{color:"green"}}></i> 
                                        :
                                            <i className="fa fa-fire" style={{color:"red"}}></i> 
                                        }
                                    </span>
                                    <p/>
                                    <strong>Current Owner</strong> 
                                    <br/>
                                    Name: {productInfo.owner.name}
                                    <br/>
                                    Address: {productInfo.owner.id}
                                </div>
                            </div>                            
                        </CardText>
                    </Card>
                :
                    ""
                }
            </div>
        </div>        
    )
}

export default ViewProduct;