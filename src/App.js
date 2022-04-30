import './Assests/Styles/app.css';
import ErrorBoundary from './Layouts/ErrorBoundary';
import Main from './Layouts/Main';
import { AuthContextProvider } from './Services/Contexts/AuthContext';

function App() {
  return (
    <div className='App'>
      <ErrorBoundary>
        <AuthContextProvider>
          <Main/>
        </AuthContextProvider>
      </ErrorBoundary>
    </div>
  );
}
export default App;