import { useState } from "react";
import { Card, CardText, Row} from 'reactstrap';
import OwnershipComponent from "./ManufacturerScreens/Ownership";
import ViewProduct from "./ManufacturerScreens/ViewProduct";

const ConsumerComponent = ({farmerContract, productContract, manufacturerContract, stakeHolderContract, account, role}) => {
    const [actionItem, setActionItem] = useState(undefined);
    const actionItems = ["View Product", "Transfer Ownership"];
    const RenderActionCard = ({actionItem}) => {
        return (
            <Card body inverse
                style={{ backgroundColor: '#333', borderColor: '#333', height: "100px" }}
                className="col-5 m-1"
                onClick={()=>setActionItem(actionItem)}
            >
                <CardText>{actionItem}</CardText>
            </Card>
        )
    }
    return (
        <div>
            <h4 className="text-center">{role} Panel</h4>
            <Row className="text-center">
                {actionItems.map(actionItem => {
                    return (
                        <RenderActionCard actionItem={actionItem}/>
                    )
                })}
            </Row>
            <h5 className="text-center">{actionItem}</h5>
            {actionItem===actionItems[0]? 
                <ViewProduct 
                    productContract = {productContract} 
                    farmerContract = {farmerContract}
                    manufacturerContract = {manufacturerContract}
                    stakeHolderContract = {stakeHolderContract}
                    account={account}
                /> 
            : ""}
            {actionItem===actionItems[1]? <OwnershipComponent productContract={productContract}  account={account}/>: ""}
        </div>
    )
}
export default ConsumerComponent;