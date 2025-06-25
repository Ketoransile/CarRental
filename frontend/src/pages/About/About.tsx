import { Image } from "@heroui/react";
import { FaCheckCircle } from "react-icons/fa";
import aboutPageImage from "../../assets/aboutPageImage.jpg";
import { Faq } from "../../components/Faq";
import Testimonials from "../../components/Testimonials";
export const About = () => {
  const features = [
    {
      number: "20K",
      text: "Happy Customers",
    },
    {
      number: "600",
      text: "Count of Cars",
    },
    {
      number: "20",
      text: "Years of Experience",
    },
  ];
  return (
    <div className="w-full min-h-screen flex flex-col gap-10 items-center pt-10 ">
      <h1 className="text-4xl font-bold text-center pb-20">About US</h1>
      <div className="flex items-start justify-between">
        <p className="text-3xl font-bold">
          Enjoy an Unforgettable Driving Experience
        </p>
        <div className="grid grid-cols-2 gap-y-4 gap-x-10">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Diverse Selection of Brands</h1>
            <p className="text-base text-neutral-500">
              A wide range of brands to choose from, offering stylish and
              dynamic options tailored to your needs.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Ultimate Freedom</h1>
            <p className="text-base text-neutral-500">
              Move with confidence—our solutions are designed to give you full
              control and flexibility on the road.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Reliable Support</h1>
            <p className="text-base text-neutral-500">
              Count on dependable customer service and expert guidance whenever
              you need help.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Convenient Mobility</h1>
            <p className="text-base text-neutral-500">
              Seamless, on-the-go experiences that adapt to your lifestyle and
              travel demands.
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-between pt-10">
        {features.map((feature) => (
          <div className="flex items-center flex-col gap-2" key={feature.text}>
            <h1 className="text-6xl text-blue-600 font-bold">
              {feature.number}+
            </h1>
            <h1 className="text-black font-bold text-center">{feature.text}</h1>
          </div>
        ))}
      </div>{" "}
      <div className="w-full flex  items-center justify-between pt-10">
        <div className="w-1/2 flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            Create Lasting Roadtrip Memories
          </h1>
          <p className="text-sm">
            Enjoy every moment with smooth and stylish travel experiences.
            Thoughtfully crafted for comfort, freedom, and joy.
          </p>{" "}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex  gap-2">
              <FaCheckCircle size={20} className="text-blue-600" />
              <p className="text-sm">
                Drive with confidence on any route—comfort and reliability in
                every journey.
              </p>
            </div>
            <div className="flex  gap-2">
              <FaCheckCircle size={20} className="text-blue-600" />
              <p className="text-sm">
                Stay comfortable on long drives with thoughtful design and
                support.
              </p>
            </div>
            <div className="flex  gap-2">
              <FaCheckCircle size={20} className="text-blue-600" />
              <p className="text-sm">
                Features that make driving more enjoyable and stress-free.
              </p>
            </div>
            <div className="flex  gap-2">
              <FaCheckCircle size={20} className="text-blue-600" />
              <p className="text-sm">
                Built to turn ordinary drives into extraordinary experiences.
              </p>
            </div>
          </div>
        </div>
        <Image src={aboutPageImage} alt="aboutPageImage" width={600} />
      </div>
      <Testimonials />
      <Faq />
    </div>
  );
};
