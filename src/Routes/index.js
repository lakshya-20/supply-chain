import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from '../Services/Contexts/AuthContext';
import Dashboard from '../Pages/Dashboard';
import Products from '../Pages/Products';
import Product from '../Pages/Products/product';
import Register from '../Pages/Register';
import Admin from '../Pages/Admin';
import VerifyFarmer from '../Pages/Admin/VerifyFarmer';
import VerifyManufacturer from '../Pages/Admin/VerifyManufacturer';
import Farmers from '../Pages/Farmers';
import Farmer from '../Pages/Farmers/farmer';
import Manufacturers from '../Pages/Manufacturers';
import Manufacturer from '../Pages/Manufacturers/manufacturer';
import Profile from '../Pages/Profile';

const Routing = () => {
  const {authState}  = useContext(AuthContext);
  const isAuthenticated = authState.isAuthenticated;
  const role = authState.stakeholder.role;
  const isRegistered = authState.stakeholder.isRegistered;
  const authRoutes = () => {
    if(isAuthenticated && !isRegistered) {
      return(
        <>
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:id" element={<Product/>} />
        <Route path="/register" element={<Register/>} />
        </>
      )
    }
    else if(isAuthenticated){
      return(
        <>
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:id" element={<Product/>} />
        </>
      )
    }
  }

  const roleRoutes = () => {
    if(role === 'admin'){
      return(
        <>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/verify/farmer" element={<VerifyFarmer/>} />
        <Route path="/admin/verify/manufacturer" element={<VerifyManufacturer/>} />
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
        </>
      )
    }
    else if(isRegistered){
      return(
        <>
        <Route path="/profile" element={<Profile/>} />
        </>
      )
    }
  }
  
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      {authRoutes()}
      {roleRoutes()}
      <Route path="*" element={<Navigate to="/" replace/>} />
    </Routes>
  )
}
export default Routing;