import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import loginReducer from './Auth/reducer'

const rootReducer = combineReducers({
    loginReducer
});

function configureStore() {
    const middleware : any = []

    const store = createStore(
        rootReducer,
        {},
        compose(applyMiddleware(...middleware))
    );
    return store;
}

export default configureStore;