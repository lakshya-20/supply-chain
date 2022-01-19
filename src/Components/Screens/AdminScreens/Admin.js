import { Row, Col} from 'reactstrap';
import VerifyFarmer from "./VerifyFarmer";
import VerifyManufacturer from "./VerifyManufacturer";
const Admin = ({farmerContract, manufacturerContract, account}) => {
    return (
        <div className="text-center">
            <h3>Admin Panel</h3>
            <Row>
                <Col sm="6" className="p-1">
                    <VerifyFarmer farmerContract={farmerContract} account={account}/>
                </Col>
                <Col sm="6" className="p-1">
                    <VerifyManufacturer manufacturerContract={manufacturerContract} account={account}/>
                </Col>
            </Row>
        </div>
    )
}
export default Admin;