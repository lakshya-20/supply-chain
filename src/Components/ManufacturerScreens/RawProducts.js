import { useState } from "react";
import {Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
const RawProductsComponent = ({mainContract,account}) => {
    const [rawProducts, setRawProducts] = useState([]);
    const [farmerAddresses, setFarmerAddress] = useState({});
    const handleSubmit = async(e) => {     
        e.preventDefault();   
        // setRawProducts(rawProducts.concat("Milk"));
        // setFarmerAddress(rawProducts.concat("0x32644250fc8B2b359771467738b22b2192A6e4E0"));        
        const farmerAddressesArr = [];
        for(var i =0;i<rawProducts.length;i++){
            farmerAddressesArr.push(farmerAddresses[rawProducts[i]]);
        }        
        await mainContract.methods.updateManufacturerRawProducts(
            rawProducts,
            farmerAddressesArr
        ).send({from:account})
    }
    const handleChange = (event) => {
        const { name, value, checked} = event.target;
        if(name==="rawProduct"){
            if(checked) setRawProducts(rawProducts.concat(value));
            else{
                setRawProducts(rawProducts.filter((val)=>(val !== value)));
            }
        }
        else{            
            //setFarmerAddress(farmerAddresses.concat(value));
            farmerAddresses[name] = value;
        }
    }
    return (
        <div>            
            <Form onSubmit={(e)=>handleSubmit(e)} className="col-12 pt-3">                        
                <FormGroup>
                    <Label for="exampleCheckbox">Raw Material</Label>
                    <div className="d-flex justify-content-around">
                    <CustomInput 
                        type="checkbox" 
                        value="Cocoa" 
                        name="rawProduct" 
                        id="exampleCustomCheckbox" 
                        label="Cocoa" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    <CustomInput 
                        type="checkbox" 
                        value="Sugar" 
                        name="rawProduct" 
                        id="exampleCustomCheckbox" 
                        label="Sugar" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    <CustomInput 
                        type="checkbox" 
                        value="Milk" 
                        name="rawProduct" 
                        id="exampleCustomCheckbox" 
                        label="Milk" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    <CustomInput 
                        type="checkbox" 
                        value="Apple" 
                        name="rawProduct"
                        id="exampleCustomCheckbox" 
                        label="Apple" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    </div>
                </FormGroup>
                <FormGroup>
                    {rawProducts.map((rawProduct)=>{
                        return (
                            <>
                            <Label for={rawProduct} sm={2}>{rawProduct}</Label>
                            <Input 
                                type="text"                                                          
                                placeholder="Farmer Address"
                                name={rawProduct}
                                onChange={(e) => {handleChange(e)}}
                            />
                            </>
                        )
                    })}
                </FormGroup>
                <br/>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default RawProductsComponent;