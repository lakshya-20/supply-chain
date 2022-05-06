import * as ActionTypes from '../Constants/ActionTypes';

export const authReducuer = (state, action) => {
  switch(action.type){
    case ActionTypes.AUTH_STATE_LOADING:
      return {
        ...state, 
        isLoading: true, 
        errMess: null, 
        isWeb3Enabled: false, 
        isAuthenticated: false, 
        address: null, 
        formattedAddress: null, 
        stakeholder: {}
      }
    case ActionTypes.AUTH_STATE_FAILED:
      return {
        ...state, 
        isLoading: false, 
        errMess: action.payload, 
        isAuthenticated: false, 
        address: null, 
        formattedAddress: null, 
        stakeholder: {}
      }
    case ActionTypes.AUTH_STATE_ENABLE_WEB3:
      return {
        ...state, 
        isLoading: false, 
        isWeb3Enabled: true
      }
    case ActionTypes.AUTH_STATE_DISABLE_WEB3:
      return {
        ...state, 
        isLoading: false, 
        isWeb3Enabled: false
      }
    case ActionTypes.AUTH_STATE_LOGIN:
      return {
        ...state, 
        isLoading: false, 
        errMess: null, 
        isAuthenticated: true, 
        address: action.payload.address, 
        formattedAddress: action.payload.address.substring(0,6) + "..." + action.payload.address.substring(action.payload.address.length-4),
        stakeholder: {}
      }
    case ActionTypes.AUTH_STATE_LOGOUT:
      return {
        ...state, 
        isLoading: false, 
        errMess: null, 
        isAuthenticated: false, 
        address: null, 
        formattedAddress: null, 
        stakeholder: {}
      }
    case ActionTypes.AUTH_STATE_STAKEHOLDER:
      return {
        ...state,
        stakeholder: action.payload.stakeholder
      }
  }
}