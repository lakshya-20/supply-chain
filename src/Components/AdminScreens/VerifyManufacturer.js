import React, { useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Input, FormText } from 'reactstrap';
const VerifyManufacturer = ({mainContract,account}) => {
    const [manufacturerAddress, setManufacturerAddress] = useState(null);
    const verifyManufacturer = async () => {
        if(manufacturerAddress==null) {
            alert("Please provide a address");
            return;
        }
        await mainContract.methods.updateManufacturerRenewable(manufacturerAddress).send({from: account});
    }
    return ( 
        <Card body>
            <CardTitle tag="h5">Verify Manufacturer</CardTitle>
            <CardText>Feature to mark the Manufacturer energy resource</CardText>
            <Input 
                type="text"
                name="manufacturerAddress"
                value={manufacturerAddress}
                placeholder="Manufacturer Address"
                onChange={(e) => {setManufacturerAddress(e.target.value)}}
            />
            <br/>
            <Button onClick={()=>verifyManufacturer()}>Verify</Button>
            {manufacturerAddress}
            <FormText color="muted">
                By clicking VERIFY you make sure that the Manufacturer uses the renewable resouces.
            </FormText>
        </Card>
    );
}
 
export default VerifyManufacturer;