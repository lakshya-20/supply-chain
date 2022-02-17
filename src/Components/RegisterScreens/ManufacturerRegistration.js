import { useEffect, useState } from 'react';
import {Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
const ManufacturerRegistration = ({farmerContract, manufacturerContract, account}) => {
    const [values, setValues] = useState({
        name: "",
        region: "",
        rawProducts: [],
        farmerAddress: [],
    });
    const [rawFarmerAddresses, setRawFarmerAddress] = useState({});
    const [farmerAddressArray, setFarmerAddressArray] = useState([]);
    useEffect(()=>{
        if(farmerContract){
            (async ()=>{
                const temp = await farmerContract.methods.getFarmersList().call();
                setFarmerAddressArray(temp);
            })();
        }
    },[])
    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        if(name==="rawProduct"){
            if(checked){
                values.rawProducts.push(value);
                setValues({
                    ...values,
                    ["rawProducts"]: values.rawProducts,
                });
            }
            else {
                values.rawProducts = values.rawProducts.filter((val)=>{
                    return val!==value;
                });
            }            
        }
        else{
            setValues({
                ...values,
                [name]: value,
            });
        }        
    };
    const handleRawFarmerAddressChange = (event) => {
        const {name, value} = event.target;
        rawFarmerAddresses[name] = value;
    }
    const handleSubmit =async (e) =>{
        e.preventDefault();       
        for(var i=0; i<values.rawProducts.length; i++){
            values.farmerAddress.push(rawFarmerAddresses[values.rawProducts[i]]);
        } 
        await manufacturerContract.methods.addManufacturer(
            values.name,
            values.rawProducts,
            values.farmerAddress
        ).send({from: account})
        window.location.reload(false);
    }
    return ( 
        <div>
            <Form onSubmit={(e)=>handleSubmit(e)} className="col-12 pt-3">
                <FormGroup>
                    <Input 
                        type="text"
                        name="name"
                        value={values.name}
                        placeholder="Your Name"
                        onChange={(e) => {handleChange(e)}}
                    />
                </FormGroup>
                <br/>               
                <FormGroup>
                    <Label for="exampleCheckbox">Raw Material</Label>
                    <div className="d-flex justify-content-around">
                    <CustomInput 
                        type="checkbox" 
                        value="Cocoa" 
                        name="rawProduct" 
                        id="cocoaCustomCheckbox" 
                        label="Cocoa" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    <CustomInput 
                        type="checkbox" 
                        value="Sugar" 
                        name="rawProduct" 
                        id="sugarCustomCheckbox" 
                        label="Sugar" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    <CustomInput 
                        type="checkbox" 
                        value="Milk" 
                        name="rawProduct" 
                        id="milkCustomCheckbox" 
                        label="Milk" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    <CustomInput 
                        type="checkbox" 
                        value="Apple" 
                        name="rawProduct"
                        id="appleCustomCheckbox" 
                        label="Apple" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    </div>
                </FormGroup>
                <FormGroup>
                    {values.rawProducts.map((rawProduct)=>{
                        return (
                            <div className="d-flex justify-content-between my-2">
                                <Label for={rawProduct} sm={2}>{rawProduct}</Label>
                                <Input
                                    type="select"
                                    placeholder="Farmer Address"
                                    name={rawProduct}
                                    onChange={(e) => {handleRawFarmerAddressChange(e)}}
                                >
                                    <option>Select Farmer</option>
                                    {farmerAddressArray.map(farmerAddress=>{
                                        return (<option value={farmerAddress}>{farmerAddress}</option>)
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
     );
}
 
export default ManufacturerRegistration;