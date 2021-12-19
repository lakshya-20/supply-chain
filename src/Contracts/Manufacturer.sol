pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
contract Manufacturer {    
    struct Manufacturer{
        address id;
        string name;
        mapping(string => address) rawProducts;
        bool isRenewableUsed;
        bool isValue; //to verify value exists in mapping or not
    }
    address private adminAddress;
    address [] private manufacturersList;
    mapping(address => Manufacturer) private manufacturers;        

    constructor() public {
        adminAddress = msg.sender;        
    }

    //get list of ids of all manufacturers
    function getManufacturersList() public view returns(address[] memory){
        return manufacturersList;
    }

    //Get manufacturer by id
    function getManufacturer(address id) public view returns(string memory, bool, bool){
        return(
            manufacturers[id].name,
            manufacturers[id].isRenewableUsed,
            manufacturers[id].isValue            
        );
    }

    //Adding new manufacturer
    function addManufacturer(string memory name) public {        
        manufacturersList.push(msg.sender);
        Manufacturer storage manufacturer = manufacturers[msg.sender];
        manufacturer.id = msg.sender;
        manufacturer.name = name;
        manufacturer.isRenewableUsed = false;    
        manufacturer.isValue = true;    
    }

    //Adding raw products information for a manufacturer
    function addRawProducts(        
        string[] memory rawProducts,
        address[] memory farmerAddresses
    ) public {
        for(uint i = 0;i< rawProducts.length; i++){
            manufacturers[msg.sender].rawProducts[rawProducts[i]] = farmerAddresses[i];
        }
    }

    //Verify manufacturer source of energy
    function verifyManufacturer(address id) public {
        require(msg.sender == adminAddress, "Manufacturer::verify: Only admin can verify an identity");
        manufacturers[id].isRenewableUsed = true;
    }
}