// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './Stakeholder.sol';
contract Manufacturer is Stakeholder {

  struct rawProduct{
    string name;
    address[] boughtFromIds;
    bool isVerified;
  }

  mapping(address => bool) public _isRenewableUsed;
  mapping(address => string[]) public _rawProducts;
  mapping(string => address[]) public _rawProductSuppliers;
  mapping(string => bool) public _rawProductVerified;
  mapping(address => uint256[]) public _launchedProducts;

  constructor() Stakeholder() {}

  function register(string memory _name, string memory _location) public override returns (bool) {
    require (_stakeholders[msg.sender].id ==  address(0), "Manufacturer::registerManufacturer: Manufacturer already registered");
    _stakeholders[msg.sender] = stakeholder(msg.sender, _name, _location, "manufacturer", false);
    _isRenewableUsed[msg.sender] = false;
    return true;
  }

  function addRawProduct(string memory _name, address _supplier) public returns (bool){
    bool productAlreadyAdded = false;
    for (uint i = 0; i < _rawProducts[msg.sender].length; i++) {
      if (keccak256(abi.encodePacked((_rawProducts[msg.sender][i]))) == keccak256(abi.encodePacked((_name)))) {
        productAlreadyAdded = true;
      }
    }
    if(!productAlreadyAdded){
      _rawProducts[msg.sender].push(_name);
    }
    _rawProductSuppliers[_name].push(_supplier);
    _rawProductVerified[_name] = super.get(_supplier).isVerified && _rawProductVerified[_name];
    return true;
  }

}