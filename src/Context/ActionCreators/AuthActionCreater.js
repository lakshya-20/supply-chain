import * as ActionTypes from '../ActionTypes'
export const authStateLoading=()=>({
    type:ActionTypes.AUTH_STATE_LOADING
})

export const authStateFailed=()=>({
    type:ActionTypes.AUTH_STATE_FAILED
})

export const authStateLogout=()=>({
    type:ActionTypes.AUTH_STATE_LOGOUT
})

export const authStateUpdate=(authState)=>({
    type:ActionTypes.AUTH_STATE_UPDATE,
    payload:authState
})

export const authStateUpdateRole=(role)=>({
    type:ActionTypes.AUTH_STATE_UPDATE_ROLE,
    payload:role
})
