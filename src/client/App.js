import React, { Component } from 'react';
// React Router imports
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// Importing App Routes
import Dashboard from './views/Dashboard';
import Signin from './views/layouts/auth/Signin';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn = () => {

  }

  render() {
    // Checking for authentication and device type
    const {isAuthenticated} = this.state;

    // Setup for React Router
    return (
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          {
            commonLoading ? (
              <CommonLoader />
            ) : (
              <Switch>
                <Route
                  path='/'
                  exact
                  render={(props) => <Redirect to="/app" />}
                />
                <Route
                  path='/app'
                  exact
                  render={(props) => isAuthenticated ? <Dashboard {...props} /> : <Redirect to="/signin" />}
                />
                <Route
                  path='/signin'
                  exact
                  render={(props) => !isAuthenticated ? <Signin {...props} /> : <Redirect to="/" />}
                />
                <Route
                  render={(props) => <NotFound {...props} />}
                />
              </Switch>
            )
          }
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
