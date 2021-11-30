import { useState } from "react";
import {Button, Form, FormGroup, Input,
    Card, CardTitle, CardText, Row } from 'reactstrap';
const ViewProduct = ({mainContract, account}) => {
    const [serialNo, setSerialNo] = useState(undefined);
    const [productInfo, setProductInfo] = useState(undefined);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const temp = await mainContract.methods.verifyProduct(serialNo).call();
        // console.log(temp);
        setProductInfo(temp);
    }
    const renderRawProduct = (product, isVerified) => {
        return (
            <div className="d-flex justify-content-around">
                <span>{product}&nbsp;</span>
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
                {productInfo?
                    <Card body className="text-left">
                        <div>
                            <CardTitle tag="h5">{productInfo[0].name}</CardTitle>
                        </div>
                        
                        <CardText>
                            <div className="d-flex justify-content-center">
                                <div className="col-10">
                                    <strong>Raw Products</strong>
                                    <span>
                                        {productInfo[0].rawProducts.map((rawProduct, index)=>{
                                            return (
                                                renderRawProduct(rawProduct,productInfo[0].rawProductsVerification[index])
                                            )
                                        })}
                                    </span>
                                    <strong>Manufacturer</strong> 
                                    <span className="d-flex justify-content-around">
                                        {productInfo[1]}                        
                                        {productInfo[2]?
                                            <i className="fa fa-fire" style={{color:"green"}}></i> 
                                        :
                                            <i className="fa fa-fire" style={{color:"red"}}></i> 
                                        }
                                    </span>
                                    <strong>Current Owner</strong> 
                                    <br/>
                                    Name: {productInfo[3].name}
                                    <br/>
                                    Address: {productInfo[3].id}
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