import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { AccordionPropsI } from "@types";

const Accordion = ({
  accordionTitle,
  accordionBody,
  defaultOpen,
}: AccordionPropsI) => {
  const isObject = typeof accordionBody === "object";

  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-primary-blue-100 px-4 py-4 text-left text-sm font-medium text-black-200 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
            <span>{accordionTitle}</span>
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
            {accordionBody}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Accordion;
