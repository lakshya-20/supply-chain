import * as ActionTypes from '../ActionTypes';
export const authReducer = (state,action) =>{
    switch(action.type){
        case ActionTypes.AUTH_STATE_LOADING:
            return {...state, isLoading:true, errMess:null , auth:action.payload}
        case ActionTypes.AUTH_STATE_FAILED:
            return {...state, isLoading:false, errMess:action.payload, auth:{}}
        case ActionTypes.AUTH_STATE_UPDATE:
            return {...state, isLoading:false, errMess:null, auth:action.payload}
        case ActionTypes.AUTH_STATE_LOGOUT:
            return {...state, isLoading:false, errMess:null, auth:{}}
    }
}