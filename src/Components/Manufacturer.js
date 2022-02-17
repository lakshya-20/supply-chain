import { useState, useEffect } from "react";
import { Card, CardText, Row} from 'reactstrap';
import LaunchProductComponent from "./ManufacturerScreens/LaunchProduct";
import OwnershipComponent from "./ManufacturerScreens/Ownership";
import RawProductsComponent from "./ManufacturerScreens/RawProducts";
const Manufacturer = ({farmerContract, manufacturerContract, productContract, account}) => {
    const [actionItem, setActionItem] = useState(undefined);
    const actionItems = ["Update Raw Products", "Launch Product", "Transfer Ownership"];  

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
        <div className="text-center">
            <h4>Manufacturer Panel</h4>
            <Row>
                {actionItems.map(actionItem => {
                    return (
                        <RenderActionCard actionItem={actionItem}/>
                    )
                })}
            </Row>
            <h5>{actionItem}</h5>
            {actionItem===actionItems[0]? <RawProductsComponent farmerContract={farmerContract} manufacturerContract={manufacturerContract} account={account}/> : ""}
            {actionItem===actionItems[1]? <LaunchProductComponent productContract={productContract} manufacturerContract={manufacturerContract} account={account}/>: ""}
            {actionItem===actionItems[2]? <OwnershipComponent productContract={productContract} account={account}/>: ""}
        </div>
    )
}

export default Manufacturer