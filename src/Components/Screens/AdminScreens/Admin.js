import { Row, Col} from 'reactstrap';
import VerifyFarmer from "./VerifyFarmer";
import VerifyManufacturer from "./VerifyManufacturer";
const Admin = () => {
    return (
        <div className="text-center">
            <h3>Admin Panel</h3>
            <Row>
                <Col sm="6" className="p-1">
                    <VerifyFarmer/>
                </Col>
                <Col sm="6" className="p-1">
                    <VerifyManufacturer/>
                </Col>
            </Row>
        </div>
    )
}
export default Admin;