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
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </React.StrictMode>,
  document.getElementById('root')
);