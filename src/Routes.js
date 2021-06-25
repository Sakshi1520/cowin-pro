import Login from "containers/Login/Login";
import RegisterUser from "containers/Register/RegisterUser";
import UsersList from "containers/Vaccinator/UsersList";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Vlogin from "containers/VaccinatorLogin/Vlogin";
import Vaccinator from "containers/Vaccinator/Vaccinator";
import { WaitList } from "containers/Vaccinator/WaitList";
import { BookSlots } from "containers/Slots/BookSlots";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route exact path="/register" component={RegisterUser} />
      <Route exact path="/user/booking" component={BookSlots} />
      <Route exact path="/vlogin" component={Vlogin} />
      <Route exact path="/vaccinator" component={Vaccinator} />
      <Route exact path="/vaccinator/list" component={UsersList} />
      <Route exact path="/vaccinator/waitlist" component={WaitList} />
      {/* <Route exact path="/vaccinator/data" component={UsersList} /> */}
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default Routes;
