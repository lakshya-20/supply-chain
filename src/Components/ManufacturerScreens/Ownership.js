import { useState } from "react";
import {Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
const OwnershipComponent = ({mainContract, account}) => {
    const [newAddress, setNewAddress] = useState(undefined);
    const [serialNo, setSerialNo] = useState(undefined);
    const handleSubmit = async () => {
        await mainContract.methods.transferOwnership(newAddress,serialNo).send({from: account});
    }
    return (
        <div>
            <Form onSubmit={()=>handleSubmit()} className="col-12 pt-3">
                <FormGroup>
                    <Input 
                        type="text"
                        name="newAddress"
                        value={newAddress}
                        placeholder="New Owner Address"
                        onChange={(e) => setNewAddress(e.target.value)}
                    />
                </FormGroup>
                <br/>
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
                <Button>Transfer Ownership</Button>
            </Form>
        </div>
    )
}

export default OwnershipComponent;