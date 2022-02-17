import React, { useState } from 'react'
import logo from '../logo.png';
const FooterComponent = ({mainContract,adminAddress, account, role}) => {
    return (            
        <div className="container bg-dark py-2">            
            <div className="row text-light">
                <div className="col-12 col-sm-6">
                    <span className="d-flex justify-content-center">
                        <img src={logo} width="20" height="20" className="d-inline-block align-top" alt="" />
                        &nbsp;Food Supply Chain
                    </span>
                    <span>
                        A decentralized distributed application to track food products worldwide preventing fake food drives and adding authenticity to the food supply chain.
                    </span>
                </div>
                <div className="col-0 col-sm-6">
                    <span className="badge bg-primary">Admin Address</span>&nbsp;{adminAddress}
                    <br/>
                    <span className="badge bg-primary">Current Address</span>&nbsp;{account}
                    <br/>
                    <span className="badge bg-warning">Current Role</span>&nbsp;{role}
                </div>
            </div>
        </div>
    );
}

export default FooterComponent;
