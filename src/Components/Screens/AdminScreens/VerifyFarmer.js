import React, { useState, useEffect, useContext } from 'react';
import { Card, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import { AuthContext } from '../../../Context/Contexts/AuthContext';
import { ContractContext } from '../../../Context/Contexts/ContractContext';

function VerifyFarmer() {
    const { authState } = useContext(AuthContext);
    const { contractState } = useContext(ContractContext);
    const [farmerDetailsArray, setFarmerDetailsArray] = useState([])
    const verifyFarmer = async (farmerAddress) => {
        if(farmerAddress==null) {
            alert("Please provide a address");
            return;
        }
        await contractState.farmer.methods.verifyFarmer(farmerAddress).send({from: authState.auth.id});
        window.location.reload(false);
    }
    useEffect(()=>{
        if(contractState.farmer){            
            (async ()=>{
                const addressArray =  await contractState.farmer.methods.getFarmersList().call();
                var temp=[];
                for(var i=0;i<addressArray.length;i++){
                    temp[i] = await contractState.farmer.methods.getFarmer(addressArray[i]).call();
                }                
                setFarmerDetailsArray(temp);
            })();           
        }
    },[contractState])
    const renderFarmerCard=(farmer)=>{
        return (
            <Card className="m-1">                
                <CardTitle>{farmer.name}</CardTitle>
                <CardSubtitle className="text-secondary">{farmer.id}</CardSubtitle>
                <CardSubtitle>Raw Products: {JSON.stringify(farmer.rawProducts)}</CardSubtitle>           
                <div className="">
                    {farmer.isVerified?
                        <span className="text-success">
                            Verified
                        </span>
                    :
                        <span style={{cursor: "pointer"}} onClick={()=>verifyFarmer(farmer.id)}>
                            Verify
                        </span>
                    }
                </div>
            </Card>
        )
    }
    return ( 
        <Card body>
            <CardTitle tag="h5">Verify Farmer</CardTitle>
            <CardText>Feature to mark the farmer as a verified farmer.</CardText>            
            <div>                
                {farmerDetailsArray.length>0?
                    farmerDetailsArray.map(farmer=>{
                        return renderFarmerCard(farmer)
                    })
                :
                    <span>No Farmer Exists</span>
                }
            </div>
        </Card>
     );
}

export default VerifyFarmer;