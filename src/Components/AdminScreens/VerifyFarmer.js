import React, { useState, useEffect } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Input, FormText, CardSubtitle } from 'reactstrap';
function VerifyFarmer({farmerContract, account}) {
    const [farmerDetailsArray, setFarmerDetailsArray] = useState([])
    const verifyFarmer = async (farmerAddress) => {
        if(farmerAddress==null) {
            alert("Please provide a address");
            return;
        }
        await farmerContract.methods.verifyFarmer(farmerAddress).send({from: account});
        window.location.reload(false);
    }
    useEffect(()=>{
        if(farmerContract){            
            (async ()=>{
                const addressArray =  await farmerContract.methods.getFarmersList().call();
                var temp=[];
                for(var i=0;i<addressArray.length;i++){
                    temp[i] = await farmerContract.methods.getFarmer(addressArray[i]).call();
                }                
                setFarmerDetailsArray(temp);
            })();           
        }
    },[farmerContract])
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