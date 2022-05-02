import produce from "immer";

import {
    GET_USER, GET_USER_SUCCESS,
    LOGIN_USER,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    RETURN_STATE,
} from "./constants";

const INIT_STATE = {
    loggedIn: false,
    loading: false,
    error: null,
    currentUser: 'initial',
    userData: null
};

export default function loginReducer(state = INIT_STATE, action: any) {
    return produce(state, draft => {
        switch (action.type) {
            case LOGIN_USER:
                draft.loading = true;
                break;
            case LOGIN_USER_ERROR:
                draft.error = action.payload;
                draft.loading = false;
                break;
            case LOGIN_USER_SUCCESS:
                draft.loggedIn = true;
                draft.loading = false;
                draft.error = null;
                draft.currentUser = action.payload;
                break;
            case GET_USER_SUCCESS:
                draft.userData = action.payload;
                break;
            case RETURN_STATE:
                draft.currentUser = action.payload;
                break;
            case LOGOUT_USER_SUCCESS: //This will convert the state to the init state when logout
                return state
            default:
                break;
        }
    });
}