pragma solidity >=0.4.22 <0.9.0;

import './Farmer.sol';
import './Manufacturer.sol';
import './Stakeholder.sol';
import './Product.sol';

contract Main{

    address public adminAddress;
    Farmer public farmer;
    Manufacturer public manufacturer;
    Stakeholder public stakeholder;
    Product public product;
    
    constructor(Farmer _farmer, Manufacturer _manufacturer, Stakeholder _stakeholder, Product _product) public {
        farmer = _farmer;
        manufacturer = _manufacturer;
        stakeholder = _stakeholder;
        product = _product;
        adminAddress = msg.sender;
    }

    // function getRole(address id) public view returns(string memory){
    //     if(farmer.getFarmer(id).isValue) return "farmer";
    //     else if(manufacturer.getManufacturer(id).isValue) return "manufacturer";
    //     else if(stakeHolder.getStakeHolder(id).isValue) return stakeHolder.getStakeHolder(id).role;
    //     else return "new_address";
    // }
}