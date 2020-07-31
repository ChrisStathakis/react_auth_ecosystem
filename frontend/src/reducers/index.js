import {combineReducers} from 'redux';

import authReducer from './authReducers';
import productReducer  from './productReducers';
import invoiceReducer  from './InvoicesReducers';
import generalReducer from './generalReducer';

export default combineReducers({
    authReducer,
    productReducer,
    invoiceReducer,
    generalReducer

})