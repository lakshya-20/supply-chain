import React, { createContext, useReducer } from 'react';
import { contractReducer } from '../Reducers/ContractReducer';

export const ContractContext = createContext();
const ContractContextProvider = (props) => {
    const [contractState, contractDispatch] = useReducer(contractReducer,{
        main: undefined,
        farmer: undefined,
        manufacturer:undefined,
        stakeholder:undefined,
        product: undefined
    });
    return ( 
        <ContractContext.Provider value={{contractState, contractDispatch}}>
            {props.children}
        </ContractContext.Provider>
    );
}
 
export default ContractContextProvider;