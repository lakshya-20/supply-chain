const Stakeholder = artifacts.require("Stakeholder");
const Farmer = artifacts.require("Farmer");
const Manufacturer = artifacts.require("Manufacturer");
const Product = artifacts.require("Product");
const Main = artifacts.require("Main");

module.exports = async (callback) => {

  const accounts = await web3.eth.getAccounts();

  let stakeholderContract = await Stakeholder.deployed();
  let farmerContract = await Farmer.deployed();
  let manufacturerContract = await Manufacturer.deployed();
  let productContract = await Product.deployed();
  let mainContract = await Main.deployed(farmerContract.address, manufacturerContract.address, stakeholderContract.address);

  const admin = accounts[0];
  const farmer1 = accounts[1];
  const farmer2 = accounts[2];
  const manufacturer = accounts[3];
  const distributer = accounts[4];
  const retailer = accounts[5];
  const consumer = accounts[6];

  await stakeholderContract.register("Admin", "Internet", "admin", { from: admin });
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
  console.log(await stakeholderContract.get(accounts[7], { from: accounts[7] }));
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
  await manufacturerContract.addRawProduct("Wheat", [
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

  let manufacturerRawProducts = await manufacturerContract.getManufacturerRawProductDetails(manufacturer, { from: manufacturer });
  manufacturerRawProductsMap = {};
  for (let i = 0; i < manufacturerRawProducts.length; i++) {
    manufacturerRawProductsMap[manufacturerRawProducts[i].name] = manufacturerRawProducts[i].isVerified;
  }
  console.log(manufacturerRawProductsMap);

  await productContract.add(
    123, 
    "Dairy Milk", 
    [
      {
        name: "Milk",
        isVerified: manufacturerRawProductsMap["Milk"]
      },
      {
        name: "Sugar",
        isVerified: manufacturerRawProductsMap["Sugar"]
      },
      {
        name: "Wheat",
        isVerified: manufacturerRawProductsMap["Wheat"]
      }
    ],
    {from: manufacturer}
  );
  await manufacturerContract.launchProduct(123, {from: manufacturer});

  await productContract.transfer(retailer, 123, {from: manufacturer});
  await productContract.transfer(consumer, 123, {from: retailer});

  await productContract.addReview(123, 70, "Good product", {from: consumer});
  await productContract.addReview(123, 90, "Value for money", {from: consumer});
  await productContract.addReview(123, 60, "Useful", {from: consumer});
  console.log(await productContract.get(123, {from: consumer}));

  console.log("Stats: ")
  var count = await productContract.getProductsCount({from: consumer});
  console.log("Products: " + count.words[0]);
  count = await productContract.getTransactionsCount({from: consumer});
  console.log("Transactions: " + count.words[0]);
  count = await productContract.getReviewsCount({from: consumer});
  console.log("Reviews: " + count.words[0]);

  console.log(await mainContract.getRole(admin));
  console.log(await mainContract.getRole(farmer1));
  console.log(await mainContract.getRole(farmer2));
  console.log(await mainContract.getRole(manufacturer));
  console.log(await mainContract.getRole(distributer));
  console.log(await mainContract.getRole(retailer));
  console.log(await mainContract.getRole(consumer));
  console.log(await mainContract.getRole(accounts[7]));

  callback();
}