import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Context/Contexts/AuthContext';
import { ContractContext } from '../../../Context/Contexts/ContractContext';
import styles from '../../Styles/admin.module.css';
const VerifyManufacturer = () => {
    const { authState } = useContext(AuthContext);
    const { contractState } = useContext(ContractContext);
    const [manufacturerDetailArray, setManufacturerDetailArray] = useState([]);
    
    useEffect(()=>{
        if(contractState.manufacturer){
            (async()=>{
                const addressArray =  await contractState.manufacturer.methods.getManufacturersList().call();
                var temp=[];
                for(var i=0;i<addressArray.length;i++){
                    temp[i]=await contractState.manufacturer.methods.getManufacturer(addressArray[i]).call();
                }                
                setManufacturerDetailArray(temp);
            })();
        }
    },[contractState])

    const verifyManufacturer = async (manufacturerAddress) => {
        if(manufacturerAddress==null) {
            alert("Please provide a address");
            return;
        }
        await contractState.manufacturer.methods.verifyManufacturer(manufacturerAddress).send({from: authState.auth.id});
        window.location.reload(false);
    }
    
    const renderManufacturerCard=(manufacturer)=>{
        return (
            <div className='col-12 d-flex border-bottom'>
                <div className={`col-3 ${styles.icon}`}>
                    <img 
                        src='https://res.cloudinary.com/dstmsi8qv/image/upload/v1642177660/Supply%20Chain/manufacturer_ncfl8b.jpg'
                        className={styles.icon}
                    />
                </div>
                <div className='col-9'>
                    <div className={styles.title}>
                        {manufacturer.name}
                    </div>
                    <div className={styles.address}>
                        {manufacturer.id}
                    </div>
                    <div>
                        {manufacturer.rawProducts.map(rawProduct => {
                            return <span className={styles.raw_product}>{rawProduct}</span>
                        })}
                    </div>
                    <div>
                    {manufacturer.isRenewableUsed?
                        <span className="text-success">
                            Renewable Resources
                        </span>
                    :
                        <span style={{cursor: "pointer"}} onClick={()=>verifyManufacturer(manufacturer.id)}>
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
            {manufacturerDetailArray.length>0?
                manufacturerDetailArray.map(manufacturer=>{
                    return renderManufacturerCard(manufacturer)
                })
            :
                <span className={styles.title}>No Manufacturer Exists</span>
            }
        </div>
    );
}
 
export default VerifyManufacturer;