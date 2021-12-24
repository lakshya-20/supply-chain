import { useState } from 'react';
import {Button, Form, FormGroup, Input } from 'reactstrap';

const StakeholderRegistration = ({stakeHolderContract, account, role}) => {
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
    const handleSubmit =async (e) =>{        
        e.preventDefault();
        await stakeHolderContract.methods.addStakeHolder(
            values.name,
            role
        ).send({from: account})
        window.location.reload(false);
    }
    return(
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
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default StakeholderRegistration;