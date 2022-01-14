import { useEffect, useState, useContext } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';

import Admin from './AdminScreens/Admin';
import ConsumerComponent from './Consumer';
import Manufacturer from './Manufacturer';
import Register from './Register';

import { AuthContext } from '../Context/Contexts/AuthContext';
import { ContractContext } from '../Context/Contexts/ContractContext';

const MainComponent = () =>{
    const { authState, authDispatch } = useContext(AuthContext);
    const { contractState, contractDispatch} = useContext(ContractContext);    

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
            return <ConsumerComponent/>
        }
    }

    return (
        <div className=''>
            {renderComponent(authState.role)}
            {/* {stakeholder?
            <div className="d-flex justify-content-center text-center">
                <div className="col-10 col-sm-8">
                <Card inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardTitle tag="h5">{stakeholder.name}</CardTitle>
                    {currAddressRole=="Farmer"?
                    <>
                    <CardText>
                        Role: Farmer
                        <br/>
                        Verification: {stakeholder.isVerified?"Done":"Not Done"}
                        <br/>
                        Raw Products: {JSON.stringify(stakeholder.rawProducts)}
                    </CardText>
                    </>
                    :
                    <CardText>Role: {stakeholder.role==null?"Manufacturer":stakeholder.role}</CardText>
                    }
                </Card>
                </div>
            </div>
            :
            ""
            }            */}                
        </div>
    )
}

export default MainComponent;