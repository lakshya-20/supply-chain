import { useState, useEffect } from "react";
import { Card, CardText, Row} from 'reactstrap';
import RawProductsComponent from "./ManufacturerScreens/RawProducts";
const Manufacturer = ({mainContract,account}) => {
    // const [stakeholder, setStakeholder] = useState(undefined);
    const [manufacturerData, setManufacturerData] = useState(undefined);
    const [actionItem, setActionItem] = useState(undefined);
    const actionItems = ["Update Raw Products", "Launch Product", "Transfer Ownership"];
    useEffect(()=>{
        (async() =>{
            if(mainContract!=undefined){
                // setStakeholder(await mainContract.methods.findStakeholder(account).call());
                setManufacturerData(await mainContract.methods.findManufacturer(account).call());
            }
        })();
    },[mainContract])
    useEffect(()=>{
        console.log(manufacturerData);
    },[manufacturerData])
    const RenderActionCard = ({actionItem}) => {
        return (
            <Card body inverse
                style={{ backgroundColor: '#333', borderColor: '#333', height: "100px" }}
                className="col-12 col-sm-3 m-1"
                onClick={()=>setActionItem(actionItem)}    
            >
                <CardText>{actionItem}</CardText>
            </Card>
        )
    }
    return(
        <div>
            {JSON.stringify(manufacturerData)}
            <Row>
                {actionItems.map(actionItem => {
                    return (
                        <RenderActionCard actionItem={actionItem}/>
                    )
                })}
            </Row>
            <h3>{actionItem}</h3>
            {actionItem===actionItems[0]? <RawProductsComponent mainContract={mainContract} account={account}/> : ""}
        </div>
    )
}

export default Manufacturer