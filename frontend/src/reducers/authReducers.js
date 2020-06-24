import {LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST, LOGOUT, UPDATE_TOKEN} from '../actions/actionTypes'


const initialState = {
    accessToken: localStorage.getItem('access_token', null),
    refreshToken: localStorage.getItem('refresh_token', null),
    isAuthenticated: localStorage.getItem('isAuthenticated', false),
};


export default function authReducer(state=initialState, action){
    switch (action.type){
        case LOGIN_REQUEST:
            return {
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('access_token', action.payload.access_token);
            localStorage.setItem('refresh_token', action.payload.refresh_token);
            localStorage.setItem('isAuthenicated', true);
            return{
                accessToken:action.payload.access_token,
                refreshToken:action.payload.refresh_token,
                isAuthenticated: true
            };
        case UPDATE_TOKEN:
            localStorage.setItem('access_token', action.payload);
            return{
                ...state,
                accessToken: action.payload
            };
        case LOGIN_FAIL:
            localStorage.setItem('access_token', null);
            localStorage.setItem('refresh_token', null);
            localStorage.setItem('isAuthenticated', false)
            return{
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false
            };
        case LOGOUT:
            localStorage.setItem('access_token', null);
            localStorage.setItem('refresh_token', null);
            localStorage.setItem('isAuthenticated', false)
            return{
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false
            };

        default:
            return state
    }
}