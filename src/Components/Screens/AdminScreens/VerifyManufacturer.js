import React, { useState, useEffect, useContext } from 'react';
import { Card, CardSubtitle, CardTitle, CardText} from 'reactstrap';
import { AuthContext } from '../../../Context/Contexts/AuthContext';
import { ContractContext } from '../../../Context/Contexts/ContractContext';

const VerifyManufacturer = () => {
    const { authState } = useContext(AuthContext);
    const { contractState } = useContext(ContractContext);
    const [manufacturerDetailArray, setManufacturerDetailArray] = useState([]);
    
    useEffect(()=>{
        if(contractState.manufacturer){
            (async()=>{
                const addressArray =  await contractState.manufacturer.methods.getManufacturersList().call();
                var temp=[];
                for(var i=0;i<addressArray.length;i++){
                    temp[i]=await contractState.manufacturer.methods.getManufacturer(addressArray[i]).call();
                }                
                setManufacturerDetailArray(temp);
            })();
        }
    },[contractState])

    const verifyManufacturer = async (manufacturerAddress) => {
        if(manufacturerAddress==null) {
            alert("Please provide a address");
            return;
        }
        await contractState.manufacturer.methods.verifyManufacturer(manufacturerAddress).send({from: authState.auth.id});
        window.location.reload(false);
    }
    
    const renderManufacturerCard=(manufacturer)=>{
        return (
            <Card className="m-1">                
                <CardTitle>{manufacturer.name}</CardTitle>   
                <CardSubtitle className="text-secondary">{manufacturer.id}</CardSubtitle>             
                <CardSubtitle>Raw Products: {JSON.stringify(manufacturer.rawProducts)}</CardSubtitle>           
                <div className="">
                    {manufacturer.isRenewableUsed?
                        <span className="text-success">
                            Renewable Resources
                        </span>
                    :
                        <span style={{cursor: "pointer"}} onClick={()=>verifyManufacturer(manufacturer.id)}>
                            Verify
                        </span>
                    }
                </div>
            </Card>
        )
    }
    return ( 
        <Card body>
            <CardTitle tag="h5">Verify Manufacturer</CardTitle>
            <CardText>Feature to mark the Manufacturer energy resource</CardText>            
            <div>
                {manufacturerDetailArray.length>0?
                    manufacturerDetailArray.map(manufacturer=>{
                        return renderManufacturerCard(manufacturer)
                    })
                :
                    <span>No Manufacturer Exists</span>
                }
            </div>
        </Card>
    );
}
 
export default VerifyManufacturer;