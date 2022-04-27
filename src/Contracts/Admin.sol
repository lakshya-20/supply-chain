// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Admin{
  address public admin;
  
  constructor(address _admin){
    admin = _admin;
  }

  function isAdmin(address _account) public view returns (bool){
    return _account == admin;
  }
  
  modifier onlyAdmin{
    require(msg.sender == admin);
    _;
  }
}