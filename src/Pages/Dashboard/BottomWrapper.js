import { useContext } from "react";
import { Card, CardBody, Row } from "reactstrap";
import { ContractContext } from "../../Services/Contexts/ContractContext";

const BottomWrapper = () => {
  const {contractState} = useContext(ContractContext);
  const stats = [
    {
      icon: "",
      label: "Products",
      count: contractState.stats.productsCount
    },
    {
      icon: "",
      label: "Transactions",
      count: contractState.stats.transactionsCount
    },
    {
      icon: "",
      label: "Reviews",
      count: contractState.stats.reviewsCount
    }
  ]
  return (
    <div className="bottom-wrapper">
      <h5 className="bw-heading">
        Dashboard Statistics
      </h5>
      <Row className="justify-content-center">
        {stats.map( (stat, index) => (
            <Card className="col-12 col-md-3 border-0 bw-stats-card" key={index}>
              <CardBody>
                <div className="d-flex align-items-center bw-stats-card-body">
                  <div className="d-flex justify-content-around align-items-center bw-stats-card-count">{stat.count}</div>
                  <div className="bw-stats-card-label">{stat.label}</div>
                </div>
              </CardBody>
            </Card>
          ))}
      </Row>
    </div>
  )
}
export default BottomWrapper;