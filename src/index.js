import React from 'react';
import ReactDOM from 'react-dom';
import './Assests/Styles/index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer position="bottom-center" pauseOnFocusLoss={false} autoClose={2000}/>
  </React.StrictMode>,
  document.getElementById('root')
);