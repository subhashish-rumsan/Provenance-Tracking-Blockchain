import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const AuthContract = await ethers.getContractFactory("Auth");
  const FactoryContract = await ethers.getContractFactory("Factory");

  const authContract = await AuthContract.deploy();
  const factoryContract = await FactoryContract.deploy();

  console.log("Storage deployed to:", await authContract.getAddress());
  console.log("Factory deployed to:", await factoryContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
