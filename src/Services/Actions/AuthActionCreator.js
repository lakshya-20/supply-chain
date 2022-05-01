import * as ActionTypes from '../Constants/ActionTypes';

export const authStateFailed = (error) => ({
  type: ActionTypes.AUTH_STATE_FAILED,
  payload: error
})

export const authStateEnableWeb3 = () => ({
  type: ActionTypes.AUTH_STATE_ENABLE_WEB3
})

export const authStateDisableWeb3 = () => ({
  type: ActionTypes.AUTH_STATE_DISABLE_WEB3
})

export const authStateLogin = (address) => ({
  type: ActionTypes.AUTH_STATE_LOGIN,
  payload: { address }
})

export const authStateLogout = () => ({
  type: ActionTypes.AUTH_STATE_LOGOUT
})

export const authStateStakeholder = (stakeholder) => ({
  type: ActionTypes.AUTH_STATE_STAKEHOLDER,
  payload: { stakeholder }
})