import {signInFB, signOutFB} from "../firebaseOperations/firebaseOperations";

const SET_USER_DATA = 'SET_USER_DATA';
const UNSET_USER_DATA = 'UNSET_USER_DATA';
const initialState = {
    isAuth: false,
    id: null,
    email: null
}
export const authReducer = (state=initialState, action) =>{
    switch(action.type){
        case SET_USER_DATA:{
            return {...state, isAuth: true, id: action.data.id, email: action.data.email};
        }
        case UNSET_USER_DATA:{
            return {...state, isAuth: false, id: null, email: null};
        }
        default: return state;
    }
}
const setUserDataSuccess = (data) =>({type: SET_USER_DATA, data});
const unsetUserDataSuccess=(data) =>({type: UNSET_USER_DATA});
export const setUserData = (data) =>(dispatch)=>{
    const dispatchCallback = (data) =>{
        dispatch(setUserDataSuccess(data));
    }
    signInFB(data,dispatchCallback);
}
export const unsetUserData = () =>(dispatch)=>{
    const dispatchCallback = () =>{
        dispatch(unsetUserDataSuccess());
    }
    signOutFB(dispatchCallback);
}