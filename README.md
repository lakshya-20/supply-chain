# Food Supply Chain Using Blockchain
![Solidity](https://img.shields.io/badge/Solidity-000000?style=for-the-badge&logo=solidity&logoColor=white) 
![Javascript](https://img.shields.io/badge/Javascript-ffff00?&style=for-the-badge&logo=react&logoColor=black) 
![React](https://img.shields.io/badge/React-0095D5?&style=for-the-badge&logo=react&logoColor=white) 

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/lakshya-20/supply-chain?style=for-the-badge)
[![GitHub last commit](https://img.shields.io/github/last-commit/lakshya-20/supply-chain?style=for-the-badge)](https://github.com/lakshya-20/supply-chain/commits)


## Project description
The food supply chain is a complex but necessary food production arrangement needed by the global community to maintain sustainability and food security. The supply chain has been extended geographically involving many more stakeholders, making the supply chain longer and complicated and thus involving many challenges.

This application tries to solve some of the major problems faced in a consumer-centric food supply chain with the help of blockchain. This system can act as a central microservice that can be implemented in all other existing services to ensure authenticity and find the vulnerabilities in existing systems.

Problems tried to solve:
- Methodical monitoring and tracking solutions.
- Prevent fake food supply.
- Secure and cashless payments using Blockchain.


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
Smart contracts or blockchain codes are necessary config files for developing, testing and deploying application business logic are present inside `src\Contracts` directory. `migrations` folder contains files for migrating smart contracts to the blockchain network.

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

<!--## CI
(to be added)
-->
