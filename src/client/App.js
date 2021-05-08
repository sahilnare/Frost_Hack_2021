import React, { Component } from 'react';
// React Router imports
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// Importing App Routes
import Dashboard from './views/Dashboard';
import Signin from './views/Signin';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      userData: {
        role: null,
        name: null,
        email: null,
        id: null
      }
    };
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    // Get token from local storage
    const token = localStorage.frost_token;
    axios.get('/api/auth/verify', {
      headers: {
        "Content-Type": "application/json",
        token: token
      }
    }).then(res => {
      this.setState(prevState => {
        return {
          ...prevState,
          isAuthenticated: true,
          userData: {
            ...prevState.userData,
            role: res.data.cred.user.role,
            name: res.data.cred.user.name,
            email: res.data.cred.user.email,
            id: res.data.cred.user._id
          }
        }
      });
    }).catch(err => {
      console.log(err);
      // this.setState({isAuthenticated: false});
    });
  }

  logInFunc = (data) => {
    this.setState(prevState => {
      return {
        ...prevState,
        isAuthenticated: true,
        userData: {
          ...prevState.userData,
          role: data.role,
          name: data.name,
          email: data.email,
          id: data._id
        }
      }
    });
  }

  logOutFunc = () => {
    this.setState({isAuthenticated: false});
  }

  render() {
    // Checking for authentication and device type
    const {isAuthenticated} = this.state;

    // Setup for React Router
    return (
      <div className="App">
        <BrowserRouter>
            <Switch>
              <Route
                path='/'
                exact
                render={(props) => <Redirect to="/app" />}
              />
              <Route
                path='/app'
                exact
                render={(props) => isAuthenticated ? <Dashboard userData={this.state.userData} {...props} /> : <Redirect to="/signin" />}
              />
              <Route
                path='/signin'
                exact
                render={(props) => !isAuthenticated ? <Signin logInFunc={this.logInFunc} {...props} /> : <Redirect to="/" />}
              />
              <Route
                render={(props) => <NotFound {...props} />}
              />
            </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
