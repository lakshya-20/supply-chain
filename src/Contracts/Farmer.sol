pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
contract Farmer {
    struct Farmer{
        address id;
        string name;
        string region;
        bool isVerified;
        bool isValue; //to verify value exists in mapping or not
        string [] rawProducts;         
    }
    address private adminAddress;
    address [] private farmersList;
    mapping(address => Farmer) private farmers;    

    constructor() public {
        adminAddress = msg.sender;
    }

    //get list of ids of all farmers
    function getFarmersList() public view returns(address[] memory){
        return farmersList;
    }

    //get farmer by id
    function getFarmer(address id) public view returns(Farmer memory){
        return farmers[id];
    }

    //Adding new farmer
    function addFarmer(
        string memory name,
        string memory region,
        string[] memory rawProducts
    ) public {
        farmers[msg.sender] = Farmer(msg.sender,name,region,false,true,rawProducts);
        farmersList.push(msg.sender);
    }

    //Verify farmer
    function verifyFarmer(address id) public {
        require(msg.sender == adminAddress, "Farmer::verify: Only admin can verify an identity");
        farmers[id].isVerified = true;
    }
}