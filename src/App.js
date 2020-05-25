import React, {useState, useEffect} from 'react';
import './App.css';
import Routes from './routes'


import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const headerStyle = {
  background: "black",
  height: "15vh",
  // lineHeight: "15vh"
}

function App() {
  const [user, setUser] = useState({})

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
      })
    }
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  }

  const Logout = () => {
    localStorage.removeItem("token")
    setUser({})
  }

  return (
    <div className="App">
        <Router>
          <div>
            <div style={headerStyle}>
              <ul>
                {Object.keys(user).length === 0 ? 
                <React.Fragment>
                  <li>
                    <Link className="ui button" to="/login">Log in</Link>
                  </li>
                  <li>
                    <Link className="ui button" to="/signup">Sign up</Link>
                  </li>
                </React.Fragment>
                :
                <React.Fragment>
                  <li>
                    <button class="ui button" onClick={Logout}>Log out</button>
                  </li>
                  <li>
                    <Link className="ui button" to="/reset_password">Reset password</Link>
                  </li>
                  <li>
                    <Link className="ui button" to="/string_calculation">String Calc</Link>
                  </li>
                </React.Fragment>
                }
              </ul>
            </div>
            <Switch>
              <Routes user={user} handleLogin={handleLogin} />
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
