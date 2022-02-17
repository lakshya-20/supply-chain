import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Context/Contexts/AuthContext';
import { ContractContext } from '../../../Context/Contexts/ContractContext';
import styles from '../../Styles/admin.module.css';
function VerifyFarmer() {
    const { authState } = useContext(AuthContext);
    const { contractState } = useContext(ContractContext);
    const [farmerDetailsArray, setFarmerDetailsArray] = useState([])
    const verifyFarmer = async (farmerAddress) => {
        if(farmerAddress==null) {
            alert("Please provide a address");
            return;
        }
        await contractState.farmer.methods.verifyFarmer(farmerAddress).send({from: authState.auth.id});
        window.location.reload(false);
    }
    useEffect(()=>{
        if(contractState.farmer){            
            (async ()=>{
                const addressArray =  await contractState.farmer.methods.getFarmersList().call();
                var temp=[];
                for(var i=0;i<addressArray.length;i++){
                    temp[i] = await contractState.farmer.methods.getFarmer(addressArray[i]).call();
                }                
                setFarmerDetailsArray(temp);
            })();           
        }
    },[contractState])
    const renderFarmerCard=(farmer)=>{
        return (
            <div className='col-12 d-flex border-bottom'>
                <div className={`col-3 ${styles.icon}`}>
                    <img 
                        src='https://res.cloudinary.com/dstmsi8qv/image/upload/v1642164799/Supply%20Chain/rawProducts_o0t5az.jpg'
                        className={styles.icon}
                    />
                </div>
                <div className='col-9'>
                    <div className={styles.title}>
                        {farmer.name}
                    </div>
                    <div className={styles.address}>
                        {farmer.id}
                    </div>
                    <div>
                        {farmer.rawProducts.map(rawProduct => {
                            return <span className={styles.raw_product}>{rawProduct}</span>
                        })}
                    </div>
                    <div>
                    {farmer.isVerified?
                        <span className="text-success">
                            Verified
                        </span>
                    :
                        <span style={{cursor: "pointer"}} onClick={()=>verifyFarmer(farmer.id)}>
                            Verify
                        </span>
                    }
                    </div>
                </div>
            </div>
        )
    }
    return ( 
        <div>                
            {farmerDetailsArray.length>0?
                farmerDetailsArray.map(farmer=>{
                    return renderFarmerCard(farmer)
                })
            :
                <span className={styles.title}>No Farmer Exists</span>
            }
        </div>
     );
}

export default VerifyFarmer;