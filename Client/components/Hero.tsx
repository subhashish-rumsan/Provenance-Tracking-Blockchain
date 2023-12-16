"use client";

import Image from "next/image";

import { CustomButton } from "@components";
import { useModal } from "@context/ModalContext";
import CarSellModal from "./CarSellModal";

const Hero = () => {
  const { openModal } = useModal();
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="hero__title">
            Find, book, own a car—quick and super easy!
          </h1>

          <p className="hero__subtitle">
            Empowering Community, Driving Together Token Drive - Your Share in
            Every Journey
          </p>
          <div className="flex items-center gap-3">
            <CustomButton
              title="Explore Cars"
              containerStyles="bg-primary-blue text-white rounded-full mt-10 cursor-pointer"
              handleClick={handleScroll}
            />
            <CustomButton
              title="Sell Your Cars"
              handleClick={openModal}
              containerStyles="text-primary-blue rounded-full bg-white mt-10 min-w-[130px] border-solid border-2 cursor-pointer"
            />
          </div>
        </div>
        <div className="hero__image-container">
          <div className="hero__image">
            <Image src="/hero.png" alt="hero" fill className="object-contain" />
          </div>

          <div className="hero__image-overlay" />
        </div>
      </div>
      <CarSellModal />
    </>
  );
};

export default Hero;
