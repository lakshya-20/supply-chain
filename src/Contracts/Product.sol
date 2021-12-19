pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
contract Product {
    struct Product{
        string id;
        string name;
        address ownership;
        address manufacturer;
        string[] rawProducts;  
    }
    mapping(string => Product) public products;

    //add new product
    function addProduct(
        string memory id,
        string memory name,
        string[] memory rawProducts
    ) public {
        Product storage product = products[id];
        product.name = name;
        product.ownership = msg.sender;
        product.manufacturer = msg.sender;
        product.rawProducts = rawProducts;        
    }

    //get product by id
    function getProduct (string memory id) public view returns (Product memory) {
        return products[id];
    }

    //update product ownership
    function updateOwnership(
        address newOwner,
        string memory id
    ) public {
        require(products[id].ownership==msg.sender,"Product::Transfer: Only owner can transfer the ownership");
        products[id].ownership = newOwner;
    }

}