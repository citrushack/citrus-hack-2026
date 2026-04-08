import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QUESTIONS } from "@/data/faq";
import yellowTape from "@/public/faq/yellowTape.svg";
import doubleTape from "@/public/faq/doubleTape.svg";
import FAQTitle from "@/public/faq/FAQTitle.svg";

const FAQ = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative mt-12 flex w-full items-center justify-center md:mt-16 lg:mt-24">
        <Image
          src={doubleTape}
          alt="Tape graphic"
          className="w-full object-cover"
        />
        <Image
          src={FAQTitle}
          alt="FAQ"
          className="absolute w-[30vw] md:w-[15vw]"
        />
      </div>

      <div className="z-10 my-10 w-11/12 rounded-2xl border-2 border-white bg-citrushack-brown p-4 text-white shadow-md shadow-white sm:w-10/12 md:my-16 md:w-8/12 md:p-8 xl:w-6/12">
        <Accordion type="single" collapsible className="w-full">
          {QUESTIONS.map(({ question, answer }, index) => (
            <AccordionItem
              value={question}
              key={index}
              className="border-b border-white last:border-none"
            >
              <AccordionTrigger className="text-left 2xl:text-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-left 2xl:text-lg">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="w-full">
        <Image
          src={yellowTape}
          alt="Yellow Tape"
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  );
};

export default FAQ;
