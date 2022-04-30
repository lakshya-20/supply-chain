import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from '../Services/Contexts/AuthContext';
import Dashboard from '../Pages/Dashboard';
import Products from '../Pages/Products';
import Product from '../Pages/Products/product';
import Register from '../Pages/Register';
import Admin from '../Pages/Admin';
import VerifyFarmer from '../Pages/Admin/verifyFarmer';
import VerifyManufacturer from '../Pages/Admin/verifyManufacturer';
import Farmers from '../Pages/Farmers';
import Farmer from '../Pages/Farmers/farmer';
import Manufacturers from '../Pages/Manufacturers';
import Manufacturer from '../Pages/Manufacturers/manufacturer';
import LaunchProduct from '../Pages/Manufacturers/launchProduct';

const Routing = () => {
  const {isAuthenticated, role}  = useContext(AuthContext);
  
  const authRoutes = () => {
    if(isAuthenticated && role){
      return(
        <>
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:id" element={<Product/>} />
        </>
      )
    }
    else if(isAuthenticated){
      return(
        <>
        <Route path="/register" element={<Register/>} />
        </>
      )
    }
  }

  const roleRoutes = () => {
    if(role === 'admin'){
      return(
        <>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/verfiy/farmer" element={<VerifyFarmer/>} />
        <Route path="/admin/verfiy/manufacturer" element={<VerifyManufacturer/>} />
        </>
      )
    }
    else if(role === 'farmer'){
      return(
        <>
        <Route path="/farmers" element={<Farmers/>} />
        <Route path="/farmers/:id" element={<Farmer/>} />
        </>
      )
    }
    else if(role === 'manufacturer'){
      return(
        <>
        <Route path="/manufacturers" element={<Manufacturers/>} />
        <Route path="/manufacturers/:id" element={<Manufacturer/>} />
        <Route path="/manufacturers/launchProduct" element={<LaunchProduct/>} />
        </>
      )
    }
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        {authRoutes()}
        {roleRoutes()}
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default Routing;