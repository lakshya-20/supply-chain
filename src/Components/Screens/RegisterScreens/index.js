import { useState } from 'react';
import FarmerRegistration from './Farmer';
import ManufacturerRegistration from './Manufacturer';
import StakeholderRegistration from './Stakeholder';

import styles from '../../Styles/register.module.css'

const Register = () => {
    const [role, setRole] = useState(undefined);
    const RenderRoleCard = ({r}) => {
        return (
            <span 
                className={`${styles.registerBox} col-10 col-md-5 col-lg-2 m-1`} 
                onClick={()=>setRole(r)} 
                style={{border: r===role? "#150734 3px outset": "none"}}    
            >
                {r}
            </span>
        )
    }   
    const renderComponent = () =>{
        if(role=="Farmer"){
            return <FarmerRegistration/>
        }
        else if(role=="Manufacturer"){
            return  <ManufacturerRegistration/>
        }
        else{
           return <StakeholderRegistration role={role}/>
        }
    }
    const renderImage = () =>{
        if(role=="Farmer"){
            return <img 
                src='https://res.cloudinary.com/dstmsi8qv/image/upload/v1642177624/Supply%20Chain/farmer_twwmov.jpg'
                className={styles.registerImg}
                />
        }
        else if(role=="Manufacturer"){
            return <img 
                src='https://res.cloudinary.com/dstmsi8qv/image/upload/v1642177660/Supply%20Chain/manufacturer_ncfl8b.jpg'
                className={styles.registerImg}
                />
        }
        else if(role=="Distributer"){
            return <img 
                src='https://res.cloudinary.com/dstmsi8qv/image/upload/v1642177562/Supply%20Chain/distributer_tevsrc.jpg'
                className={styles.registerImg}
                />
        }
        else if(role=="Consumer"){
            return <img 
                src='https://res.cloudinary.com/dstmsi8qv/image/upload/v1642177573/Supply%20Chain/consumer_q8kmbm.jpg'
                className={styles.registerImg}
                />
        }        
    }
    return (
        <div className="text-center">
            <span className={`${styles.firstHeading}`}>Registration Panel</span>
            <div className="row justify-content-center">
                {["Farmer", "Manufacturer", "Distributer", "Consumer"].map(role => {
                    return (
                        <RenderRoleCard r={role}/>
                    )
                })}
            </div>            
            {role?
                <>                
                <div className='my-4'>                    
                    <span className={`${styles.secondHeading}`}>
                        <strong >{role+" "}</strong> Registration
                    </span>
                    <div className='row mt-3'>
                        <div className="col-12 col-md-6 d-flex justify-content-center">
                            {renderImage()}
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-center">   
                            <div className='col-6'>
                                {renderComponent()}
                            </div>
                        </div>                    
                    </div>
                </div>
                </>
            :
                ""
            }
        </div>
    )
}

export default Register;