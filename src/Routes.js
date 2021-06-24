import Login from "containers/Login/Login";
import RegisterUser from "containers/Register/RegisterUser";
import UsersList from "containers/Vaccinator/UsersList";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route exact path="/register" component={RegisterUser} />
      <Route exact path="/vaccinator" component={UsersList} />d
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default Routes;
