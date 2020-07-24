import {combineReducers} from 'redux';

import authReducer from './authReducers';
import productReducer  from './productReducers';
import invoiceReducer  from './InvoicesReducers'

export default combineReducers({
    authReducer,
    productReducer,
    invoiceReducer

})