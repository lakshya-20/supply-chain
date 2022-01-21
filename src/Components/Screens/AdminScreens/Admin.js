import { Row, Col} from 'reactstrap';
import VerifyFarmer from "./VerifyFarmer";
import VerifyManufacturer from "./VerifyManufacturer";
import styles from '../../Styles/admin.module.css';
const Admin = () => {
    return (
        <div className="text-center">
            <span className={styles.firstHeading}>Admin Panel</span>
            <Row>
                <Col sm="6" className="p-1">
                    <div className={styles.secondHeading}>
                        Verify Farmer
                    </div>
                    <div className={styles.thirdHeading}>
                        Feature to mark the farmer as a verified farmer.
                    </div>
                    <VerifyFarmer/>
                </Col>
                <Col sm="6" className="p-1">
                <div className={styles.secondHeading}>
                        Verify Manufacturer
                    </div>
                    <div className={styles.thirdHeading}>
                        Feature to mark the Manufacturer energy resource.
                    </div>
                    <VerifyManufacturer/>
                </Col>
            </Row>
        </div>
    )
}
export default Admin;