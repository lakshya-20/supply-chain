import { useState } from "react";
import { Card, CardText, Row} from 'reactstrap';
import RawProductsComponent from "./RawProducts";
import LaunchProductComponent from "./LaunchProduct";
const Manufacturer = () => {
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
            {actionItem===actionItems[0]? <RawProductsComponent /> : ""}
            {actionItem===actionItems[1]? <LaunchProductComponent />: ""}
        </div>
    )
}

export default Manufacturer