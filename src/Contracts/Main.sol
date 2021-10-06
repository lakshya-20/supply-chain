pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract Main{
    struct Farmer{
        address id;
        string name;
        string region;
        bool isVerified;
        string [] rawProducts;        
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

    mapping(address => Farmer) public farmers;
    mapping(address => Manufacturer) public manufacturers;
    mapping(string => Product) public products;
    mapping(address => Stakeholder) public stakeholders;

    address payable public admin;
    constructor() public {
        admin = msg.sender;        
    }

    // Modifier to ensure only the admin access a function
    modifier verifyAdmin( address id) {
        require(id == admin, "Unauthorized");
        _;
    }

    /**
     * Function to register a farmer on the application
     */
    function registerFarmer(
        string memory name,
        string memory region,
        string[] memory rawProducts
    ) public {
        farmers[msg.sender] = Farmer(msg.sender,name,region,false,rawProducts);
    }
    
    function verifyFarmer(address id) public verifyAdmin(msg.sender) {
        farmers[id].isVerified = true;
    }

}