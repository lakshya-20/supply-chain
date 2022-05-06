import './Assests/Styles/app.css';
import ErrorBoundary from './Layouts/ErrorBoundary';
import Main from './Layouts/Main';
import Navbar from './Layouts/Navbar';
import { AuthContextProvider } from './Services/Contexts/AuthContext';

function App() {
  return (
    <div className='App'>
      <ErrorBoundary>
        <AuthContextProvider>
          <Navbar/>
          <Main/>
        </AuthContextProvider>
      </ErrorBoundary>
    </div>
  );
}
export default App;