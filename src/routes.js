 
import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm'
import StringCalc from './StringCalc'
import Calculations from './Calculations'
import ResetPass from './ResetPass';

export default function Routes({ user: user, handleLogin: handleLogin }) {
  if (Object.keys(user).length === 0) {
    console.log(user)
    return (
      <Switch>
        <Route path="/login">
          <LoginForm handleLogin={handleLogin}/>
        </Route>
        <Route path="/signup">
          <SignUpForm handleLogin={handleLogin}/>
        </Route>
      </Switch>
    );
  }
  console.log('--------------------')
  console.log(user)
  return (
    <Switch>
      <Route path="/reset_password">
        <ResetPass/>
      </Route>
      <Route path="/string_calculation" component={StringCalc} >
        <StringCalc user={user} />
      </Route>
      <Route path="/calculations" component={Calculations} >
        <Calculations user={user} />
      </Route>
    </Switch>
  );
};