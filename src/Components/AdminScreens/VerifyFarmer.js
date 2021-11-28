import React, { useState, useEffect } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Input, FormText, CardSubtitle } from 'reactstrap';
function VerifyFarmer({mainContract,account}) {
    const [farmerAddressArray, setFarmerAddressArray] = useState([]);
    const [farmerDetailsArray, setFarmerDetailsArray] = useState([])
    const verifyFarmer = async (farmerAddress) => {
        if(farmerAddress==null) {
            alert("Please provide a address");
            return;
        }
        await mainContract.methods.verifyFarmer(farmerAddress).send({from: account});
        window.location.reload(false);
    }
    useEffect(()=>{
        if(mainContract){            
            (async ()=>{
                console.log(await mainContract.methods.farmers("0x6288260D9Bb7032d6acc33739B1F96d1162b02Da").call())
                const addressArray =  await mainContract.methods.getFarmersArray().call();
                var temp=[];
                for(var i=0;i<addressArray.length;i++){
                    temp[i]=await mainContract.methods.findFarmer(addressArray[i]).call();
                }
                setFarmerAddressArray(addressArray);
                setFarmerDetailsArray(temp);
            })();           
        }
    },[mainContract])
    const renderFarmerCard=(farmer)=>{
        return (
            <Card className="m-1">                
                <CardTitle>{farmer.name}</CardTitle>
                <CardSubtitle>{farmer.id}</CardSubtitle>
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
                {farmerDetailsArray.map(farmer=>{
                    return renderFarmerCard(farmer)
                })}
            </div>
        </Card>
     );
}

export default VerifyFarmer;