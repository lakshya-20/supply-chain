const Stakeholder = artifacts.require("Stakeholder");
const Farmer = artifacts.require("Farmer");
const Manufacturer = artifacts.require("Manufacturer");
const Product = artifacts.require("Product");

module.exports = async (callback) => {

  const accounts = await web3.eth.getAccounts();

  let stakeholderContract = await Stakeholder.deployed();
  let farmerContract = await Farmer.deployed();
  let manufacturerContract = await Manufacturer.deployed();
  let productContract = await Product.deployed();

  const admin = accounts[0];
  const farmer1 = accounts[1];
  const farmer2 = accounts[2];
  const manufacturer = accounts[3];
  const distributer = accounts[4];
  const retailer = accounts[5];
  const consumer = accounts[6];

  await farmerContract.registerFarmer("Farmer 1", "West India", "farmer", ["Milk", "Cocoa", "Sugar", "Apple"], { from: farmer1 });
  await farmerContract.registerFarmer("Farmer 2", "North India", "farmer", ["Rice", "Cocoa", "Wheat", "Tomato", "Sugar"], { from: farmer2 });
  await manufacturerContract.register("Cadbury", "Uxbridge, United Kingdom", "manufacturer", { from: manufacturer });
  await stakeholderContract.register("Distributer", "Uxbridge, United Kingdom", "distributer", { from: distributer });
  await stakeholderContract.register("Retailer", "New Delhi, India", "retailer", { from: retailer });
  await stakeholderContract.register("Consumer", "Greater Noida, India", "consumer", { from: consumer });

  console.log(await farmerContract.getFarmer(farmer1, { from: farmer1 }));
  console.log(await farmerContract.getFarmer(farmer2, { from: farmer2 }));
  console.log(await manufacturerContract.get(manufacturer, { from: manufacturer }));
  console.log(await stakeholderContract.get(distributer, { from: distributer }));
  console.log(await farmerContract.getRawProductFarmers("Cocoa", { from: farmer1 }));
  
  await farmerContract.verify(farmer2, { from: admin });
  console.log(await farmerContract.isVerified(farmer2, { from: farmer2 }));

  await manufacturerContract.addRawProduct("Cocoa", [
    {
      id: farmer1,
      isVerified: await farmerContract.isVerified(farmer1, { from: farmer1 })
    },
    {
      id: farmer2,
      isVerified: await farmerContract.isVerified(farmer2, { from: farmer2 })
    }
  ], { from: manufacturer });

  await manufacturerContract.addRawProduct("Milk", [
    {
      id: farmer1,
      isVerified: await farmerContract.isVerified(farmer1, { from: farmer1 })
    },
  ], { from: manufacturer });
  await manufacturerContract.addRawProduct("Tomato", [
    {
      id: farmer2,
      isVerified: await farmerContract.isVerified(farmer2, { from: farmer2 })
    },
  ], { from: manufacturer });
  await manufacturerContract.addRawProduct("Sugar", [
    {
      id: farmer1,
      isVerified: await farmerContract.isVerified(farmer1, { from: farmer1 })
    },
    {
      id: farmer2,
      isVerified: await farmerContract.isVerified(farmer2, { from: farmer2 })
    }
  ], { from: manufacturer });

  console.log(await manufacturerContract.getManufacturerRawProductDetails(manufacturer, { from: manufacturer }));

  await productContract.add(123, "Dairy Milk", {from: manufacturer});
  await manufacturerContract.launchProduct(123, {from: manufacturer});
  console.log(await productContract.get(123, {from: consumer}));
  await productContract.transfer(retailer, 123, {from: manufacturer});
  console.log(await productContract.get(123, {from: consumer}));
  await productContract.transfer(consumer, 123, {from: retailer});
  console.log(await productContract.get(123, {from: consumer}));

  await productContract.addReview(123, 70, "Good product", {from: consumer});
  console.log(await productContract.get(123, {from: consumer}));
  await productContract.addReview(123, 90, "Value for money", {from: consumer});
  console.log(await productContract.get(123, {from: consumer}));
  await productContract.addReview(123, 60, "Useful", {from: consumer});
  console.log(await productContract.get(123, {from: consumer}));

  callback();
}