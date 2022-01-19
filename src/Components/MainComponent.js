import { useContext } from 'react';
import { Card, CardTitle, CardText, CardGroup, CardBody, CardImg, Row } from 'reactstrap';

import Admin from './Screens/AdminScreens/Admin';
import Manufacturer from './Screens/ManufacturerScreens';
import Register from './Screens/RegisterScreens';

import { AuthContext } from '../Context/Contexts/AuthContext';
import ActionCard from './Utils/ActionCard';

const MainComponent = () =>{
    const { authState } = useContext(AuthContext);    

    const renderComponent = (role) =>{
        if(role==="New Address"){
            return <Register/> 
        }
        else if(role==="Manufacturer"){
            return  <Manufacturer/>
        }        
        else if(role==="Admin"){
            return <Admin/>
        }        
        else{
            return(
                <Row className="justify-content-center">               
                    <ActionCard                    
                        actionItem="Transfer Ownership"
                        navigationHandle={()=>window.location.href="/transfer"}
                    />
                    <ActionCard                    
                        actionItem="Product Info"
                        navigationHandle={()=>window.location.href="/product"}
                    />                
                </Row>
            )
        }
    }

    return (
        <div className=''>
            <CardGroup>
                <Card className='border-0'>
                    <CardImg
                        alt="Transparency"
                        src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1642606117/Supply%20Chain/Homescreen/transparency_cw4chx.jpg"
                        top
                        width="100%"
                        height="300px"
                    />
                    <CardBody>
                    <CardTitle tag="h5">
                        Transparency
                    </CardTitle>                    
                    <CardText>
                        Blockchain builds communication between partners. This builds a streamlined process with shorter lead times, reduced redundancy, fewer delays, and ultimately a leaner supply chain.
                    </CardText>                    
                    </CardBody>
                </Card>
                <Card className='border-0'>
                    <CardImg
                        alt="Card image cap"
                        src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1642606134/Supply%20Chain/Homescreen/security_kshfuh.jpg"
                        top
                        width="100%"
                        height="300px"
                    />
                    <CardBody>
                    <CardTitle tag="h5">
                        Security
                    </CardTitle>                    
                    <CardText>
                        Blockchain ensure the supply chain data stays guarded against cyber attacks (which are becoming more regular these days), blockchain is an ideal solution.
                    </CardText>                    
                    </CardBody>
                </Card>
                <Card className='border-0'>
                    <CardImg
                        alt="Customer Engagement"
                        src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1642606121/Supply%20Chain/Homescreen/customerEngagement_upd3d5.jpg"
                        top
                        width="100%"
                        height="300px"
                    />
                    <CardBody>
                    <CardTitle tag="h5">
                        Customer Engagement
                    </CardTitle>                    
                    <CardText>
                        Data sharing creates a new level of transparency with the consumer in a way that builds deeper client relationships and loyalty
                    </CardText>                    
                    </CardBody>
                </Card>
            </CardGroup>      
            {renderComponent(authState.role)}         
        </div>
    )
}
export default MainComponent;