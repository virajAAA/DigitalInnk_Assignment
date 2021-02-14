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
  apiKey: "AIzaSyBdb3FFFnXAXaCFkCzRgrLAuwLmAteS4eU",
  authDomain: "digital-innk.firebaseapp.com",
  projectId: "digital-innk",
  storageBucket: "digital-innk.appspot.com",
  messagingSenderId: "829204323095",
  appId: "1:829204323095:web:036f499456f81946697552",
  measurementId: "G-HX3WT284FS",
});

const App = () => {
  return (
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
};
export default App;
