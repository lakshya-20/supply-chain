pragma solidity >=0.4.22 <0.9.0;

import './Farmer.sol';
import './Manufacturer.sol';
import './StakeHolder.sol';
import './Product.sol';

contract Main{

    Farmer public farmer;
    Manufacturer public manufacturer;
    StakeHolder public stakeHolder;
    Product public product;

    constructor(Farmer _farmer, Manufacturer _manufacturer, StakeHolder _stakeHolder, Product _product) public {
        farmer = _farmer;
        manufacturer = _manufacturer;
        stakeHolder = _stakeHolder;
        product = _product;
    }
}