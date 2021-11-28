import React, { useState, useEffect } from 'react';
import { Card, CardSubtitle, CardTitle, CardText} from 'reactstrap';
import Manufacturer from '../Manufacturer';
const VerifyManufacturer = ({mainContract,account}) => {
    const [manufacturerDetailArray, setManufacturerDetailArray] = useState([]);
    const verifyManufacturer = async (manufacturerAddress) => {
        if(manufacturerAddress==null) {
            alert("Please provide a address");
            return;
        }
        await mainContract.methods.updateManufacturerRenewable(manufacturerAddress).send({from: account});
        window.location.reload(false);
    }
    useEffect(()=>{
        if(mainContract){
            (async()=>{
                const addressArray =  await mainContract.methods.getManufacturersArray().call();
                var temp=[];
                for(var i=0;i<addressArray.length;i++){
                    temp[i]=await mainContract.methods.findManufacturer(addressArray[i]).call();
                }                
                setManufacturerDetailArray(temp);
            })();
        }
    },[mainContract])
    const renderManufacturerCard=(manufacturer)=>{
        //console.log(manufacturer[0])
        return (
            <Card className="m-1">                
                <CardTitle>{manufacturer[0]}</CardTitle>   
                <CardSubtitle className="text-secondary">{manufacturer[2]}</CardSubtitle>             
                <div className="">
                    {manufacturer[1]?
                        <span className="text-success">
                            Renewable Resources
                        </span>
                    :
                        <span style={{cursor: "pointer"}} onClick={()=>verifyManufacturer(manufacturer[2])}>
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