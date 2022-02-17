import { useState } from "react";
import { Row} from 'reactstrap';
import RawProductsComponent from "./RawProducts";
import LaunchProductComponent from "./LaunchProduct";
import ActionCard from "../../Utils/ActionCard";
const Manufacturer = () => {
    const [actionItem, setActionItem] = useState(undefined);
    const actionItems = ["Update Raw Products", "Launch Product", "Transfer Ownership", "Product Info"];  

    return(
        <div className="text-center">
            <h4>Manufacturer Panel</h4>

            <Row className="justify-content-center">
                <ActionCard                    
                    actionItem={actionItems[0]}
                    setActionItem={()=>setActionItem(actionItems[0])}                    
                />                
                <ActionCard                    
                    actionItem={actionItems[1]}
                    setActionItem={()=>setActionItem(actionItems[1])}                    
                />                
                <ActionCard                    
                    actionItem={actionItems[2]}
                    navigationHandle={()=>window.location.href="/transfer"}
                />
                <ActionCard                    
                    actionItem={actionItems[3]}
                    navigationHandle={()=>window.location.href="/product"}
                />                
            </Row>
            <h5>{actionItem}</h5>
            {actionItem===actionItems[0]? <RawProductsComponent /> : ""}
            {actionItem===actionItems[1]? <LaunchProductComponent />: ""}
        </div>
    )
}

export default Manufacturer