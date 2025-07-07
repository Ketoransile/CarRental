// import { Image } from "@heroui/react";
// import { FaCheckCircle } from "react-icons/fa";
// import aboutPageImage from "../../assets/aboutPageImage.jpg";
// import { Faq } from "../../components/Faq";
// import Testimonials from "../../components/Testimonials";
// import heroCar from "../../assets/cars/heroCar.svg";
// import { PerfectCarSection } from "../../components/PerfectCarSection";
// import googlePlayImage from "../../assets/googleDownload.svg";
// import appStoreImage from "../../assets/appstoreDownload.svg";
// export const About = () => {
//   const features = [
//     {
//       number: "20K",
//       text: "Happy Customers",
//     },
//     {
//       number: "600",
//       text: "Count of Cars",
//     },
//     {
//       number: "20",
//       text: "Years of Experience",
//     },
//   ];
//   return (
//     <div className="w-full min-h-screen flex flex-col gap-10 items-center pt-10 ">
//       <PerfectCarSection imageUrl={heroCar} appStoreImage googlePlayImage="" />
//       <h1 className="text-4xl font-bold text-center pb-20">About US</h1>
//       <div className="flex items-start justify-between">
//         <p className="text-3xl font-bold">
//           Enjoy an Unforgettable Driving Experience
//         </p>
//         <div className="grid grid-cols-2 gap-y-4 gap-x-10">
//           <div className="flex flex-col gap-2">
//             <h1 className="font-bold text-xl">Diverse Selection of Brands</h1>
//             <p className="text-base text-neutral-500">
//               A wide range of brands to choose from, offering stylish and
//               dynamic options tailored to your needs.
//             </p>
//           </div>
//           <div className="flex flex-col gap-2">
//             <h1 className="font-bold text-xl">Ultimate Freedom</h1>
//             <p className="text-base text-neutral-500">
//               Move with confidence—our solutions are designed to give you full
//               control and flexibility on the road.
//             </p>
//           </div>
//           <div className="flex flex-col gap-2">
//             <h1 className="font-bold text-xl">Reliable Support</h1>
//             <p className="text-base text-neutral-500">
//               Count on dependable customer service and expert guidance whenever
//               you need help.
//             </p>
//           </div>
//           <div className="flex flex-col gap-2">
//             <h1 className="font-bold text-xl">Convenient Mobility</h1>
//             <p className="text-base text-neutral-500">
//               Seamless, on-the-go experiences that adapt to your lifestyle and
//               travel demands.
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/2 flex items-center justify-between pt-10">
//         {features.map((feature) => (
//           <div className="flex items-center flex-col gap-2" key={feature.text}>
//             <h1 className="text-6xl text-blue-600 font-bold">
//               {feature.number}+
//             </h1>
//             <h1 className="text-black font-bold text-center">{feature.text}</h1>
//           </div>
//         ))}
//       </div>{" "}
//       <div className="w-full flex  items-center justify-between pt-10">
//         <div className="w-1/2 flex flex-col gap-2">
//           <h1 className="text-3xl font-bold">
//             Create Lasting Roadtrip Memories
//           </h1>
//           <p className="text-sm">
//             Enjoy every moment with smooth and stylish travel experiences.
//             Thoughtfully crafted for comfort, freedom, and joy.
//           </p>{" "}
//           <div className="grid grid-cols-2 gap-10">
//             <div className="flex  gap-2">
//               <FaCheckCircle size={20} className="text-blue-600" />
//               <p className="text-sm">
//                 Drive with confidence on any route—comfort and reliability in
//                 every journey.
//               </p>
//             </div>
//             <div className="flex  gap-2">
//               <FaCheckCircle size={20} className="text-blue-600" />
//               <p className="text-sm">
//                 Stay comfortable on long drives with thoughtful design and
//                 support.
//               </p>
//             </div>
//             <div className="flex  gap-2">
//               <FaCheckCircle size={20} className="text-blue-600" />
//               <p className="text-sm">
//                 Features that make driving more enjoyable and stress-free.
//               </p>
//             </div>
//             <div className="flex  gap-2">
//               <FaCheckCircle size={20} className="text-blue-600" />
//               <p className="text-sm">
//                 Built to turn ordinary drives into extraordinary experiences.
//               </p>
//             </div>
//           </div>
//         </div>
//         <Image src={aboutPageImage} alt="aboutPageImage" width={600} />
//       </div>
//       <Testimonials />
//       <Faq />
//     </div>
//   );
// };
import { Image } from "@heroui/react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import aboutPageImage from "../../assets/aboutPageImage.jpg";
import { Faq } from "../../components/Faq";
import Testimonials from "../../components/Testimonials";
import heroCar from "../../assets/cars/heroCar.svg";
import { PerfectCarSection } from "../../components/PerfectCarSection";
import googlePlayImage from "../../assets/googleDownload.svg";
import appStoreImage from "../../assets/appstoreDownload.svg";

export const About = () => {
  const features = [
    { number: "20K", text: "Happy Customers" },
    { number: "600", text: "Count of Cars" },
    { number: "20", text: "Years of Experience" },
  ];

  const benefits = [
    {
      title: "Diverse Selection of Brands",
      description:
        "A wide range of brands to choose from, offering stylish and dynamic options tailored to your needs.",
    },
    {
      title: "Ultimate Freedom",
      description:
        "Move with confidence—our solutions are designed to give you full control and flexibility on the road.",
    },
    {
      title: "Reliable Support",
      description:
        "Count on dependable customer service and expert guidance whenever you need help.",
    },
    {
      title: "Convenient Mobility",
      description:
        "Seamless, on-the-go experiences that adapt to your lifestyle and travel demands.",
    },
  ];

  const checkpoints = [
    "Drive with confidence on any route—comfort and reliability in every journey.",
    "Stay comfortable on long drives with thoughtful design and support.",
    "Features that make driving more enjoyable and stress-free.",
    "Built to turn ordinary drives into extraordinary experiences.",
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10">
      {/* Hero Section */}
      <PerfectCarSection
        imageUrl={heroCar}
        appStoreImage={appStoreImage}
        googlePlayImage={googlePlayImage}
        // className="mb-20"
      />

      {/* About Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-7xl px-6 mb-20 text-center pt-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
          About Us
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're revolutionizing car rentals with premium service, cutting-edge
          technology, and unforgettable experiences.
        </p>
      </motion.div>

      {/* Benefits Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full max-w-7xl px-6 mb-28 grid md:grid-cols-2 gap-12"
      >
        <motion.div variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Enjoy an Unforgettable{" "}
            <span className="text-blue-600">Driving Experience</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full bg-gray-50 py-16 mb-28"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="text-center p-6"
            >
              <h3 className="text-5xl md:text-6xl font-bold text-blue-600 mb-3">
                {feature.number}
              </h3>
              <p className="text-xl font-medium text-gray-800">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Roadtrip Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full max-w-7xl px-6 mb-28 grid md:grid-cols-2 gap-12 items-center"
      >
        <motion.div variants={fadeIn} className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Create Lasting{" "}
            <span className="text-blue-600">Roadtrip Memories</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Enjoy every moment with smooth and stylish travel experiences.
            Thoughtfully crafted for comfort, freedom, and joy.
          </p>
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {checkpoints.map((point, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex items-start gap-3"
              >
                <FaCheckCircle
                  className="text-blue-500 mt-1 flex-shrink-0"
                  size={20}
                />
                <p className="text-gray-700">{point}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Image
            src={aboutPageImage}
            alt="Happy customers on a roadtrip"
            width={600}
            className="rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          />
        </motion.div>
      </motion.section>

      {/* Testimonials & FAQ */}
      <div className="w-full">
        <Testimonials />
        <Faq />
      </div>
    </div>
  );
};
