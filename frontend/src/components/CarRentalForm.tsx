import { Button, DatePicker, Form, Image, Input } from "@heroui/react";
import type React from "react";
import { useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import paymentCardsimage from "../assets/paymentCards.png";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { ShieldCheck } from "lucide-react";
export const CarRentalForm: React.FC = () => {
  const [action, setAction] = useState(null);
  const handleSubmit = () => {
    return;
  };
  const cities = [
    { key: "nyc", label: "New York City" },
    { key: "la", label: "Los Angeles" },
    { key: "chi", label: "Chicago" },
    { key: "mia", label: "Miami" },
    { key: "sfo", label: "San Francisco" },
    { key: "lon", label: "London" },
    { key: "par", label: "Paris" },
    { key: "ber", label: "Berlin" },
    { key: "tok", label: "Tokyo" },
    { key: "syd", label: "Sydney" },
  ];
  const [selectedTerm, setSelectedTerm] = useState(["news", "terms"]);
  return (
    <Form
      className="w-full max-w-4xl flex flex-col gap-6 "
      onReset={(e) => {
        setAction("reset");
      }}
      onSubmit={handleSubmit}
    >
      <section className="w-full flex flex-col gap-8 p-4 bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl fontbold">Billing Info</h1>
            <p className="text-xs text-neutral-400">
              Please enter your billing info
            </p>
          </div>
          <h2 className="text-xs text-neutral-400">Step 1 of 4</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            isRequired
            errorMessage="Please enter a valid username"
            label="Name"
            name="name"
            placeholder="Enter you username"
            type="text"
          />
          <Input
            isRequired
            errorMessage="Please enter a valid phonenumber"
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter your phoneNumber"
            type="text"
          />
          <Input
            isRequired
            errorMessage="Please enter a valid Address"
            label="Address"
            name="address"
            placeholder="Enter your address"
            type="text"
          />
          <Input
            isRequired
            errorMessage="Please enter a valid city"
            label="Town / City"
            name="city"
            placeholder="Town or City"
            type="text"
          />
        </div>
      </section>
      <section className="w-full flex flex-col gap-8 p-4 bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl fontbold">Rental Info</h1>
            <p className="text-xs text-neutral-400">
              Please select your rental date
            </p>
          </div>
          <h2 className="text-xs text-neutral-400">Step 2 of 4</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center  ">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Pick-Up
          </div>
          <div className="w-full grid grid-cols-2  gap-4">
            <Select
              className=" rounded-md"
              label="Pick-up Location"
              placeholder="Select a city"
            >
              {cities.map((city) => (
                <SelectItem key={city.key}>{city.label}</SelectItem>
              ))}
            </Select>

            <DatePicker className="" label="Date" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center  ">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Drop-Off
          </div>
          <div className="w-full grid grid-cols-2  gap-4">
            <Select
              className=" rounded-md"
              label="Drop-off Location"
              placeholder="Select a city"
            >
              {cities.map((city) => (
                <SelectItem key={city.key}>{city.label}</SelectItem>
              ))}
            </Select>
            <DatePicker className="" label="Date" />
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col gap-8 p-4 bg-white rounded-xl">
        {" "}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl fontbold">Payment Info</h1>
            <p className="text-xs text-neutral-400">
              Please enter your payment method
            </p>
            <Image src={paymentCardsimage} width={200} className="-mx-2" />
          </div>
          <h2 className="text-xs text-neutral-400">Step 3 of 4</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            isRequired
            errorMessage="Please enter a valid first name"
            label="First Name"
            name="fisrtName"
            placeholder="Abdi"
            type="text"
          />
          <Input
            isRequired
            errorMessage="Please enter a valid Last Name"
            label="Last Name"
            name="lastName"
            placeholder="Worku"
            type="text"
          />
          <Input
            isRequired
            errorMessage="Please enter a valid card number"
            label="Card Number"
            name="cardNumber"
            placeholder="1234 **** **** ****"
            type="text"
          />
          <div className="w-full flex gap-2 items-center justify-between">
            <DatePicker className="" label="Expiry Date" />
            <Input
              isRequired
              errorMessage="Please enter a valid card number"
              label="Card Number"
              name="cardNumber"
              placeholder="1234 **** **** ****"
              type="text"
            />
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col gap-8 p-4 bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl fontbold">Confirmation</h1>
            <p className="text-xs text-neutral-400">
              We are getting to the end. Just few clicks and your rental is
              ready.
            </p>
          </div>
          <h2 className="text-xs text-neutral-400">Step 4 of 4</h2>
        </div>
        <CheckboxGroup
          defaultValue={["buenos-aires", "london"]}
          label="Select cities"
        >
          <Checkbox value="news">
            I agree with sending marekting and newsletter emails. No Spams!
            Promised
          </Checkbox>
          <Checkbox value="terms">
            I agree with our terms, conditions and policies
          </Checkbox>
        </CheckboxGroup>
        <Button className="px-20 rounded-full p-4 bg-blue-600 text-white w-fit">
          Rent Now
        </Button>
        <div className="mt-8 flex items-center p-4 bg-blue-50 rounded-lg shadow-sm">
          {/* Shield icon, color updated to brand color (blue-600) */}
          <ShieldCheck className="text-blue-600 mr-3 w-6 h-6" />
          <div>
            <h4 className="font-semibold text-gray-800">
              All your data are safe
            </h4>
            <p className="text-sm text-gray-600">
              We are using the most advanced security to provide you the best
              experience ever.
            </p>
          </div>
        </div>
      </section>
    </Form>
  );
};
