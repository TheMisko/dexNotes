import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBQPSrBHrrtsVLpAoy05-5DyCqwN2Oy_J0",
  authDomain: "notes-e732f.firebaseapp.com",
  databaseURL: "https://notes-e732f.firebaseio.com",
  projectId: "notes-e732f",
  storageBucket: "notes-e732f.appspot.com",
  messagingSenderId: "508356417408",
  appId: "1:508356417408:web:a919d12515dd882c9e1365",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
