import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "@nomiclabs/hardhat-etherscan";
import dotenv from "dotenv";

dotenv.config();

const INFURA_API_KEY = process.env.INFURA_PRIVATE_KEY;
const SEPOLIA_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY as string;
const ETHSCAN_API_KEY = process.env.ETHSCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHSCAN_API_KEY,
  },
};

export default config;
