import axiosInstance from "../components/helpers";
import {
    PAYMENT_REQUEST,
    REQUEST_INVOICE,
    REQUEST_INVOICES,
    REQUEST_PAYMENT_MRTHOD,
    VENDOR_REQUEST
} from "./actionTypes";
import {
    INVOICE_LIST_ENDPOINT,
    PAYMENT_ENDPOINT,
    PAYMENT_METHOD_ENDPOINT,
    VENDORS_LIST_ENDPOINT
} from "../components/endpoints";


export const getInvoices = (endpoint=INVOICE_LIST_ENDPOINT) => dispatch => {

    axiosInstance.get(endpoint)
        .then(respData=>{
            dispatch({
                type:REQUEST_INVOICES,
                payload: respData.data
            })
        })
};

export const getInvoice = (endpoint) => dispatch => {
    axiosInstance.get(endpoint)
        .then(respData=>{
            dispatch({
                type: REQUEST_INVOICE,
                payload: respData.data
            })
        })
};


export const getPaymentMethod = (endpoint=PAYMENT_METHOD_ENDPOINT) => dispatch =>{
    axiosInstance.get(endpoint)
        .then(respData=>{
            dispatch({
                type: REQUEST_PAYMENT_MRTHOD,
                payload: respData
            })
        })
};


export const getPayments = (endpoint=PAYMENT_ENDPOINT) => dispatch => {
    axiosInstance.get(endpoint)
        .then(respData=>{
            dispatch({
                type: PAYMENT_REQUEST,
                payload: respData
            })
        })
}

