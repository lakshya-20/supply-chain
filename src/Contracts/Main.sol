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
        string name;
        address ownership;
        address manufacturer;
        string[] rawProducts;
        string serialNo;
    }

    // enum Role {Distributer, Retailer, Consumer, Manufacturer}

    struct Stakeholder{
        address id;
        string name;
        string role;
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
     * Function to add a new farmer on the application
     */
    function registerFarmer(
        string memory name,
        string memory region,
        string[] memory rawProducts
    ) public {
        farmers[msg.sender] = Farmer(msg.sender,name,region,false,rawProducts);
    }
    /**
     * Function to verify a farmer
     */
    function verifyFarmer(address id) public verifyAdmin(msg.sender) {
        farmers[id].isVerified = true;
    }
    /**
     * function to find a farmer by address
     */
    function findFarmer(address id) public view returns(Farmer memory){
        return farmers[id];
    }

    // /**
    //  * Function to add a new manufacturer on the application
    //  */
    // function registerManufacturer(string memory name) public {
    //     manufacturers[msg.sender] = Manufacturer({
    //         id: msg.sender,
    //         name: name,
    //         isRenewableUsed: false
    //     });
    // }
    /**
     * Function to set the isRenewableUsed for a manufacturer
     */
    function updateManufacturerRenewable(address id) public verifyAdmin(msg.sender){
        manufacturers[id].isRenewableUsed = true;
    }
    /**
     * Function to add a rawproduct for a manufacturer
     */
    function updateManufacturerRawProducts(        
        string memory rawProductName,
        address farmerAddress
    ) public {
        manufacturers[msg.sender].rawProducts[rawProductName] = farmerAddress;
    }
    /**
     * function to find a manufacturer by address
     */
    function findManufacturer(address id) public view returns(string memory,bool){
        return(
            manufacturers[id].name,
            manufacturers[id].isRenewableUsed
        );
    }

    function registerStakeHolder(
        string memory name,
        string memory role
    ) public {
        stakeholders[msg.sender] = Stakeholder(msg.sender,name,role);
        if(keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("Manufacturer"))){
            manufacturers[msg.sender] = Manufacturer({
                id: msg.sender,
                name: name,
                isRenewableUsed: false
            });
        }
    }

    function launchProduct(
        string memory name,
        string[] memory rawProducts,
        string memory serialNo
    ) public {
        products[serialNo] = Product(name,msg.sender,msg.sender,rawProducts,serialNo);
    }

    function transferOwnership(
        address newOwner,
        string memory serialNo
    ) public {
        require(products[serialNo].ownership==msg.sender,"Invalid Ownership");
        products[serialNo].ownership = newOwner;
    }

}