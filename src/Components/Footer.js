import { useContext } from 'react'
import { AuthContext } from '../Context/Contexts/AuthContext';

const FooterComponent = () => {
    const {authState} = useContext(AuthContext);
    return (            
        <div className="container bg-dark py-2">            
            <div className="row text-light">
                <div className="col-12 col-sm-6">
                    <span className="d-flex justify-content-center">
                        <img src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1642107674/Supply%20Chain/logo_small_tjpurs.png"
                            width="20" height="20" className="d-inline-block align-top" alt="" 
                        />
                        &nbsp;Global Supply Solutions
                    </span>
                    <span>
                        A decentralized distributed application to track food products worldwide preventing fake food drives and adding authenticity to the food supply chain.
                    </span>
                </div>
                <div className="col-0 col-sm-6">                    
                    <span className="badge bg-primary">Address</span>&nbsp;{authState.auth.id}
                    <br/>
                    <span className="badge bg-primary">Name</span>&nbsp;{authState.auth.name}
                    <br/>
                    {authState.role ?
                        <>
                        <span className="badge bg-warning">Role</span>
                        &nbsp;{authState.role}
                        </>
                    :""}
                </div>
            </div>
        </div>
    );
}

export default FooterComponent;
