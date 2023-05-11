# Authenticity in Food Supply Chain Using Blockchain
![Solidity](https://img.shields.io/badge/Solidity-000000?style=for-the-badge&logo=solidity&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-white?style=for-the-badge&logo=ethereum&logoColor=blue)
![Javascript](https://img.shields.io/badge/Javascript-ffff00?&style=for-the-badge&logo=react&logoColor=black) 
![React](https://img.shields.io/badge/React-0095D5?&style=for-the-badge&logo=react&logoColor=white) 

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/lakshya-20/supply-chain?style=for-the-badge)
[![GitHub last commit](https://img.shields.io/github/last-commit/lakshya-20/supply-chain?style=for-the-badge)](https://github.com/lakshya-20/supply-chain/commits)


## Project description

### Introduction
The food supply chain is a complex but necessary food production arrangement needed by the global community to maintain sustainability and food security. The supply chain has been extended geographically involving many more stakeholders, making the supply chain longer and complicated and thus involving many challenges.

Some of the challenges that are commonly faced in food supply chains are
* Lack of traceability and communication.
* Rising supply chain costs.
* Supply of fraudulent food products.
* Failure in monitoring warehouses.

### Objectives
The project aims to design a decentralized food supply chain to trace products from end to end and provide a smart and reliable way of providing information to the customers. <br/>
**Features**
* Platform to trace food products worldwide.
* Restricting duplicate and unauthentic products.
* Proper food distribution.
* Reducing the supply chain costs.

### System Architecture
The application follows the layered architecture where components which similar functionality are organized into horizontal layers and each layer has a specific role within the application.
<br/>
The system architecture consists of three layers:
- Application Layer
- Blockchain Layer
- Infrastructure Layer
<p align="center">
  <img src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1652867380/Supply%20Chain/Github%20Readme/layer_arch_s5avzr.png" width="500px"/>
</p>

### Methodology
The project is build on three core modules: Traceability System, Trading Mechanism and Reputation System.
1. **Traceability System**
    * Each product is marked with unique serial code which is onwed by an externally owned account on Ethereum.
    * Every product transaction is recorded and stored in smart contract and linked with product's serial code.
    * This comes with Access Control Strategy which allows only authentic users to make specific transactions.
2. **Trading Mechanism**
    <p align="center">
      <img src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1652867380/Supply%20Chain/Github%20Readme/trading_mechanism_icqvdz.png" width="500px"/>
    </p>

    * The process of delivering goods from one entity to another is tracked and recorded on the blockchain.
    * The consumers first register themselves on the system and request to purchase the product with a serial number.
    * The purchase request is sent to the product owner who updates the product ownership with the new owner.
    * This process ensures that retailers do not sell products with duplicate serial codes.
3. **Reputation System**
    <p align="center">
      <img src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1652867379/Supply%20Chain/Github%20Readme/reputation_system_wumzif.png" width="500px"/>
    </p>

    * This system adds a layer of trust between customers and retailers.
    * This mechanism allows only actual customers of the product to post feedback about the product.
    * The reviews on the blockchain are immutable which does not allow any merchant or retailer to delete or update bad reviews to increase their overall ratings. 
    * And in this way this mechanism maintains the complete integrity of the retailer and let the customer know about the seller before making the transaction.


## Development Setup
### Requirements
- [NodeJS](https://nodejs.org/en) >= 10.16 and [npm](https://www.npmjs.com/) >= 5.6 installed.
- [Git](https://git-scm.com/) installed in the system.
- [Truffle](https://www.trufflesuite.com/truffle), which can be installed globally with `npm install -g truffle`
- [Metamask](https://metamask.io) extension added to the browser.
- [Ganache](https://trufflesuite.com/ganache/) development network.

**Clone the repository**
```bash
git clone https://github.com/lakshya-20/supply-chain
```

### Setting Up Truffle Project
Smart contracts or blockchain codes are necessary config files for developing, testing and deploying application business logic are present inside `src/Smart-Contract` directory. 

**Checkout smart contracts directory**
```
cd src/Smart-Contract
```
**Install Truffle**
```
npm install -g truffle
```
**Compile Smart Contracts**
```
truffle compile
```
**Deploy Smart Contract on Ganache's development Network**
```
truffle migrate --reset
```
**Run Test Coverage**
```
truffle test
```

### Setting up Client Application

**Create `.env` file to setup environment variables**
```
REACT_APP_NFT_STORAGE_APIKEY=<https://nft.storage APIKEY>
```

**Install Dependencies**
```
npm install
```
**Start Client**
```
npm start
```
## Contributing
1. Fork it
2. Create your feature branch `(git checkout -b my-new-feature)`
3. Commit your changes `(git commit -m 'Add some feature')`
4. In case of multiple commits squash them. You can find guide here: [how to squash commits](https://medium.com/@slamflipstrom/a-beginners-guide-to-squashing-commits-with-git-rebase-8185cf6e62ec)
4. Run the tests with `(npm run test)` and make sure all tests are passed.
5. Push your branch `(git push origin my-new-feature)`
6. Create a new Pull Request, following the template