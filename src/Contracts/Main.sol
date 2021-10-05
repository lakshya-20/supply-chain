pragma solidity ^0.5.0;

contract Main{
    struct Farmer{
        address id;
        string name;
        string region;
        bool isVerified;
        string [] products;        
    }
    struct Manufacturer{
        address id;
        string name;
        mapping(string => address) rawProducts;
        bool isRenewableUsed;
    }

    struct Product{
        address id;
        string name;
        address ownership;
        address manufacturer;
        string[] rawProducts;
        string serialNo;
    }

    enum Role {Distributer, retailer, consumer}

    struct Stakeholder{
        address id;
        string name;
        Role role;
    }

    mapping(address => Farmer) farmers;
    mapping(address => Manufacturer) manufacturers;
    mapping(string => Product) products;
    mapping(address => Stakeholder) stakeholders;
}