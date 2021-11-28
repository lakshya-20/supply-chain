import { Row, Col} from 'reactstrap';
import VerifyFarmer from "./VerifyFarmer";
import VerifyManufacturer from "./VerifyManufacturer";
const Admin = ({mainContract,account}) => {
    return (
        <div>
            <h3>Admin Panel</h3>
            <Row>
                <Col sm="6" className="p-1">
                    <VerifyFarmer mainContract={mainContract} account={account}/>
                </Col>
                <Col sm="6" className="p-1">
                    <VerifyManufacturer mainContract={mainContract} account={account}/>
                </Col>
            </Row>
        </div>
    )
}
export default Admin;