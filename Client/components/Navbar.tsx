"use client";
import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";
import { useContext } from "react";
import { Web3Context } from "@context/Web3context";

const NavBar = () => {
  const { account, requestAccount } = useContext(Web3Context);

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
          title="Connect your wallet"
          btnType="button"
          containerStyles="text-primary-blue rounded-full bg-white min-w-[130px] border-solid border-2"
          handleClick={requestAccount}
        />
      </nav>
    </header>
  );
};

export default NavBar;
