import { useState } from 'react';
import { Card, Button, CardTitle, CardText,
    Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import FarmerRegistration from './RegisterScreens/FarmerRegistration';



const Register = ({mainContract,account}) => {
    const [role, setRole] = useState(undefined);
    const [stakeholderData, setStakeholderData] = useState(undefined);
    const RenderRoleCard = ({role}) => {
        return (
            <Card body inverse 
                style={{ backgroundColor: '#333', borderColor: '#333', height: "100px" }}
                className="col-5 col-xl-5 m-1"
                onClick={()=>setRole(role)}    
            >
                <CardText>{role}</CardText>
            </Card>
        )
    }
    return (
        <div>
            {"Register here"}
            <div className="row">
                {["Distributer", "Retailer", "Manufacturer", "Farmer", "Consumer"].map(role => {
                    return (
                        <RenderRoleCard role={role}/>
                    )
                })}
            </div>
            {role}
            <br/>
            {account}
            <div className="d-flex justify-content-center">
                {role=="Farmer"?
                    <FarmerRegistration mainContract={mainContract} account={account} role={role}/>
                :
                    ""
                }
            </div>
        </div>
    )
}

export default Register;