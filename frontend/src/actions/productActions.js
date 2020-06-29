import axiosInstance from "../components/helpers";
import {BRANDS_LIST_ENDPOINT, PRODUCTS_ENDPOINT, VENDORS_LIST_ENDPOINT} from "../components/endpoints";
import {BRAND_REQUEST, PRODUCTS_REQUEST, VENDOR_REQUEST} from "./actionTypes";



export const getProducts = (filters=[]) => dispatch => {
    axiosInstance.get(PRODUCTS_ENDPOINT)
        .then(respData=>{
            console.log('getProducts', respData)
            dispatch({
                type: PRODUCTS_REQUEST,
                payload: respData
            })
        })
};

export const getBrands = (filters=[]) => dispatch => {
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


export const getVendors = (filters=[]) => dispatch => {
    axiosInstance.get(VENDORS_LIST_ENDPOINT)
        .then(respData=>{
            dispatch({
                type: VENDOR_REQUEST,
                payload: respData
            })
        })
}