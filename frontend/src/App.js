import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';


import store from './store';
import Homepage from "./Homepage";
import ProductHomepage from './Products/Homepage';
import LoginView from "./LoginView";
import LogoutView from './logout'
import ProductClassView from "./Products/ProductClassView";
import VendorView from "./Products/VendorView";


function App() {
  return (
      <Provider store={store}>

        <div className="App">
          <BrowserRouter>
            <Switch>
                <Route exact path={'/'} component={Homepage} />
                <Route exact path={'/products/'} component={ProductHomepage} />
                <Route exact path={'/product-class/'} component={ProductClassView} />
                <Route exact path={'/vendors/'} component={VendorView} />
                <Route exact path={'/login/'} component={LoginView}/>
                <Route exact path={'/logout/'} component={LogoutView} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
  );
}

export default App;
