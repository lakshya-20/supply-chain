import { useState } from "react";
import {Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
const LaunchProductComponent  = ({mainContract, account}) => {
    const [values, setValues] = useState({
        name: "",
        serialNo: "",
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
    const handleSubmit = async() => {
        await mainContract.methods.launchProduct(
            values.name,
            values.rawProducts,
            values.serialNo
        ).send({from: account});
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">            
                <Form onSubmit={()=>handleSubmit()} className="col-12 pt-3">
                    <FormGroup>
                        <Input 
                            type="text"
                            name="name"
                            value={values.name}
                            placeholder="Product Name"
                            onChange={(e) => {handleChange(e)}}
                        />
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <Input 
                            type="text"
                            name="serialNo"
                            value={values.serialNo}
                            placeholder="Serial No"
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
                    <Button>Launch</Button>
                </Form>
            </div>
        </div>
    )
}
export default LaunchProductComponent;