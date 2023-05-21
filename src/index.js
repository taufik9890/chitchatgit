import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import firebaseConfig from './Dbconnection/firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './features/Store/Store';

// index.js hocche shob js er headquarter ekhane import korle shob jaygay import kore dey. Ekhane automatically shob jaygay export kore dey
// store theke jei data ta provide korbe oitai provider 
// Data gula store e joma hobe. Ar data gula ke provide korar jonno react-redux er provider use korbo
// Provider er bhitore ekta props use korbo store namer. Jeitar naam change kora jabe na. Ar ei store er bhitore amader banano store dibo
// Registration er information database e jay. Ar login er information Redux e jay   

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);