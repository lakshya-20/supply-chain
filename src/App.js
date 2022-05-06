import { BrowserRouter } from 'react-router-dom';
import './Assests/Styles/app.css';
import ErrorBoundary from './Layouts/ErrorBoundary';
import Main from './Layouts/Main';
import Navbar from './Layouts/Navbar';
import { AuthContextProvider } from './Services/Contexts/AuthContext';
import { ContractContextProvider } from './Services/Contexts/ContractContext';

function App() {
  return (
    <div className='App'>
      <ErrorBoundary>
        <AuthContextProvider>
          <ContractContextProvider>
            <BrowserRouter>
              <Navbar/>
              <Main/>
            </BrowserRouter>
          </ContractContextProvider>
        </AuthContextProvider>
      </ErrorBoundary>
    </div>
  );
}
export default App;