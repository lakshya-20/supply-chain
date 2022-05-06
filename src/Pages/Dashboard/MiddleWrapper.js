import Carousel from "react-multi-carousel";
import { Card, CardBody, CardImg, CardTitle } from "reactstrap";
import img_traceability from '../../Assests/Images/dashboard/traceability.jpg';
import img_tradeability from '../../Assests/Images/dashboard/tradeability.jpg';
import img_reputation_system from '../../Assests/Images/dashboard/reputation_system.jpg';

const MiddleWrapper = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const features = [
    {
      image: img_traceability,
      title: "Traceability",
      description: "Mechanism to track the origin of a product, and the chain of distribution. This helps to ensure that the product is safe and secure."
    },
    {
      image: img_tradeability,
      title: "Tradeability",
      description: "Mechanism to trade a product with other stakeholders. This helps to ensure that the product is original and authentic."
    },
    {
      image: img_reputation_system,
      title: "Reputation System",
      description: `Mechanism to  allow users to rate product in marketplace in order to build trust through reputation.`
    }
  ]
  return (
    <div className="middle-wrapper">
      <h5 className="mw-heading" >
        Stay <b>"Consumer Ready"</b> with Blockchain Powered End To End Consumer Experience Platform
      </h5>
      <Carousel responsive={responsive}>
        {features.map((feature, index) => (
          <Card className="border-0" key={index} >
            <CardImg
              src = {feature.image}
              height = "300px"
            />
            <CardBody>
              <CardTitle tag="h5" className="text-center text-uppercase mw-heading">
                {feature.title}
              </CardTitle>
              <span className="mw-sub-heading">
                {feature.description}
              </span>
            </CardBody>
          </Card>
        ))}
      </Carousel>
      <hr/>
    </div>
  )
}
export default MiddleWrapper;