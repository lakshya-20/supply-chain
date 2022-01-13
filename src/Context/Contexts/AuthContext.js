import React, { createContext, useReducer, useEffect } from 'react';
import {authReducer} from '../Reducers/AuthReducer';

export const AuthContext = createContext();
const AuthContextProvider = (props) => {
    const [authState,authDispatch] = useReducer(authReducer,{
        isLoading:true,
        errMess:null,
        auth:{},
        role:undefined
    });
    return ( 
        <AuthContext.Provider value={{authState,authDispatch}}>
            {props.children}
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;