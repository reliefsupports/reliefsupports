import {
    GET_USER, GET_USER_ERROR, GET_USER_SUCCESS,
    LOGIN_USER,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_LISTEN,
    RETURN_STATE
} from "./constants";

export function loginUserListen(data: any) {
    return {
        type: LOGIN_USER,
        data
    }
}

export function loginUserSuccess(data: any) {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: data
    }
}

export function loginUserError(message: any) {
    return {
        type: LOGIN_USER_ERROR,
        payload: {message}
    }
}

export function returnState(data: any) {
    return {
        type: RETURN_STATE,
        payload: data
    }
}

//logout actions
export const logoutListen = () => {

    return {
        type: LOGOUT_USER_LISTEN
    }
}

export const logoutSuccess = () => {

    return {
        type: LOGIN_USER_SUCCESS
    }
}

export function getUser() {
    return {
        type: GET_USER
    }
}

export function getUserSuccess(data: any) {
    return {
        type: GET_USER_SUCCESS,
        payload: data
    }
}

export function getUserError(e: any) {
    return {
        type: GET_USER_ERROR,
        payload: e
    }
}

