import Web3 from "web3";

const INFURA_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`;
const web3 = new Web3(INFURA_URL);

export default web3;
