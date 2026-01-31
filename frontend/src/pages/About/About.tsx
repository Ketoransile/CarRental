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
import { motion, useScroll, useTransform } from "framer-motion";
import { FaCheckCircle, FaStar, FaUsers, FaCar } from "react-icons/fa";
import aboutPageImage from "../../assets/aboutPageImage.jpg";
import { Faq } from "../../components/Faq";
import Testimonials from "../../components/Testimonials";
import heroCar from "../../assets/cars/heroCar.svg";
import { PerfectCarSection } from "../../components/PerfectCarSection";
import googlePlayImage from "../../assets/googleDownload.svg";
import appStoreImage from "../../assets/appstoreDownload.svg";

export const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const features = [
    { number: "20K+", text: "Happy Customers", icon: <FaUsers className="text-3xl mb-2 text-blue-500" /> },
    { number: "600+", text: "Luxury Cars", icon: <FaCar className="text-3xl mb-2 text-blue-500" /> },
    { number: "20+", text: "Years Experience", icon: <FaStar className="text-3xl mb-2 text-blue-500" /> },
  ];

  const benefits = [
    {
      title: "Diverse Selection",
      description: "From luxury sedans to rugged SUVs, find the perfect vehicle for any occasion.",
      icon: "🚗"
    },
    {
      title: "Ultimate Freedom",
      description: "Enjoy unlimited mileage options and flexible rental periods tailored to you.",
      icon: "🗽"
    },
    {
      title: "24/7 Support",
      description: "Our dedicated team is anytime, anywhere to ensure a smooth journey.",
      icon: "🎧"
    },
    {
      title: "Seamless Mobility",
      description: "Easy booking, keyless entry options, and concierge delivery to your door.",
      icon: "📱"
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white overflow-hidden">

      {/* --- Intro / Hero Section --- */}
      <section className="relative w-full py-20 lg:py-32 flex flex-col items-center justify-center text-center px-4">
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-blue-50/50 to-white -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
            Driving the <span className="text-blue-600">Future</span> of Mobility
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're not just a car rental company. We're your partner in every journey, ensuring comfort, style, and reliability at every turn.
          </p>
        </motion.div>
      </section>

      {/* --- Stats Counter --- */}
      <section className="w-full max-w-7xl px-6 mb-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 rounded-3xl bg-gray-900 text-white shadow-2xl relative overflow-hidden"
        >
          {/* subtle background decoration */}
          <div className="absolute top-0 right-0 p-20 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 p-20 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10" />

          {features.map((feature, idx) => (
            <motion.div key={idx} variants={item} className="flex flex-col items-center justify-center text-center z-10">
              <div className="bg-white/10 p-4 rounded-full mb-4 backdrop-blur-sm">
                {feature.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">{feature.number}</h3>
              <p className="text-gray-300 font-medium">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- Image & Content Section --- */}
      <section className="w-full max-w-7xl px-6 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            style={{ y }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-3 opacity-10 scale-105" />
            <Image
              src={aboutPageImage}
              alt="About Drivezy"
              className="rounded-2xl shadow-2xl z-10 relative object-cover h-[500px] w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Create Lasting <br />
              <span className="text-blue-600">Roadtrip Memories</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Experience the open road like never before. From weekend getaways to cross-country adventures, our fleet is maintained to perfection to ensure your safety and enjoyment.
            </p>

            <div className="space-y-4">
              {[
                "Premium fleet of modern vehicles",
                "Concierge-level customer service",
                "Transparent pricing with no hidden fees",
                "Comprehensive insurance options"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-600 flex-shrink-0" size={20} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Values Grid --- */}
      <section className="w-full bg-gray-50 py-24 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Drivezy?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We strive for excellence in every interaction. Here is what sets us apart from the competition.</p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group"
              >
                <div className="text-4xl mb-6 bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- App Download --- */}
      <PerfectCarSection
        imageUrl={heroCar}
        appStoreImage={appStoreImage}
        googlePlayImage={googlePlayImage}
      />

      {/* --- Social Proof & FAQ --- */}
      <div className="w-full mt-20">
        <Testimonials />
        <div className="mt-20 mb-20">
          <Faq />
        </div>
      </div>

    </div>
  );
};
