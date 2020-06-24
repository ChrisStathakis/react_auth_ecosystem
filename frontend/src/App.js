import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';


import store from './store';
import Homepage from "./Homepage";
import ProductHomepage from './Products/Homepage';
import LoginView from "./LoginView";
import LogoutView from './logout'


function App() {
  return (
      <Provider store={store}>

        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path={'/'} component={Homepage} />
              <Route exact path={'/products/'} component={ProductHomepage} />
                <Route exact path={'/login/'} component={LoginView}/>
                <Route exact path={'/logout/'} component={LogoutView} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
  );
}

export default App;
