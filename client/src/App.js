import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './reducers/store';
import Dashboard from './components/Dashboard';
import Home from './components/Home.js';
import SignUp from './components/SignUp.js';
// in future, get reactstrap for elements?

class App extends Component {
  render() {
    return (
      <div className="Notes App">
        <Provider store={store}>
          <BrowserRouter>
          <React.Fragment>
            <Route exact path='/' component={Home} />
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/signup' component={SignUp}/>
          </React.Fragment>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;