import web3 from "@utils/web3";
import { useState, useCallback, useEffect } from "react";

// Replace with your actual ABI and contract address
const ABI: JSON = [
  // ... your contract ABI here
];
const CONTRACT_ADDRESS = "0x...";

export const useContract = (name: string, description: string) => {
  const [contract, setContract] = useState<null | web3.eth.Contract>(null);

  useEffect(() => {
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    console.log({ contract });
    setContract(contract);
  }, []);

  const getContract = useCallback(() => {
    try {
      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      console.log("contract is: ", { contract });
      return contract;
    } catch (error) {
      console.error("Error creating contract:", error);
      throw error;
    }
  }, []);

  const mint = async () => {
    try {
      const transaction = await contract.methods.mint(name, description).send({
        from: web3.eth.defaultAccount, // Assuming a connected account
      });
      console.log("Minting transaction:", transaction);
      return transaction.transactionHash;
    } catch (error) {
      console.error("Error minting:", error);
      throw error;
    }
  };

  const balanceOf = async (address: string) => {
    try {
      const balance = await contract.methods.balanceOf(address).call();
      console.log("Balance of", address, ":", balance);
      return balance;
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  };

  const tokenName = async () => {
    try {
      const name = await contract.methods.tokenName().call();
      console.log("Token name:", name);
      return name;
    } catch (error) {
      console.error("Error fetching token name:", error);
      throw error;
    }
  };

  const totalSupply = async () => {
    try {
      const totalSupply = await contract.methods.totalSupply().call();
      console.log("Total supply:", totalSupply);
      return totalSupply;
    } catch (error) {
      console.error("Error fetching total supply:", error);
      throw error;
    }
  };

  return {
    contract,
    getContract,
    mint,
    balanceOf,
    tokenName,
    totalSupply,
  };
};
