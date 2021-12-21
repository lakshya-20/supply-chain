const { assert } = require('chai');

const Manufacturer = artifacts.require('Manufacturer');

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract('Manufacturer',(accounts)=>{
    const admin = accounts[0];
    const farmerAddress = accounts[1];
    const manufacturerAddress = accounts[2];
    let manufacturerContract;  
    
    before(async () => {
        manufacturerContract = await Manufacturer.deployed();
    })

    it("Contract has no manufacturers",async () =>{
        var manufacturersList = await manufacturerContract.getManufacturersList();
        assert.equal(manufacturersList.length,0);
    })

    it("Adding Manufacturer", async () =>{
        await manufacturerContract.addManufacturer(
            "Manufacturer 1",
            ["Apple","Cocoa"],
            [farmerAddress, farmerAddress],
            {from: manufacturerAddress}
        );
        var manufacturer = await manufacturerContract.getManufacturer(manufacturerAddress);
        assert.equal(manufacturer.isValue,true);            
    })

    it("Contract has manufacturers",async () =>{
        var manufacturersList = await manufacturerContract.getManufacturersList();
        assert.isAbove(manufacturersList.length,0);
    })

    it('Updating Manufacturer Raw Products', async () => {
        await manufacturerContract.updateRawProducts(
            ["Cocoa","Milk"],
            [farmerAddress, farmerAddress],
            {from: manufacturerAddress}
        );        
        expect(await manufacturerContract.getRawProductInfo(manufacturerAddress,"Cocoa")).to.equal(farmerAddress);
        expect(await manufacturerContract.getRawProductInfo(manufacturerAddress,"Milk")).to.equal(farmerAddress);
    })

    describe("Manufacturer Verfication", async () =>{
        it("Only admin can verify Manufacturer", async ()=>{
            var err;
            try{
                await manufacturerContract.verifyManufacturer(manufacturerAddress,{from: accounts[1]});
            } catch(error){
                err = error
            }
            assert.ok(err instanceof Error)
        })
        it("Verifying Manufacturer", async () =>{
            await manufacturerContract.verifyManufacturer(manufacturerAddress,{from: admin});
            const manufacturer = await manufacturerContract.getManufacturer(manufacturerAddress);
            assert.equal(manufacturer.isRenewableUsed, true);
        })
    })
})