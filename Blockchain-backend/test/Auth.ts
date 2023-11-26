import { ethers } from "hardhat";
import { expect } from "chai";

describe("Auth", function () {
  let Authentication;
  let auth: any;

  beforeEach(async function () {
    Authentication = await ethers.getContractFactory("Auth");
    auth = await Authentication.deploy();
  });

  describe("Deployment", async function () {
    it("Should deploy the Auth contract", async () => {
      expect(await auth.target).to.not.be.undefined;
    });
  });

  describe("User Registration", async function () {
    it("Should register a new user", async () => {
      const tx = await auth.register(
        "test@example.com",
        "testuser",
        "password"
      );
      await tx.wait();

      const user = await auth.users(await ethers.provider.getSigner());
      expect(user.registered).to.be.true;
    });

    it("Should not register an already registered user", async () => {
      await auth.register("test@example.com", "testuser", "password");

      // Attempt to register the same user again
      await expect(
        auth.register("test@example.com", "testuser", "password")
      ).to.be.revertedWith("User already exists");
    });
  });

  describe("User Login", async function () {
    beforeEach(async () => {
      await auth.register("test@example.com", "testuser", "password");
    });

    it("Should allow a registered user to login", async () => {
      const result = await auth.login("password");
      expect(result).to.be.true;
    });

    it("Should not allow login with incorrect password", async () => {
      await expect(auth.login("wrongpassword")).to.be.revertedWith(
        "Invalid credentials"
      );
    });
  });
});
