pragma solidity ^0.8.0;
contract Admin{
  address public admin;
  
  constructor(address _admin) public{
    admin = _admin;
  }
  
  modifier onlyAdmin{
    require(msg.sender == admin);
    _;
  }
}