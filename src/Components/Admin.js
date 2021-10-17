import { useState } from "react";
import { Card, Button, CardTitle, CardText, Row, Col,
    Form, FormGroup, Label, Input, CustomInput, FormText } from 'reactstrap';
const Admin = ({mainContract,account}) => {
    const [farmerAddress, setFarmerAddress] = useState(null);
    const [manufacturerAddress, setManufacturerAddress] = useState(null);
    const verifyFarmer = async () => {
        if(farmerAddress==null) {
            alert("Please provide a address");
            return;
        }
        await mainContract.methods.verifyFarmer(farmerAddress).send({from: account});
    }
    const verifyManufacturer = async () => {
        if(manufacturerAddress==null) {
            alert("Please provide a address");
            return;
        }
        await mainContract.methods.updateManufacturerRenewable(manufacturerAddress).send({from: account});
    }
    return (
        <div>
            Admin Panel
            <Row>
                <Col sm="6">
                    <Card body>
                    <CardTitle tag="h5">Verify Farmer</CardTitle>
                    <CardText>Feature to mark the farmer as a verified farmer.</CardText>
                    <Input 
                        type="text"
                        name="farmerAddress"
                        value={farmerAddress}
                        placeholder="Farmer Address"
                        onChange={(e) => {setFarmerAddress(e.target.value)}}
                    />
                    <br/>
                    <Button onClick={()=>verifyFarmer()}>Verify</Button>
                    {farmerAddress}
                    <FormText color="muted">
                        By clicking VERIFY you make sure that the farmer has been verified physically.
                    </FormText>
                    </Card>
                </Col>
                <Col sm="6">
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
                    {farmerAddress}
                    <FormText color="muted">
                        By clicking VERIFY you make sure that the Manufacturer uses the renewable resouces.
                    </FormText>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default Admin;