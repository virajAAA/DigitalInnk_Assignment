import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { GlobalStyle } from "./globalStyles";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

firebase.initializeApp({
  apiKey: "AIzaSyBeLW5_X-tLbz0FVAPAoyz5bLadZ5PRL14",
  authDomain: "data-store-69911.firebaseapp.com",
  projectId: "data-store-69911",
  storageBucket: "data-store-69911.appspot.com",
  messagingSenderId: "282072649241",
  appId: "1:282072649241:web:669dd64a4e217ae5002488",
});

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/Register" exact>
          <Register />
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
        <Route path="/Dashboard" exact>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  </React.Fragment>
);

export default App;
