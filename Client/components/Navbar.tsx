"use client";
import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "@context/Web3context";

const NavBar = () => {
  const { account, requestAccount, logout } = useContext(Web3Context);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (account) {
      setTitle("Disconnect your wallet");
    } else {
      setTitle("Connect your wallet");
    }
  }, [account]);

  return (
    <header className="w-full  absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>

        <CustomButton
          title={title}
          btnType="button"
          containerStyles="text-primary-blue rounded-full bg-white min-w-[130px] border-solid border-2"
          handleClick={account ? logout : requestAccount}
        />
      </nav>
    </header>
  );
};

export default NavBar;
