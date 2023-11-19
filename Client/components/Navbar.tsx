"use client";
import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "@context/Web3context";
import Avatar from "react-avatar";

const NavBar = () => {
  const { account, requestAccount, logout } = useContext(Web3Context);
  const [title, setTitle] = useState<string>("");
  const [showProfile, setShowProfile] = useState<boolean>(false);

  useEffect(() => {
    if (account) {
      setTitle("Disconnect wallet");
      setShowProfile(true);
    } else {
      setTitle("Connect wallet");
      setShowProfile(false);
    }
  }, [account]);

  return (
    <header className="w-full  absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/Token-Drive-Black.png"
            alt="logo"
            width={200}
            height={0}
            className="object-cover"
          />
        </Link>

        <div className="flex justify-center items-center gap-5">
          <CustomButton
            title={title}
            btnType="button"
            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px] border-solid border-2"
            handleClick={account ? logout : requestAccount}
          />
          {showProfile && (
            <>
              <div className="py-3 px-5 flex items-center text-primary-blue rounded-full bg-white min-w-[130px] border-solid border-2  gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p>Connected</p>
              </div>
              <div className="py-3 px-5 flex items-center text-primary-blue rounded-full bg-white min-w-[130px]  gap-2">
                {account && (
                  <Avatar
                    name={account}
                    size="20"
                    round={true}
                    color="orange"
                  />
                )}
                <p>{`${account?.substring(0, 6)}....${account?.substring(
                  account.length - 4
                )}`}</p>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
