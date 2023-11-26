import Accordion from "./Accordion";
import { CarDetailsProps } from "@types";
import { useState } from "react";

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
  const [showItem, setShowItem] = useState(0);

  const mappedCarDetails = Object.entries(car).map(([key, value]) => (
    <div
      className="flex justify-between gap-5 w-full text-right py-2"
      key={key}
    >
      <h4 className="text-grey capitalize">{key.split("_").join(" ")}</h4>
      <p className="text-black-100 font-semibold">{value}</p>
    </div>
  ));

  const fakeTokenDummyData = tokenFakeData.map((data) => (
    <div
      className="flex justify-between gap-5 w-full text-right py-2"
      key={data.id}
    >
      <h4 className="text-grey capitalize">{data.title}</h4>
      <p className="text-black-100 font-semibold">{data.data}</p>
    </div>
  ));

  console.log(mappedCarDetails);
  return (
    <>
      <Accordion
        accordionTitle="Car Information"
        accordionBody={dummyDesc}
        defaultOpen={true}
      />
      <Accordion
        accordionTitle="Car Details"
        accordionBody={mappedCarDetails}
        defaultOpen={false}
      />
      <Accordion
        accordionTitle="Token Details"
        accordionBody={fakeTokenDummyData}
        defaultOpen={false}
      />
    </>
  );
};

export default CarAccordion;
