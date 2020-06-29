import {combineReducers} from 'redux';

import authReducer from './authReducers';
import productReducer  from './productReducers';


export default combineReducers({
    authReducer,
    productReducer

})