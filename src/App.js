import './App.css';
import {BrowserRouter} from 'react-router-dom'
import FooterComponent from './Components/Footer';
import NavbarComponent from './Components/Navbar';
import Routing from './Routing';
import AuthContextProvider from './Context/Contexts/AuthContext';
import ContractContextProvider from './Context/Contexts/ContractContext';


function App() {
  return (
    <div className='App'>
    <AuthContextProvider>
      <NavbarComponent account="{currAddress}" />
      <BrowserRouter>
        <ContractContextProvider>
          <Routing/>
        </ContractContextProvider>
      </BrowserRouter>
      <FooterComponent 
        account="{currAddress}"
        adminAddress = "{adminAddress}"
        role="{currAddressRole}"
      />
    </AuthContextProvider>
    </div>
  );
}

export default App;
