import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Accordion from "./Accordion";
import { CarDetailsProps } from "@types";

const dummyDesc =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis delectus aperiam perspiciatis soluta, facere est veniam doloremque nostrum totam aliquam tempore ab excepturi illo voluptate id perferendis sequi quas quae temporibus laborum dolores atque numquam laboriosam veritatis. Nobis consequatur laboriosam voluptas vero sit possimus. Ratione officia accusamus quas harum totam";

const tokenFakeData = [
  {
    id: 1,
    title: "Total Token",
    data: "2000",
  },
  {
    id: 2,
    title: "Token Available",
    data: "1500",
  },
  {
    id: 3,
    title: "Token Per Price",
    data: "0.000013ETH",
  },
];

const CarAccordion = ({ car }: CarDetailsProps) => {
  return (
    <>
      <Accordion accordionTitle="Car Information" accordionBody={dummyDesc} />
      <Accordion accordionTitle="Car Details" accordionBody={car} />
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-primary-blue-100 px-4 py-4 text-left text-sm font-medium text-black-200 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
              <span>Token Details</span>
              <Image
                src="./upArrow.svg"
                height={20}
                width={20}
                alt="arrow"
                className={`${
                  !open ? "rotate-180 transform" : ""
                } text-purple-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pb-2 pt-1 text-sm text-gray-500">
              <div className="mt-3 flex flex-wrap gap-4">
                {tokenFakeData.map((data) => (
                  <div
                    className="flex justify-between gap-5 w-full text-right"
                    key={data.id}
                  >
                    <h4 className="text-grey capitalize">{data.title}</h4>
                    <p className="text-black-100 font-semibold">{data.data}</p>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default CarAccordion;
