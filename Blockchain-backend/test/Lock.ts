import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ContractTransactionResponse } from "ethers";
import { ethers } from "hardhat";
import { Storage } from "../typechain-types";

describe("Lock", function () {
  let Storage;
  let storage: Storage & {
    deploymentTransaction(): ContractTransactionResponse;
  };

  beforeEach(async function () {
    Storage = await ethers.getContractFactory("Storage");
    storage = await Storage.deploy();
  });

  describe("Deployment", async function () {
    it("Initial value of number should be 5", async () => {
      expect(await storage.retrieve()).to.equal(5);
    });

    it("Should store and change value of number", async () => {
      await storage.store(10);
      expect(await storage.retrieve()).to.equal(10);
    });
  });
});
