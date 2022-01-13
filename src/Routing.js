import { Routes, Route} from "react-router-dom";
import MainComponent from "./Components/MainComponent";
const Routing = () => {
    return (
        <Routes>
            <Route exact path="/" element={<MainComponent />} />
            <Route exact path="/product" element={<MainComponent />} />
            <Route exact path="/trasfer" element={<MainComponent />} />
            <Route path="/" element={<MainComponent />} />
        </Routes>
    );
};
export default Routing;