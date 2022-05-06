import { useEffect, useState, useContext } from "react";
import {Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

import { AuthContext } from "../../../Context/Contexts/AuthContext";
import { ContractContext } from "../../../Context/Contexts/ContractContext";
import { toast } from "react-toastify";
const LaunchProductComponent  = () => {
    const { authState } = useContext(AuthContext);
    const {contractState } = useContext(ContractContext);
    const [values, setValues] = useState({
        name: "",
        serialNo: "",
        rawProducts: []
    });
    const [rawProducts, setRawProducts] = useState([]);

    useEffect(()=>{
        (async ()=>{
            const temp = await contractState.manufacturer.methods.getManufacturer(authState.auth.id).call();
            setRawProducts(temp.rawProducts);
        })();
    },[])

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
    const handleSubmit = async(e) => {
        e.preventDefault();
        await contractState.product.methods.addProduct(
            values.serialNo,
            values.name,
            values.rawProducts
        ).send({from: authState.auth.id});
        toast.success("Launched Product");
        setValues({
            ...values,
            "name": "",
            "serialNo": "",
            "rawProducts": []
        })
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">            
                <Form onSubmit={(e)=>handleSubmit(e)} className="col-12 pt-3">
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
                            {rawProducts.map(rawProduct=>{
                                return (
                                    <CustomInput 
                                        type="checkbox" 
                                        value={rawProduct} 
                                        name="raw" 
                                        id={rawProduct+"CustomCheckbox"}
                                        label={rawProduct} 
                                        className="p-2"
                                        onChange={(e) => {handleChange(e)}}
                                    />
                                )
                            })}                            
                        </div>
                    </FormGroup>
                    <Button>Launch</Button>
                </Form>
            </div>
        </div>
    )
}
export default LaunchProductComponent;