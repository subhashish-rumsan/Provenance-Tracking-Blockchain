import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const Storage = await ethers.getContractFactory("Storage");

  const storage = await Storage.deploy();

  console.log("Storage deployed to:", await storage.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
