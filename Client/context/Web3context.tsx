"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import Web3 from "web3";

interface Web3ContextProps {
  children: ReactNode;
}

interface ContextValue {
  web3: Web3 | null;
  account: string | null;
  requestAccount: () => Promise<void>;
}

const Web3Context = createContext<ContextValue>({
  web3: null,
  account: null,
  requestAccount: async () => {},
});

const Web3Provider = ({ children }: Web3ContextProps) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    // Initialize web3 with provider (Infura, etc.)
    const initWeb3 = async () => {
      if ((window as any).ethereum) {
        const newWeb3 = new Web3((window as any).ethereum);
        setWeb3(newWeb3);
      }
    };

    initWeb3();
  }, []);

  const requestAccount = async () => {
    try {
      if (web3 && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        const connectedAccount = accounts[0];

        // Update account in the context
        setAccount(connectedAccount);
      } else {
        // Handle cases where the user doesn't have an Ethereum wallet or browser support
      }
    } catch (error) {
      // Handle errors during the login process
    }
  };

  const contextValue: ContextValue = {
    web3,
    account,
    requestAccount,
  };

  return (
    <Web3Context.Provider value={contextValue}>{children}</Web3Context.Provider>
  );
};

export { Web3Context, Web3Provider };
