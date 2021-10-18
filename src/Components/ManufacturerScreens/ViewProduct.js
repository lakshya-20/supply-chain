import { useState } from "react";
import {Button, Form, FormGroup, Input,
    Card, CardTitle, CardText } from 'reactstrap';
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
            <div>
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
        <div>
            <Form onSubmit={(e)=>handleSubmit(e)} className="col-12 pt-3">
                <FormGroup>
                    <Input 
                        type="text"
                        name="serialNo"
                        value={serialNo}
                        placeholder="Product Serial No"
                        onChange={(e) => setSerialNo(e.target.value)}
                    />
                </FormGroup>
                <br/>
                <Button>View Product</Button>
            </Form>
            <br/>
            {productInfo?
                <Card body>
                    <CardTitle tag="h5">{productInfo[0].name}</CardTitle>
                    <CardText>
                        <strong>Raw Products</strong>
                        {productInfo[0].rawProducts.map((rawProduct, index)=>{
                            return (
                                renderRawProduct(rawProduct,productInfo[0].rawProductsVerification[index])
                            )
                        })}
                        <strong>Manufacturer</strong> 
                        <br/>
                        {productInfo[1]}                        
                        {productInfo[2]?
                            <i className="fa fa-fire" style={{color:"green"}}></i> 
                        :
                            <i className="fa fa-fire" style={{color:"red"}}></i> 
                        }
                        <br/>
                        <strong>Current Owner</strong> 
                        <br/>
                        Name: {productInfo[3].name}
                        <br/>
                        Address: {productInfo[3].id}
                    </CardText>
                </Card>
            :
                ""
            }
        </div>
    )
}

export default ViewProduct;