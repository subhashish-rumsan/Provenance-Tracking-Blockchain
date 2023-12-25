import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "@nomiclabs/hardhat-etherscan";
import dotenv from "dotenv";

dotenv.config();

// const INFURA_API_KEY = process.env.INFURA_PRIVATE_KEY;
// const SEPOLIA_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY as string;
const INFURA_API_KEY = "15c8394ce1a247dc94dde661a538574d";
const SEPOLIA_PRIVATE_KEY =
  "9bed18a7b4bca37a79549047af7dd10d6e4cce4ca8f7833daf34f282c4db2f4d";
const ETHSCAN_API_KEY = "MJZMBRI2JYHQ3P3KW2481GZ5IIVYMDXR59";

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
