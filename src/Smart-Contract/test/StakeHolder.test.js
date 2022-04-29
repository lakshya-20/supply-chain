const { assert } = require('chai');

const StakeHolder = artifacts.require('StakeHolder');

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract('StakeHolder',(accounts)=>{
    const admin = accounts[0];
    const stakeHolderAddress = accounts[3];
    let stakeHolderContract;

    before(async()=>{
        stakeHolderContract = await StakeHolder.deployed();
    })
    
    it("Adding Stackholder", async () =>{
        await stakeHolderContract.addStakeHolder("Distributer 1","Distributer",{from: stakeHolderAddress});
        const stakeHolder = await stakeHolderContract.getStakeHolder(stakeHolderAddress);
        assert(stakeHolder.isValue, true);
    })

})