import {REQUEST_PAYMENT_MRTHOD} from "../actions/actionTypes";


const initialState = {
    payment_methods: []
};


export default function generalReducer(state=initialState, action){
    switch (action.type){
        case REQUEST_PAYMENT_MRTHOD:
            return {
                ...state,
                payment_methods: action.payload
            };
        default:
            return action
    }
}