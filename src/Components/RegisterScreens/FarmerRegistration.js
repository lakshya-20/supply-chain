import { useState } from 'react';
import {Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

const FarmerRegistration = ({mainContract,account,role}) => {
    const [values, setValues] = useState({
        name: "",
        region: "",
        isVerified: false,
        isValue: false,
        rawProducts: []
    });
    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        if(name==="raw"){
            if(checked){
                values.rawProducts.push(value);
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
    const handleSubmit =async () =>{        
        await mainContract.methods.registerFarmer(
            values.name,
            values.region,
            values.rawProducts
        ).send({from: account})
    }
    return(
        <div>
            <Form onSubmit={()=>handleSubmit()} className="col-12 pt-3">
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
                    <Input 
                        type="select" 
                        name="region"  
                        onChange={(e) => {handleChange(e)}}                   
                    >
                    <option>Select Region</option>
                    <option>South India</option>
                    <option>North India</option>
                    <option>East India</option>
                    <option>West India</option>
                    </Input>
                </FormGroup>                
                <FormGroup>
                    <Label for="exampleCheckbox">Raw Material</Label>
                    <div className="d-flex justify-content-around">
                    <CustomInput 
                        type="checkbox" 
                        value="Cocoa" 
                        name="raw" 
                        id="exampleCustomCheckbox" 
                        label="Cocoa" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    <CustomInput 
                        type="checkbox" 
                        value="Sugar" 
                        name="raw" 
                        id="exampleCustomCheckbox" 
                        label="Sugar" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    <CustomInput 
                        type="checkbox" 
                        value="Milk" 
                        name="raw" 
                        id="exampleCustomCheckbox" 
                        label="Milk" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    <CustomInput 
                        type="checkbox" 
                        value="Apple" 
                        name="raw"
                        id="exampleCustomCheckbox" 
                        label="Apple" 
                        className="p-2"
                        onChange={(e) => {handleChange(e)}}
                    />
                    </div>
                </FormGroup>
                <br/>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default FarmerRegistration;