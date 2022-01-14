import * as ActionTypes from '../ActionTypes'

export const contractMainUpdate= (payload) => ({
    type: ActionTypes.CONTRACT_MAIN_UPDATE,
    payload
})
export const contractFarmerUpdate= (payload) => ({
    type: ActionTypes.CONTRACT_FARMER_UPDATE,
    payload
})
export const contractManufacturerUpdate= (payload) => ({
    type: ActionTypes.CONTRACT_MANUFACTURER_UPDATE,
    payload
})
export const contractProductUpdate= (payload) => ({
    type: ActionTypes.CONTRACT_PRODUCT_UPDATE,
    payload
})
export const contractStakeholderUpdate= (payload) => ({
    type: ActionTypes.CONTRACT_STAKEHOLDER_UPDATE,
    payload
})