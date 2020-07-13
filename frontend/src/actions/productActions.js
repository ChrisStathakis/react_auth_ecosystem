import axiosInstance from "../components/helpers";
import {
    BRANDS_LIST_ENDPOINT,
    PRODUCT_CLASS_LIST_ENDPOINT,
    PRODUCTS_ENDPOINT,
    VENDORS_LIST_ENDPOINT
} from "../components/endpoints";
import {BRAND_REQUEST, PRODUCT_CLASS_REQUEST, PRODUCTS_REQUEST, VENDOR_REQUEST} from "./actionTypes";



export const getProducts = (endpoint=PRODUCTS_ENDPOINT) => dispatch => {
    axiosInstance.get(endpoint)
        .then(respData=>{
            console.log('getProducts', respData);
            dispatch({
                type: PRODUCTS_REQUEST,
                payload: respData
            })
        })
};

export const getBrands = (filters=null) => dispatch => {
    axiosInstance.get(BRANDS_LIST_ENDPOINT)
        .then(
            respData=>{
                dispatch({
                    type: BRAND_REQUEST,
                    payload: respData
                })
            }
        )
}


export const getVendors = (filters=null) => dispatch => {
    let endpoint = VENDORS_LIST_ENDPOINT;
    if (filters){
        endpoint = endpoint + '?active='+filters.active
    }
    axiosInstance.get(endpoint)
        .then(respData=>{
            dispatch({
                type: VENDOR_REQUEST,
                payload: respData
            })
        })
};

export const getProductClass = (endpoint=PRODUCT_CLASS_LIST_ENDPOINT) => dispatch =>(
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                dispatch({
                    type:PRODUCT_CLASS_REQUEST,
                    payload: respData
                })
            }
        )
)