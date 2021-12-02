import { useState, useEffect } from "react";
import {Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
const RawProductsComponent = ({mainContract,account}) => {
    const [rawProducts, setRawProducts] = useState([]);
    const [farmerAddresses, setFarmerAddress] = useState({});
    const [farmerDetailsArray, setFarmerDetailsArray] = useState([])
    useEffect(()=>{
        if(mainContract){            
            (async ()=>{
                const addressArray =  await mainContract.methods.getFarmersArray().call();
                var temp=[];
                for(var i=0;i<addressArray.length;i++){
                    temp[i]=await mainContract.methods.findFarmer(addressArray[i]).call();
                }                
                setFarmerDetailsArray(temp);
            })();           
        }
    },[mainContract])
    const handleSubmit = async(e) => {     
        e.preventDefault();   
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
            farmerAddresses[name] = value;
        }
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">            
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
                                <div className="d-flex justify-content-between my-2">
                                    <Label for={rawProduct} sm={2}>{rawProduct}</Label>
                                    <Input
                                        type="select"
                                        placeholder="Farmer Address"
                                        name={rawProduct}
                                        onChange={(e) => {handleChange(e)}}
                                    >
                                        <option>Select Farmer</option>
                                        {farmerDetailsArray.map(farmerDetails=>{
                                            return (<option value={farmerDetails[0]}>{farmerDetails[1] + " (" + farmerDetails[0] + ")"}</option>)
                                        })}
                                    </Input>
                                </div>
                            )
                        })}
                    </FormGroup>
                    <br/>
                    <Button>Submit</Button>
                </Form>
            </div>
        </div>        
    )
}

export default RawProductsComponent;