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
  logout: () => void;
  error: string | null;
}

const Web3Context = createContext<ContextValue>({
  web3: null,
  account: null,
  requestAccount: async () => {},
  logout: () => {},
  error: null,
});

const Web3Provider = ({ children }: Web3ContextProps) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userAccount") || null;
    }
    return null;
  });

  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if ((window as any).ethereum) {
          const newWeb3 = new Web3((window as any).ethereum);
          setWeb3(newWeb3);
        }
      } catch (error: any) {
        setError("Error initializing Web3: " + error.message);
      }
    };

    initWeb3();
  }, []);

  const requestAccount = async () => {
    try {
      if (web3 && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
          params: [{ force: true }],
        });

        const connectedAccount = accounts[0];
        setAccount(connectedAccount);
        localStorage.setItem("userAccount", connectedAccount);
        setError(null); // Clearing error state on successful login
      } else {
        setError("Ethereum provider not detected or web3 not available.");
      }
    } catch (error: any) {
      setError("Error logging in: " + error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("userAccount");
    setAccount(null);
    setError(null);
  };

  const contextValue: ContextValue = {
    web3,
    account,
    requestAccount,
    logout,
    error,
  };

  return (
    <Web3Context.Provider value={contextValue}>{children}</Web3Context.Provider>
  );
};

export { Web3Context, Web3Provider };
