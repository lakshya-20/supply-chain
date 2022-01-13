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
      <NavbarComponent/>
      <JumbotronComponent/>
      <BrowserRouter>
        <ContractContextProvider>
          <Routing/>
        </ContractContextProvider>
      </BrowserRouter>
      <FooterComponent/>
    </AuthContextProvider>
    </div>
  );
}

export default App;
