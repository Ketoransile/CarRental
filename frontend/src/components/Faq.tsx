import { Accordion, AccordionItem } from "@heroui/react";

export const Faq = () => {
  return (
    <div className="w-full mx-auto my-10 px-6 py-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
        Frequently Asked Questions
      </h2>
      <Accordion variant="shadow">
        <AccordionItem
          key="1"
          aria-label="faq-1"
          title="What do I need to rent a car?"
        >
          <p className="text-gray-700">
            You need a valid driver’s license, a government-issued ID, and a
            debit or credit card in your name.
          </p>
        </AccordionItem>

        <AccordionItem
          key="2"
          aria-label="faq-2"
          title="Can I return the car to a different location?"
        >
          <p className="text-gray-700">
            Yes, one-way rentals are available for select cities. Additional
            charges may apply.
          </p>
        </AccordionItem>

        <AccordionItem
          key="3"
          aria-label="faq-3"
          title="Do I need insurance to rent a car?"
        >
          <p className="text-gray-700">
            Basic insurance is often included, but you can purchase additional
            coverage or use your own car insurance if it covers rentals.
          </p>
        </AccordionItem>

        <AccordionItem
          key="4"
          aria-label="faq-4"
          title="What happens if I return the car late?"
        >
          <p className="text-gray-700">
            A grace period is usually allowed, but late returns may result in
            extra fees depending on the rental policy.
          </p>
        </AccordionItem>

        <AccordionItem
          key="5"
          aria-label="faq-5"
          title="Is there an age requirement to rent?"
        >
          <p className="text-gray-700">
            You must be at least 21 years old. Drivers under 25 may be subject
            to a young driver fee.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
