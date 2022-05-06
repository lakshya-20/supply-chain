const Main = artifacts.require("Main");
const Farmer = artifacts.require('Farmer');
const Manufacturer = artifacts.require('Manufacturer');
const Product = artifacts.require('Product');
const StakeHolder = artifacts.require('StakeHolder');
module.exports = async function (deployer) {
  await deployer.deploy(Farmer);
  const farmer = await Farmer.deployed();

  await deployer.deploy(Manufacturer);
  const manufacturer = await Manufacturer.deployed();

  await deployer.deploy(StakeHolder);
  const stakeHolder = await StakeHolder.deployed();

  await deployer.deploy(Product);
  const product = await Product.deployed();

  await deployer.deploy(Main, farmer.address, manufacturer.address, stakeHolder.address, product.address);
};
