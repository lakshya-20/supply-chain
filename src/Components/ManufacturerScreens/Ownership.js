import { useState } from "react";
import {Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
const OwnershipComponent = ({mainContract, account}) => {
    const [newAddress, setNewAddress] = useState(undefined);
    const [serialNo, setSerialNo] = useState(undefined);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await mainContract.methods.transferOwnership(newAddress,serialNo).send({from: account});
        window.location.reload(false);
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">
                <Form onSubmit={(e)=>handleSubmit(e)} className="col-12 pt-3 text-center">
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
        </div>
    )
}

export default OwnershipComponent;