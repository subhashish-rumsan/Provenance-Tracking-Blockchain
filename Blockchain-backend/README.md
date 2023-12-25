# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## To compile the contract

```shell
npx hardhat compile
```

## To deploy the contract

```shell
npx hardhat run scripts/deploy.ts --network sepolia
```

## To verify the deployed contract

```shell
npx hardhat verify --network sepolia contract address
```
