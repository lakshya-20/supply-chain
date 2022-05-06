// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './Stakeholder.sol';
contract Farmer is Stakeholder {
  mapping(address => string[]) public _farmerRawProducts;
  mapping(string => address[]) public _rawProductFarmers;

  constructor() Stakeholder() {}

  function registerFarmer(
    string memory _name, 
    string memory _location, 
    string memory _role,
    string[] memory _rawProducts
  ) public returns (bool) {
    require (_stakeholders[msg.sender].id ==  address(0), "Farmer::registerFarmer: Farmer already registered");
    _stakeholders[msg.sender] = stakeholder(msg.sender, _name, _location, _role, false);
    _farmerRawProducts[msg.sender] = _rawProducts;
    for (uint i = 0; i < _rawProducts.length; i++) {
      _rawProductFarmers[_rawProducts[i]].push(msg.sender);
    }
    _stakeholderAddresses.push(msg.sender);
    return true;
  }

  function addRawProduct(string memory _rawProduct) public returns (bool) {
    bool productAlreadyAdded = false;
    for (uint i = 0; i < _farmerRawProducts[msg.sender].length; i++) {
      if (keccak256(abi.encodePacked((_farmerRawProducts[msg.sender][i]))) == keccak256(abi.encodePacked((_rawProduct)))) {
        productAlreadyAdded = true;
      }
    }
    require(!productAlreadyAdded, "Farmer::addRawProduct: Raw product already added");
    _farmerRawProducts[msg.sender].push(_rawProduct);
    _rawProductFarmers[_rawProduct].push(msg.sender);
    return true;
  }

  function getFarmer(address _id) public view onlyStakeholder(_id) returns(
    stakeholder memory farmer,
    string[] memory rawProducts
  ){
    farmer = super.get(_id);
    rawProducts = _farmerRawProducts[_id];
  }

  function getRawProductFarmers(string memory _rawProduct) public view returns (address[] memory) {
    return _rawProductFarmers[_rawProduct];
  }

}