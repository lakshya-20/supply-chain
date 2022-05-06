// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './Stakeholder.sol';
contract Farmer is Stakeholder {
  mapping(address => bool) public _farmerVerified;
  mapping(address => string[]) public _farmerRawProducts;
  mapping(string => address[]) public _rawProductFarmers;

  constructor() Stakeholder() {}

  function register(string memory _name, string memory _location) public override returns (bool) {
    require (_stakeholders[msg.sender].id ==  address(0), "Farmer::registerFarmer: Farmer already registered");
    _stakeholders[msg.sender] = stakeholder(msg.sender, _name, _location, "farmer");
    _farmerVerified[msg.sender] = false;
    _farmerRawProducts[msg.sender] = new string[](0);
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

  function verify(address farmer) public onlyAdmin returns (bool){
    _farmerVerified[farmer] = true;
    return true;
  }

  function getFarmer(address _id) public view onlyStakeholder(_id) returns(
    stakeholder memory,
    bool farmerVerified,
    string[] memory farmerRawProducts
  ){
    stakeholder memory stakeholder = super.get(_id);
    farmerVerified = _farmerVerified[_id];
    farmerRawProducts = _farmerRawProducts[_id];
    return (stakeholder, farmerVerified, farmerRawProducts);
  }

  function getRawProductFarmers(string memory _rawProduct) public view returns (address[] memory) {
    return _rawProductFarmers[_rawProduct];
  }

}