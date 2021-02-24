import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/Common/protectedRoute";
import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
import NotFound from "./components/Common/NotFound";
import HomePage from "./components/HomePage";
import Booking from "./components/Booking/bookingFeature";
import About from "./components/HomePage/about";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/booking" component={Booking} />
        <Route exact path="/signin" component={SignIn} />
        {/* <Route exact path="/signup" component={SignUp} /> */}
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect from="/" to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
};

export default App;
