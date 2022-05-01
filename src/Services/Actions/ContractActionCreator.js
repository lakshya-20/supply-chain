import * as ActionTypes from '../Constants/ActionTypes';

export const contractStateLoading = () => ({
  type: ActionTypes.CONTRACT_STATE_LOADING
})

export const contractStateFailed = (error) => ({
  type: ActionTypes.CONTRACT_STATE_FAILED,
  payload: error
})

export const contractStateMain = (contract) => ({
  type: ActionTypes.CONTRACT_STATE_MAIN,
  payload: { contract }
})

export const contractStateStakeholder = (contract) => ({
  type: ActionTypes.CONTRACT_STATE_STAKEHOLDER,
  payload: { contract }
})

export const contractStateProduct = (contract) => ({
  type: ActionTypes.CONTRACT_STATE_PRODUCT,
  payload: { contract }
})