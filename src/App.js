import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header'
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm'
import StringCalc from './StringCalc'
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const headerStyle = {
  background: "black",
  height: "15vh",
  // lineHeight: "15vh"
}

function App() {
  const [user, setUser] = useState({})
  const [form, setForm] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
        // console.log(data)
      })
    }
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  }

  const handleFormSwitch = (input) => {
    setForm(input)
  }

  console.log(user)

  return (
    <div className="App">
        <Router>
          <div>
            <div style={headerStyle}>
              <ul>
                <li>
                  <Link className="ui button" to="/login">Log in</Link>
                </li>
                <li>
                  <Link className="ui button" to="/signup">Sign up</Link>
                </li>
                <li>
                  <Link className="ui button" to="/string_calculation">String Calc</Link>
                </li>
              </ul>
            </div>
            <Switch>
              <Route path="/login">
                <LoginForm handleLogin={handleLogin}/>
              </Route>
              <Route path="/signup">
                <SignUpForm handleLogin={handleLogin}/>
              </Route>
              <PrivateRoute path="/string_calculation" component={StringCalc} />
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
