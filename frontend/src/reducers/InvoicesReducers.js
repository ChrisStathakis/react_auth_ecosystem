import {REQUEST_INVOICES, REQUEST_INVOICE} from "../actions/actionTypes";


const initialState = {
    invoices: [],
    vendors: [],
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
        default:
            return state
    }
}


