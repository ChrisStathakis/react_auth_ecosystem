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
import BrandView from './Products/BrandView';
import InvoiceHomepage from "./Invoices/InvoiceHomepage";
import VendorCardView from "./Invoices/VendorCardView";


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
                <Route path={'/vendors/:pk/'} component={VendorCardView} />
                <Route exact path={'/login/'} component={LoginView}/>
                <Route exact path={'/logout/'} component={LogoutView} />
                <Route exact path={'/brands/'} component={BrandView} />
                <Route exact path={'/invoices/'} component={InvoiceHomepage} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
  );
}

export default App;
