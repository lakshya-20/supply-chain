pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract Main{
    struct Farmer{
        address id;
        string name;
        string region;
        bool isVerified;
        bool isValue; //to verify value exists in mapping or not
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
        bool[] rawProductsVerification;
        string serialNo;
    }

    // enum Role {Distributer, Retailer, Consumer, Manufacturer}

    struct Stakeholder{
        address id;
        string name;
        string role;
        bool isValue; //to verify value exists in mapping or not
    }

    mapping(address => Farmer) public farmers;
    mapping(address => Manufacturer) public manufacturers;
    mapping(string => Product) public products;
    mapping(address => Stakeholder) public stakeholders;
    
    address [] public farmersArray;

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
     * Function to get the role of the passed address
     */
    function checkIdentity(address id) public view returns(string memory) {
        if(id == admin) return "Admin";
        else if(farmers[id].isValue) return "Farmer";
        else if(stakeholders[id].isValue) return stakeholders[id].role;
        else return "NewAddress";
    }

    /**
     * Function to add a new farmer on the application
     */
    function registerFarmer(
        string memory name,
        string memory region,
        string[] memory rawProducts
    ) public {
        farmers[msg.sender] = Farmer(msg.sender,name,region,false,true,rawProducts);
        farmersArray.push(msg.sender);
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

    /**
     * function to return array of address of all farmers
     */
    function getFarmersArray() public view returns(address[] memory){
        return farmersArray;
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
        string[] memory rawProducts,
        address[] memory farmerAddresses
    ) public {
        //manufacturers[msg.sender].rawProducts[rawProductName] = farmerAddress;
        for(uint i = 0;i< rawProducts.length; i++){
            manufacturers[msg.sender].rawProducts[rawProducts[i]] = farmerAddresses[i];
        }
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
        stakeholders[msg.sender] = Stakeholder(msg.sender,name,role,true);
        if(keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("Manufacturer"))){
            manufacturers[msg.sender] = Manufacturer({
                id: msg.sender,
                name: name,
                isRenewableUsed: false
            });
        }
    }

    /**
     * function to find a stackholder by address
     */
    function findStakeholder(address id) public view returns(Stakeholder memory){
        return stakeholders[id];
    }

    function launchProduct(
        string memory name,
        string[] memory rawProducts,
        string memory serialNo
    ) public {
        bool[] memory rawProductsVerification = new bool[](rawProducts.length);
        for(uint i=0;i<rawProducts.length;i++){
            rawProductsVerification[i] = farmers[manufacturers[msg.sender].rawProducts[rawProducts[i]]].isVerified;
        }
        products[serialNo] = Product(name,msg.sender,msg.sender,rawProducts,rawProductsVerification,serialNo);
    }

    function transferOwnership(
        address newOwner,
        string memory serialNo
    ) public {
        require(products[serialNo].ownership==msg.sender,"Invalid Ownership");
        products[serialNo].ownership = newOwner;
    }

    function verifyProduct(
        string memory serialNo
    ) public view returns (Product memory, string memory, bool, Stakeholder memory){
        Product memory product = products[serialNo];
        Manufacturer memory manufacturerDetails = manufacturers[product.manufacturer];
        // Stakeholder memory manufacturer = stakeholders[product.manufacturer];
        Stakeholder memory currentOwner = stakeholders[product.ownership];
        return(
            product,            
            manufacturerDetails.name,
            manufacturerDetails.isRenewableUsed,
            currentOwner
        );
    }

}