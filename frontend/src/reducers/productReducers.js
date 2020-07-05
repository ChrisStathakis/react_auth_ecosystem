
import {BRAND_REQUEST, PRODUCT_CLASS_REQUEST, PRODUCTS_REQUEST, VENDOR_REQUEST} from "../actions/actionTypes";


const initialState = {
    products: [],
    brands: [],
    vendors: [],
    productClass: []

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
        case PRODUCT_CLASS_REQUEST:
            console.log('reducer', action.payload)
            return{
                ...state,
                productClass: action.payload.data
            };
        default:
            return state
    }
}