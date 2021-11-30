import { useState } from 'react';
import { Card, CardText} from 'reactstrap';
import FarmerRegistration from './RegisterScreens/FarmerRegistration';
import StakeholderRegistration from './RegisterScreens/StakeholderRegistration';



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
        <div className="text-center">
            <h4>Registration Panel</h4>
            <div className="row">
                {["Distributer", "Retailer", "Manufacturer", "Farmer", "Consumer"].map(role => {
                    return (
                        <RenderRoleCard role={role}/>
                    )
                })}
            </div>            
            {role?
                <>
                <strong >{role+" "}</strong> Registration
                <br/>
                <div className="d-flex justify-content-center">
                    {role=="Farmer"?
                        <FarmerRegistration mainContract={mainContract} account={account} role={role}/>
                    :
                        <StakeholderRegistration mainContract={mainContract} account={account} role={role}/>
                    }
                </div>
                </>
            :
                ""
            }
        </div>
    )
}

export default Register;