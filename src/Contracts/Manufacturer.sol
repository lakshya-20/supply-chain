pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
contract Manufacturer {    
    struct Manufacturer{
        address id;
        string name;
        string[] rawProducts;        
        bool isRenewableUsed;
        bool isValue; //to verify value exists in mapping or not
    }
    address private adminAddress;
    address [] private manufacturersList;
    mapping(address => Manufacturer) private manufacturers;            
    mapping(string => address) private farmerAddresses; //Mapping to store raw material supplier address for a manufacturer
    
    constructor() public {
        adminAddress = msg.sender;        
    }

    //get list of ids of all manufacturers
    function getManufacturersList() public view returns(address[] memory){
        return manufacturersList;
    }

    //Get manufacturer by id
    function getManufacturer(address id) public view returns(Manufacturer memory){
        return manufacturers[id];
    }

    //Adding new manufacturer
    function addManufacturer(
        string memory name, 
        string[] memory rawProducts,
        address[] memory farmerAddress
    ) public {        
        manufacturersList.push(msg.sender);                
        manufacturers[msg.sender] = Manufacturer(msg.sender, name, rawProducts, false, true);
        for(uint i=0; i<rawProducts.length; i++){            
            farmerAddresses[string(abi.encodePacked(msg.sender, rawProducts[i]))] = farmerAddress[i];    
        }   
    }

    //Updating raw products information for a manufacturer
    function updateRawProducts(        
        string[] memory rawProducts,
        address[] memory farmerAddress
    ) public {
        for(uint i = 0;i< rawProducts.length; i++){
            for(uint j=0; j<manufacturers[msg.sender].rawProducts.length; j++){                
                if(keccak256(abi.encodePacked(manufacturers[msg.sender].rawProducts[j])) == keccak256(abi.encodePacked(rawProducts[i]))){
                    farmerAddresses[string(abi.encodePacked(msg.sender, rawProducts[i]))] = farmerAddress[i];
                    break;
                }
            }
            manufacturers[msg.sender].rawProducts.push(rawProducts[i]);
            farmerAddresses[string(abi.encodePacked(msg.sender, rawProducts[i]))] = farmerAddress[i];
        }
    }

    //Get raw material supplier(farmer) address for a manufacturer
    function getRawProductInfo(
        address id,
        string memory rawProduct        
    ) public view returns (address){
        return farmerAddresses[string(abi.encodePacked(id, rawProduct))];
    }

    //Verify manufacturer source of energy
    function verifyManufacturer(address id) public {
        require(msg.sender == adminAddress, "Manufacturer::verify: Only admin can verify an identity");
        manufacturers[id].isRenewableUsed = true;
    }
}