import './Assests/Styles/app.css';
import Main from './Layouts/Main';
import { AuthContextProvider } from './Services/Contexts/AuthContext';

function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <Main/>
      </AuthContextProvider>
    </div>
  );
}
export default App;