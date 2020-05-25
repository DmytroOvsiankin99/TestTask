import {authReducer} from "./authReducer";
import {goodsReducer} from "./goodsReducers";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {reducer as formReducer} from 'redux-form';
import thunkMiddleware from 'redux-thunk';
const reducers = combineReducers({
    auth: authReducer,
    goods: goodsReducer,
    form: formReducer
})
const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store=store;
export default store;
