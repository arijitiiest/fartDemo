import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import './App.css';
import Home from "./Views/Home";
import Login from "./Views/Login";
import Register from "./Views/Register";
import AddUser from "./Views/AddUser";
import EditUser from "./Views/EditUser";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/add-user" component={AddUser} />
          <Route exact path="/edit-user" component={EditUser} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
