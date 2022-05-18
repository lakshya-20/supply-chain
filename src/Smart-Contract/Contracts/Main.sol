// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './Farmer.sol';
import './Manufacturer.sol';
import './Stakeholder.sol';
import './Product.sol';

contract Main{
  Farmer public farmer;
  Manufacturer public manufacturer;
  Stakeholder public stakeholder;

  constructor(Farmer _farmer, Manufacturer _manufacturer, Stakeholder _stakeholder) {
    farmer = _farmer;
    manufacturer = _manufacturer;
    stakeholder = _stakeholder;
  }

  function getRole(address _id) public view returns(string memory){
    if(keccak256(abi.encodePacked((farmer.getRole(_id)))) != keccak256(abi.encodePacked(("")))){
      return farmer.getRole(_id);
    }
    else if(keccak256(abi.encodePacked((manufacturer.getRole(_id)))) != keccak256(abi.encodePacked(("")))){
      return manufacturer.getRole(_id);
    }
    else if(keccak256(abi.encodePacked((stakeholder.getRole(_id)))) != keccak256(abi.encodePacked(("")))){
      return stakeholder.getRole(_id);
    }
    else if(stakeholder.isAdmin(_id)){
      return "admin";
    }
    else{
      return "new";
    }
  }
}