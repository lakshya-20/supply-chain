const { assert } = require('chai');

const Product = artifacts.require('Product');

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract('Product',(accounts)=>{
    const admin = accounts[0];
    const farmerAddress = accounts[1];
    const manufacturerAddress = accounts[2];
    const distributerAddress = accounts[3];
    const consumerAddress = accounts[4];
    let productContract;
    const productSerialNo = "123456";
    before(async () =>{
        productContract = await Product.deployed();
    })

    it(`Contract has no product with serialNo: ${productSerialNo}`, async ()=>{
        const product = await productContract.getProduct(productSerialNo);
        assert.isFalse(product.isValue);
    })

    it(`Adding Product with serialNo: ${productSerialNo}`, async ()=>{
        await productContract.addProduct(productSerialNo, "Product 1",["Cocoa, Milk"], {from: manufacturerAddress});
        const product = await productContract.getProduct(productSerialNo);
        assert.isTrue(product.isValue);
        assert(product.ownership, manufacturerAddress);
    })

    describe("Product Ownership", async ()=>{
        it("Only current owner can update ownership", async ()=>{
            var err;
            try{
                await productContract.updateOwnership(distributerAddress, productSerialNo, {from: accounts[10]});
            } catch(error){
                err = error
            }
            assert.ok(err instanceof Error)
        })

        it("Updating Ownership", async ()=>{
            //transfering ownership of product from manufacturer to distributer
            await productContract.updateOwnership(distributerAddress, productSerialNo, {from: manufacturerAddress});
            let product = await productContract.getProduct(productSerialNo);
            assert(product.ownership, distributerAddress);

            //transfering ownership of product from distributer to consumer
            await productContract.updateOwnership(consumerAddress, productSerialNo, {from: distributerAddress});
            product = await productContract.getProduct(productSerialNo);
            assert(product.ownership, consumerAddress);
        })

    })

})