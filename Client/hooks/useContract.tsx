import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FactoryABI, ContractAddress } from "@contract";

interface ContractState {
  provider: ethers.providers.Provider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
}

const useContract = () => {
  const [state, setState] = useState<ContractState>({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const connect = async () => {
      try {
        const { ethereum } = window as any;
        if (!ethereum) {
          throw new Error("MetaMask is not installed");
        }

        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(account[0]);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          ContractAddress,
          FactoryABI,
          signer
        );
        setState({ provider, signer, contract });
      } catch (error) {
        console.error("Error connecting to contract:", error);
      }
    };

    connect();

    // Handle accountsChanged event
    (window as any).ethereum.on("accountsChanged", connect);

    return () => {
      (window as any).ethereum.removeListener("accountsChanged", connect);
    };
  }, []);

  return {
    ...state,
  };
};
export default useContract;
