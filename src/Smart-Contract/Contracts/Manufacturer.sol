// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './Stakeholder.sol';
import './Farmer.sol';

contract Manufacturer is Stakeholder {

  struct rawProduct{
    string name;
    address[] boughtFromIds;
    bool isVerified;
  }

  struct supplier{
    address id;
    bool isVerified;
  }

  mapping(address => bool) public _isRenewableUsed;
  mapping(address => string[]) public _rawProducts;
  mapping(address => mapping(string => address[])) public _rawProductSuppliers;
  mapping(address => mapping(string => bool)) public _rawProductVerified;
  mapping(address => uint256[]) public _launchedProducts;

  constructor() Stakeholder() {}

  function register(
    string memory _name, 
    string memory _location,
    string memory _role
  ) public override returns (bool) {
    require (_stakeholders[msg.sender].id ==  address(0), "Manufacturer::registerManufacturer: Manufacturer already registered");
    _stakeholders[msg.sender] = stakeholder(msg.sender, _name, _location, _role, false);
    _isRenewableUsed[msg.sender] = false;
    _stakeholderAddresses.push(msg.sender);
    return true;
  }

  function addRawProduct(string memory _name, supplier[] memory _suppliers) public returns (bool){
    bool productAlreadyAdded = false;
    for (uint i = 0; i < _rawProducts[msg.sender].length; i++) {
      if (keccak256(abi.encodePacked((_rawProducts[msg.sender][i]))) == keccak256(abi.encodePacked((_name)))) {
        productAlreadyAdded = true;
      }
    }
    if(!productAlreadyAdded){
      _rawProducts[msg.sender].push(_name);
    }
    _rawProductVerified[msg.sender][_name] = true;
    for(uint i =0; i < _suppliers.length; i++){
      _rawProductSuppliers[msg.sender][_name].push(_suppliers[i].id);
      _rawProductVerified[msg.sender][_name] = _rawProductVerified[msg.sender][_name] && _suppliers[i].isVerified;
    }
    return true;
  }

  function getManufacturerRawProductDetails(address _id) public view returns (rawProduct[] memory){
    rawProduct[] memory rawProducts = new rawProduct[](_rawProducts[_id].length);
    for (uint i = 0; i < _rawProducts[_id].length; i++) {
      rawProducts[i].name = _rawProducts[_id][i];
      rawProducts[i].boughtFromIds = _rawProductSuppliers[_id][_rawProducts[_id][i]];
      rawProducts[i].isVerified = _rawProductVerified[_id][_rawProducts[_id][i]];
    }
    return rawProducts;
  }

  function getManufacturer(address id) public view returns (
    stakeholder memory manufacturer,
    bool isRenewableUsed,
    rawProduct[] memory rawProducts,
    uint256[] memory launchedProductIds
  ){
    manufacturer = stakeholder(id, _stakeholders[id].name, _stakeholders[id].location, _stakeholders[id].role, _stakeholders[id].isVerified);
    isRenewableUsed = _isRenewableUsed[id];
    rawProducts = getManufacturerRawProductDetails(id);
    launchedProductIds = _launchedProducts[id];
  }

  function launchProduct(uint256 _id) public returns (bool) {
    _launchedProducts[msg.sender].push(_id);
    _stakeholderProductOwnership[msg.sender][_id] = true;
    return true;
  }

  function updateEnergy(address id) public onlyAdmin returns (bool) {
    _isRenewableUsed[id] = true;
    return true;
  }

}