import { useContext } from "react";
import { Navigate, Routes, Route} from "react-router-dom";
import MainComponent from "./Components/MainComponent";
import ProductInfo from "./Components/ProductInfo.Component";
import Register from "./Components/Register";
import { AuthContext } from "./Context/Contexts/AuthContext";

const Routing = () => {
    const {authState} = useContext(AuthContext)
    return (
        <Routes>
            {authState.auth.id?
                <>
                <Route exact path="/" element={<MainComponent />} />
                <Route exact path="/product" element={<ProductInfo />} />
                <Route exact path="/transfer" element={<MainComponent />} />
                <Route path="*" element={<Navigate to="/" />} />
                </>
            :
                <>
                <Route exact path="/" element={<MainComponent />} />
                <Route exact path="/product" element={<ProductInfo />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/transfer" element={<MainComponent />} />
                <Route path="*" element={<Navigate to="/" />} />
                </>
            }            
        </Routes>
    );
};
export default Routing;