import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/Contexts/AuthContext";
import { ContractContext } from "../Context/Contexts/ContractContext";
import styles from './Styles/transferOwnership.module.css';
const TransferOwnership = () =>{
    const {contractState} = useContext(ContractContext);
    const {authState} = useContext(AuthContext);
    const [newAddress, setNewAddress] = useState(undefined);
    const [serialNo, setSerialNo] = useState(undefined);
    const handleSubmit = async () => {       
        if(serialNo==undefined) alert("Product Serial No required");
        else if(newAddress==undefined) alert("New Owner Address required");
        else {
            await contractState.product.methods.updateOwnership(newAddress,serialNo).send({from: authState.auth.id});
            alert("Updated Ownership");
            window.location.href = "/";            
        }        
    }
    return (
        <div>
            <div className="text-center">
                <span className={styles.first_heading}>Transfer Ownership</span>
                <br/>
                <img src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1642600510/Supply%20Chain/transferOwnership_wwsra0.jpg"
                    className= {`${styles.image_header}`}
                />
            </div>
            <div>
                <div className='row my-3'>
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <div className={`${styles.search} col-8`}>
                            <input type="text" className={`${styles.searchTerm}`} placeholder="Product Serial No" onChange={(e) => setSerialNo(e.target.value)} />
                        </div> 
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center">   
                        <div className={`${styles.search} col-8`}>
                            <input type="text" className={`${styles.searchTerm}`} placeholder="New Owner Address" onChange={(e) => setNewAddress(e.target.value)}/>
                        </div> 
                    </div>   
                    <div className="col-12 text-center mt-3">
                        <span 
                            className={`${styles.transferButton}`}
                            onClick={handleSubmit}
                        >
                            Transfer
                        </span>
                    </div>                 
                </div>
            </div>
        </div>
    )
}
export default TransferOwnership;