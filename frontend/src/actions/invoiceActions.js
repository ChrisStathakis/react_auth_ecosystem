import axiosInstance from "../components/helpers";
import {REQUEST_INVOICE, REQUEST_INVOICES} from "./actionTypes";


export const getInvoices = (endpoint='') => dispatch => {

    axiosInstance.get(endpoint)
        .then(respData=>{
            dispatch({
                type:REQUEST_INVOICES,
                payload: respData.data
            })
        })
}

export const getInvoice = (endpoint) => dispatch => {
    axiosInstance.get(endpoint)
        .then(respData=>{
            dispatch({
                type: REQUEST_INVOICE,
                payload: respData.data
            })
        })
}