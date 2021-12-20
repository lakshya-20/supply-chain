const { assert } = require('chai');

const Farmer = artifacts.require('Farmer');

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Farmer',(accounts)=>{
    const admin = accounts[0];
    const farmerAddress = accounts[1];
    let farmerContract;

    before(async()=>{
        farmerContract = await Farmer.deployed();
    })


    it("Contract has no farmers",async () =>{
        var farmersList = await farmerContract.getFarmersList();
        assert.equal(farmersList.length,0);
    })

    it("Adding Farmer", async () =>{
        await farmerContract.addFarmer("Farmer1","South India",["Milk","Cocoa"],{from: farmerAddress});
        var farmer = await farmerContract.getFarmer(farmerAddress);
        assert.equal(farmer.isValue,true);            
    })
    
    it("Contract has farmers",async () =>{
        var farmersList = await farmerContract.getFarmersList();
        assert.isAbove(farmersList.length,0);
    })

    describe("Farmer Verfication", async () =>{
        it("Only admin can verify farmer", async ()=>{
            var err;
            try{
                await farmerContract.verifyFarmer(farmerAddress,{from: accounts[2]});
            } catch(error){
                err = error
            }
            assert.ok(err instanceof Error)
        })
        it("Verifying Farmer", async () =>{
            await farmerContract.verifyFarmer(farmerAddress,{from: accounts[0]});
            const farmer = await farmerContract.getFarmer(farmerAddress);
            assert.equal(farmer.isVerified, true);
        })
    })

})