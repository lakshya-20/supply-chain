import * as ActionTypes from '../ActionTypes';
export const contractReducer = (state,action) =>{
    switch(action.type){
        case ActionTypes.CONTRACT_MAIN_UPDATE:
            return {...state, main: action.payload}
        case ActionTypes.CONTRACT_FARMER_UPDATE:
            return {...state, farmer: action.payload}
        case ActionTypes.CONTRACT_MANUFACTURER_UPDATE:
            return {...state, manufacturer: action.payload}
        case ActionTypes.CONTRACT_PRODUCT_UPDATE:
            return {...state, product: action.payload}
        case ActionTypes.CONTRACT_STAKEHOLDER_UPDATE:
            return {...state, stakeholder: action.payload}
    }
}