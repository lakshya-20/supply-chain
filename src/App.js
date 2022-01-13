import './App.css';
import {BrowserRouter} from 'react-router-dom'
import FooterComponent from './Components/Footer';
import NavbarComponent from './Components/Navbar';
import Routing from './Routing';


function App() {
  return (
    <div className='App'>
    <NavbarComponent account="{currAddress}" />
    <BrowserRouter>
      <Routing/>
    </BrowserRouter>
    <FooterComponent 
      account="{currAddress}"
      adminAddress = "{adminAddress}"
      role="{currAddressRole}"
    />
    </div>
  );
}

export default App;
