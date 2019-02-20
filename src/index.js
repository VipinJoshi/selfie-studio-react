import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import './App.css';
import "../node_modules/toastr/build/toastr.min.css";


import Router from "./components";
import * as serviceWorker from './serviceWorker';
const app = (
    <div className="App ">
      <Router />
      </div>
  );
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
