import {REQUEST_INVOICES, REQUEST_INVOICE, VENDOR_REQUEST, PAYMENT_REQUEST} from "../actions/actionTypes";


const initialState = {
    invoices: [],
    payments: [],
    invoice: null

};

export default function invoiceReducer(state=initialState, action) {
    switch (action.type){
        case REQUEST_INVOICES:
            return {
                ...state,
                invoices: action.payload
            };
        case REQUEST_INVOICE:
            return {
                ...state,
                invoice: action.payload
            };
        case PAYMENT_REQUEST:
            return {
                ...state,
                payments: action.payload
            }
        default:
            return state
    }
}


