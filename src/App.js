import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  


  return (
    <div className="App">
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
