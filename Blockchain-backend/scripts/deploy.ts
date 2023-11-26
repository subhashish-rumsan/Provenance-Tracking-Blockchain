import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const AuthContract = await ethers.getContractFactory("Auth");

  const authContract = await AuthContract.deploy();

  console.log("Storage deployed to:", await authContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
