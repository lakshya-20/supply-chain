// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './Admin.sol';
contract Stakeholder is Admin{
  
  struct stakeholder{
    address id;
    string name;
    string location;
    string role;
    bool isVerified;
  }

  mapping(address => stakeholder) _stakeholders;
  mapping(address => mapping(uint256 => bool)) _stakeholderProductOwnership;
  mapping(address => mapping(address => bool)) _operatorApprovals;
  address[] _stakeholderAddresses;

  constructor() Admin(msg.sender){}

  function register(
    string memory _name,
    string memory _location,
    string memory _role
  ) public virtual returns (bool) {
    require (_stakeholders[msg.sender].id ==  address(0), "Stakeholder::register: Stakeholder already registered");
    _stakeholders[msg.sender] = stakeholder(msg.sender, _name, _location, _role, false);
    _stakeholderAddresses.push(msg.sender);
    return true;
  }
  
  function get(address _id) public view onlyStakeholder(_id) returns(stakeholder memory){
    return _stakeholders[_id];
  }

  function setApprovalForAll(
    address _operator,
    bool _approved
  ) public virtual returns (bool){
    require (msg.sender != _operator, "Stakeholder::setApprovalForAll: Cannot set approval for self");
    require (_operator != address(0), "Stakeholder::setApprovalForAll: Cannot set approval for null address");
    _operatorApprovals[msg.sender][_operator] = _approved;
    return true;
  }

  function isApprovedForAll(
    address _owner,
    address _operator
  ) public view virtual returns (bool){
    return _operatorApprovals[_owner][_operator];
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _productId
  ) public virtual onlyOwnerOrApproved(_from, _productId) returns (bool){
    require (_from != _to, "Stakeholder::transferFrom: Cannot transfer to self");
    require (_to != address(0), "Stakeholder::transferFrom: Cannot transfer to null address");
    _stakeholderProductOwnership[_from][_productId] = false;
    _stakeholderProductOwnership[_to][_productId] = true;
    return true;
  }

  function verify(address _id) public onlyAdmin returns (bool){
    _stakeholders[_id].isVerified = true;
    return true;
  }

  function isVerified(address _id) public view returns (bool){
    return _stakeholders[_id].isVerified;
  }

  function getRole(address _id) public view returns (string memory){
    return _stakeholders[_id].role;
  }

  function getAddresses() public view returns (address[] memory){
    return _stakeholderAddresses;
  }

  modifier onlyStakeholder(address _id){
    require(
      _id == _stakeholders[msg.sender].id || _stakeholders[msg.sender].id == address(0), 
      "Only stakeholder can access this function"
    );
    _;
  }

  modifier onlyOwnerOrApproved(address _from, uint256 _productId){
    bool _from_the_product_owner = _stakeholderProductOwnership[_from][_productId];
    bool _approved_or_product_owner = isApprovedForAll(_from, msg.sender) || msg.sender == _from;

    require( _from_the_product_owner && _approved_or_product_owner, "Only owner or approved can access this function");
    _;
  }

}