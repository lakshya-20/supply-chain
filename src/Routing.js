import { Navigate, Routes, Route} from "react-router-dom";
import MainComponent from "./Components/MainComponent";
import ProductInfo from "./Components/ProductInfo.Component";
const Routing = () => {
    return (
        <Routes>
            <Route exact path="/" element={<MainComponent />} />
            <Route exact path="/product" element={<ProductInfo />} />
            <Route exact path="/transfer" element={<MainComponent />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
export default Routing;