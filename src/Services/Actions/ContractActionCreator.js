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

export const contractStateFarmer = (contract) => ({
  type: ActionTypes.CONTRACT_STATE_FARMER,
  payload: { contract }
})

export const contractStateManufacturer = (contract) => ({
  type: ActionTypes.CONTRACT_STATE_MANUFACTURER,
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

export const contractStateStats = (stats) => ({
  type: ActionTypes.CONTRACT_STATE_STATS,
  payload: {stats}
})