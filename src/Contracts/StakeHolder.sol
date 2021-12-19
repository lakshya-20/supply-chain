pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
contract StakeHolder {
    struct Stakeholder{
        address id;
        string name;
        string role;
        bool isValue; //to verify value exists in mapping or not
    }
    address private adminAddress;
    mapping(address => Stakeholder) public stakeholders;

    constructor () public {
        adminAddress = msg.sender;
    }

    //get stakeholder by id
    function getStakeholder(address id) public view returns(Stakeholder memory){
        return stakeholders[id];
    }

    //Adding new stakeholder
    function addStakeHolder(
        string memory name,
        string memory role
    ) public {
        stakeholders[msg.sender] = Stakeholder(msg.sender,name,role,true);        
    }

    

}