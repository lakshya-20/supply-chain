import './App.css';
import {BrowserRouter} from 'react-router-dom'
import FooterComponent from './Components/Footer';
import NavbarComponent from './Components/Navbar';
import Routing from './Routing';
import AuthContextProvider from './Context/Contexts/AuthContext';
import ContractContextProvider from './Context/Contexts/ContractContext';
import JumbotronComponent from './Components/JombotronComponent';


function App() {
  return (
    <div className='App'>
    <AuthContextProvider>
    <ContractContextProvider>
      <NavbarComponent/>
      <JumbotronComponent/>
      <BrowserRouter>        
          <div className='container'>
            <Routing/>
          </div>        
      </BrowserRouter>
      {/* <FooterComponent/> */}
      </ContractContextProvider>
    </AuthContextProvider>
    </div>
  );
}

export default App;
