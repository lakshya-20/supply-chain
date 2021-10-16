import { useState } from 'react';
import {Button, Form, FormGroup, Input } from 'reactstrap';

const StakeholderRegistration = ({mainContract,account,role}) => {
    const [values, setValues] = useState({
        name: ""
    });
    const handleChange = (event) => {
        const { name, value} = event.target;
        setValues({
            ...values,
            [name]: value,
        });     
    };
    const handleSubmit =async () =>{        
        await mainContract.methods.registerStakeHolder(
            values.name,
            role
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
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default StakeholderRegistration;