
import {BRAND_REQUEST, PRODUCTS_REQUEST, VENDOR_REQUEST} from "../actions/actionTypes";


const initialState = {
    products: [],
    brands: [],
    vendors: [],

};


export default  function productReducer(state=initialState, action) {
    switch (action.type){
        case PRODUCTS_REQUEST:
            return{
                ...state,
                products: action.payload.data
            };
        case BRAND_REQUEST:
            return{
                ...state,
                brands: action.payload.data
            };
        case VENDOR_REQUEST:
            return {
                ...state,
                vendors: action.payload.data
            };
        default:
            return state
    }
}