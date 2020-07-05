import axiosInstance from "../components/helpers";
import {LOGIN_ENDPOINT} from "../components/endpoints";
import {LOGIN_SUCCESS, LOGOUT} from "./actionTypes";


export const loginAction = data => dispatch => {
    const new_data = {
        username: data.username,
        password: data.password
    };
    axiosInstance.post(LOGIN_ENDPOINT, new_data)
        .then(
            respData=>{
                axiosInstance.defaults.headers['Authorization'] = "Bearer " + respData.data.access;
                localStorage.setItem('access_token', respData.data.access);
                localStorage.setItem('refresh_token', respData.data.refresh);
                localStorage.setItem('isAuthenticated', true);
                return dispatch({
                    type: LOGIN_SUCCESS,
                    payload: respData.data
                })
            }
        )
};


export const logoutAction = (data) => dispatch => {
    console.log('logout', localStorage.getItem('isAuthenticated'));
    localStorage.setItem('access_token', null);
    localStorage.setItem('refresh_token', null);
    localStorage.setItem('isAuthenticated', false);
    return dispatch({
        type: LOGOUT
    })
};