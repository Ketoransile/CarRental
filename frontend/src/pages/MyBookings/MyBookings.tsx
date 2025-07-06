// import React, { useMemo, useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
// import { Button } from "@heroui/button";
// import { Tabs, Tab } from "@heroui/tabs";
// import { Badge } from "@heroui/badge";
// import { Divider } from "@heroui/divider";
// import { CarFront, MapPin, CalendarDays, Phone, X } from "lucide-react";
// import { format, isAfter, isBefore } from "date-fns";
// import { motion, AnimatePresence } from "framer-motion";

// export interface Booking {
//   _id: string;
//   userId: string;
//   vehicleId: string;
//   fullName: string;
//   phoneNumber: string;
//   pickUpDate: string;
//   dropOffDate: string;
//   pickUpLocation: string;
//   dropOffLocation: string;
//   address: string;
//   city: string;
//   status: "pending" | "confirmed" | "canceled";
//   totalPrice: number;
//   createdAt: string;
//   updatedAt: string;
// }

// import {
//   // CarFront,
//   // MapPin,
//   // CalendarDays,
//   // Phone,
//   // X,
//   ArrowRight,
//   Info,
// } from "lucide-react";
// // import { format, isAfter, isBefore } from "date-fns";
// // import { motion, AnimatePresence } from "framer-motion";

// export interface Booking {
//   _id: string;
//   userId: string;
//   vehicleId: string;
//   fullName: string;
//   phoneNumber: string;
//   pickUpDate: string;
//   dropOffDate: string;
//   pickUpLocation: string;
//   dropOffLocation: string;
//   address: string;
//   city: string;
//   status: "pending" | "confirmed" | "canceled";
//   totalPrice: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export const MyBookings: React.FC = () => {
//   const loaderBookings = useLoaderData() as Booking[] | undefined;
//   const bookings = loaderBookings ?? [];
//   const [tab, setTab] = useState<"upcoming" | "past" | "all">("upcoming");
//   const [selected, setSelected] = useState<Booking | null>(null);

//   const now = new Date();

//   const filtered = useMemo(() => {
//     if (tab === "all") return bookings;
//     if (tab === "upcoming") {
//       return bookings.filter((b) => isAfter(new Date(b.pickUpDate), now));
//     }
//     return bookings.filter((b) => isBefore(new Date(b.dropOffDate), now));
//   }, [bookings, tab, now]);

//   const statusColor = {
//     pending: "warning",
//     confirmed: "success",
//     canceled: "danger",
//   } as const;

//   return (
//     <div className="relative max-w-7xl mx-auto p-4 md:p-8 font-sans">
//       <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
//         My Bookings
//       </h1>

//       <div className="flex justify-center mb-10">
//         <Tabs
//           aria-label="Booking tabs"
//           selectedKey={tab}
//           onSelectionChange={(key) => setTab(key as any)}
//           radius="full"
//           variant="underlined" // Changed to underlined for a modern look
//           color="primary"
//           className="gap-4 md:gap-8 border-b-2 border-gray-200 dark:border-neutral-700" // Added bottom border
//         >
//           <Tab
//             key="upcoming"
//             title={
//               <span className="flex items-center gap-2 font-medium text-lg px-4 py-2">
//                 Upcoming
//                 <Badge color="primary" size="sm" variant="flat">
//                   {
//                     bookings.filter((b) => isAfter(new Date(b.pickUpDate), now))
//                       .length
//                   }
//                 </Badge>
//               </span>
//             }
//           />
//           <Tab
//             key="past"
//             title={
//               <span className="flex items-center gap-2 font-medium text-lg px-4 py-2">
//                 Past
//                 <Badge color="default" size="sm" variant="flat">
//                   {
//                     bookings.filter((b) =>
//                       isBefore(new Date(b.dropOffDate), now)
//                     ).length
//                   }
//                 </Badge>
//               </span>
//             }
//           />
//           <Tab
//             key="all"
//             title={
//               <span className="flex items-center gap-2 font-medium text-lg px-4 py-2">
//                 All
//                 <Badge color="secondary" size="sm" variant="flat">
//                   {bookings.length}
//                 </Badge>
//               </span>
//             }
//           />
//         </Tabs>
//       </div>

//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//         {filtered.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="col-span-full text-center py-10 bg-gray-100 dark:bg-neutral-800 rounded-xl shadow-inner flex flex-col items-center justify-center"
//           >
//             <Info className="w-12 h-12 text-gray-400 mb-4" />
//             <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
//               No {tab} bookings found.
//             </p>
//             <p className="text-gray-500 dark:text-gray-500 mt-2">
//               Looks like you haven't made any {tab} bookings yet.
//             </p>
//           </motion.div>
//         ) : (
//           filtered.map((b) => (
//             <motion.div
//               key={b._id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               whileHover={{
//                 scale: 1.02,
//                 boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
//               }} // Hover effect
//               className="transform-gpu" // Important for smooth transforms
//             >
//               <Card
//                 shadow="md" // Increased shadow
//                 className="rounded-3xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/90 overflow-hidden group hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300"
//               >
//                 <CardHeader className="flex justify-between items-start p-6 pb-4">
//                   <div className="flex flex-col">
//                     <div className="flex items-center gap-3 mb-2">
//                       <CarFront className="w-7 h-7 text-blue-600 dark:text-blue-400" />
//                       <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-white">
//                         {b.pickUpLocation.toUpperCase()}
//                       </span>
//                       <ArrowRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//                       <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-white">
//                         {b.dropOffLocation.toUpperCase()}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Booking ID:{" "}
//                       <span className="font-mono text-gray-600 dark:text-gray-300">
//                         {b._id.slice(0, 8)}...
//                       </span>
//                     </p>
//                   </div>
//                   <Badge
//                     size="md"
//                     color={statusColor[b.status]}
//                     variant="solid" // Changed to solid for more emphasis
//                     className="capitalize px-3 py-1 text-sm font-semibold rounded-full"
//                   >
//                     {b.status}
//                   </Badge>
//                 </CardHeader>

//                 <CardBody className="px-6 py-4 space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
//                   <div className="flex items-center gap-3">
//                     <CalendarDays className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
//                     <span>
//                       <span className="font-semibold">Dates:</span>{" "}
//                       {format(new Date(b.pickUpDate), "MMM d, yyyy")} –{" "}
//                       {format(new Date(b.dropOffDate), "MMM d, yyyy")}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
//                     <span>
//                       <span className="font-semibold">Location:</span>{" "}
//                       {b.address}, {b.city}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
//                     <span>
//                       <span className="font-semibold">Contact:</span>{" "}
//                       {b.phoneNumber}
//                     </span>
//                   </div>
//                 </CardBody>

//                 <Divider className="my-2 bg-gray-200 dark:bg-neutral-700" />

//                 <CardFooter className="flex justify-between items-center p-6 pt-4">
//                   <span className="font-extrabold text-xl md:text-2xl text-green-600 dark:text-green-400">
//                     ${b.totalPrice.toLocaleString()}
//                   </span>
//                   <Button
//                     size="md"
//                     variant="shadow" // Changed to shadow for a more premium feel
//                     color="primary"
//                     onClick={() => setSelected(b)}
//                     className="px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
//                   >
//                     View Details
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))
//         )}
//       </div>

//       <AnimatePresence>
//         {selected && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.85, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.85, opacity: 0 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               className="bg-white dark:bg-neutral-900 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative border border-gray-200 dark:border-neutral-700"
//             >
//               <button
//                 className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
//                 onClick={() => setSelected(null)}
//                 aria-label="Close details"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//               <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6 border-b pb-3 border-gray-200 dark:border-neutral-700">
//                 Booking Details
//               </h2>
//               <div className="space-y-4 text-gray-800 dark:text-gray-200 text-lg">
//                 <p>
//                   <strong className="font-semibold text-gray-900 dark:text-white">
//                     Full Name:
//                   </strong>{" "}
//                   {selected.fullName}
//                 </p>
//                 <p>
//                   <strong className="font-semibold text-gray-900 dark:text-white">
//                     Phone:
//                   </strong>{" "}
//                   {selected.phoneNumber}
//                 </p>
//                 <p>
//                   <strong className="font-semibold text-gray-900 dark:text-white">
//                     Pick-Up Location:
//                   </strong>{" "}
//                   {selected.pickUpLocation}
//                 </p>
//                 <p>
//                   <strong className="font-semibold text-gray-900 dark:text-white">
//                     Drop-Off Location:
//                   </strong>{" "}
//                   {selected.dropOffLocation}
//                 </p>
//                 <p>
//                   <strong className="font-semibold text-gray-900 dark:text-white">
//                     Pick-Up Date:
//                   </strong>{" "}
//                   {format(new Date(selected.pickUpDate), "PPPP")}
//                 </p>
//                 <p>
//                   <strong className="font-semibold text-gray-900 dark:text-white">
//                     Drop-Off Date:
//                   </strong>{" "}
//                   {format(new Date(selected.dropOffDate), "PPPP")}
//                 </p>
//                 <p>
//                   <strong className="font-semibold text-gray-900 dark:text-white">
//                     Address:
//                   </strong>{" "}
//                   {selected.address}, {selected.city}
//                 </p>
//                 <p>
//                   <strong className="font-semibold text-gray-900 dark:text-white">
//                     Total Price:
//                   </strong>{" "}
//                   <span className="text-green-600 dark:text-green-400 font-bold">
//                     ${selected.totalPrice.toLocaleString()}
//                   </span>
//                 </p>
//                 <p>
//                   <strong className="font-semibold text-gray-900 dark:text-white">
//                     Status:
//                   </strong>{" "}
//                   <Badge
//                     size="lg"
//                     color={statusColor[selected.status]}
//                     variant="flat"
//                     className="capitalize font-semibold"
//                   >
//                     {selected.status}
//                   </Badge>
//                 </p>
//               </div>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 pt-4 border-t border-gray-100 dark:border-neutral-800">
//                 Booking Created: {format(new Date(selected.createdAt), "PPPp")}
//               </p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default MyBookings;
import React, { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import { Badge } from "@heroui/badge";
import { Divider } from "@heroui/divider";
import {
  CarFront,
  MapPin,
  CalendarDays,
  // Phone,
  X,
  ArrowRight,
  Info,
} from "lucide-react";
import { format, isAfter, isBefore } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface Booking {
  _id: string;
  userId: string;
  vehicleId: string;
  fullName: string;
  phoneNumber: string;
  pickUpDate: string;
  dropOffDate: string;
  pickUpLocation: string;
  dropOffLocation: string;
  address: string;
  city: string;
  status: "pending" | "confirmed" | "canceled";
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export const MyBookings: React.FC = () => {
  const loaderBookings = useLoaderData() as Booking[] | undefined;
  const bookings = loaderBookings ?? [];
  const [tab, setTab] = useState<"upcoming" | "past" | "all">("upcoming");
  const [selected, setSelected] = useState<Booking | null>(null);

  const now = new Date();

  const filtered = useMemo(() => {
    if (tab === "all") return bookings;
    if (tab === "upcoming") {
      return bookings.filter((b) => isAfter(new Date(b.pickUpDate), now));
    }
    return bookings.filter((b) => isBefore(new Date(b.dropOffDate), now));
  }, [bookings, tab, now]);

  const statusColor = {
    pending: "warning",
    confirmed: "success",
    canceled: "danger",
  } as const;

  // Responsive breakpoints
  const isMobile = window.innerWidth < 768;
  // const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 lg:mb-12 text-center"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
          My Bookings
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Manage your upcoming trips and review past rental history
        </p>
      </motion.div>

      {/* Filter Tabs - Responsive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 sm:mb-8 lg:mb-12 overflow-x-auto"
      >
        <div className="flex justify-center min-w-max">
          <Tabs
            aria-label="Booking tabs"
            selectedKey={tab}
            onSelectionChange={(key) => setTab(key as any)}
            radius="full"
            variant={isMobile ? "light" : "solid"}
            color="primary"
            className={`${
              isMobile ? "w-full" : ""
            } bg-gray-100 dark:bg-neutral-800 p-1 rounded-full`}
            size={isMobile ? "sm" : "md"}
          >
            <Tab
              key="upcoming"
              title={
                <div className="flex items-center gap-2 px-4 sm:px-6 py-1 sm:py-2">
                  <span className="whitespace-nowrap">Upcoming</span>
                  <Badge color="primary" size="sm" variant="solid">
                    {
                      bookings.filter((b) =>
                        isAfter(new Date(b.pickUpDate), now)
                      ).length
                    }
                  </Badge>
                </div>
              }
            />
            <Tab
              key="past"
              title={
                <div className="flex items-center gap-2 px-4 sm:px-6 py-1 sm:py-2">
                  <span className="whitespace-nowrap">Past</span>
                  <Badge color="default" size="sm" variant="solid">
                    {
                      bookings.filter((b) =>
                        isBefore(new Date(b.dropOffDate), now)
                      ).length
                    }
                  </Badge>
                </div>
              }
            />
            <Tab
              key="all"
              title={
                <div className="flex items-center gap-2 px-4 sm:px-6 py-1 sm:py-2">
                  <span className="whitespace-nowrap">All</span>
                  <Badge color="secondary" size="sm" variant="solid">
                    {bookings.length}
                  </Badge>
                </div>
              }
            />
          </Tabs>
        </div>
      </motion.div>

      {/* Bookings Grid - Responsive */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 rounded-xl flex flex-col items-center justify-center"
        >
          <Info className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
            No {tab} bookings found
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md text-center px-4">
            {tab === "upcoming"
              ? "You don't have any upcoming bookings. Start planning your next trip!"
              : "Your past bookings will appear here once you complete a rental."}
          </p>
          <Button
            color="primary"
            className="mt-6 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base"
            onClick={() => (window.location.href = "/search")}
          >
            Browse Available Cars
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {/* {filtered.map((b) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: isMobile ? 1 : 1.02 }}
              className="w-full"
            >
              <Card className="h-full flex flex-col border border-gray-200 dark:border-neutral-700 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300">
                <CardHeader className="relative p-4 sm:p-6 pb-2 sm:pb-4">
                  <Badge
                    size={isMobile ? "sm" : "md"}
                    color={statusColor[b.status]}
                    variant="solid"
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 capitalize"
                  >
                    {b.status}
                  </Badge>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <CarFront className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white truncate">
                        {b.pickUpLocation} → {b.dropOffLocation}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        Booking ID: {b._id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardBody className="px-4 sm:px-6 py-2 sm:py-4 flex-grow">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                          Rental Period
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                          {format(new Date(b.pickUpDate), "MMM d")} -{" "}
                          {format(new Date(b.dropOffDate), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                          Pickup Location
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                          {b.address}, {b.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>

                <Divider className="bg-gray-200 dark:bg-neutral-700" />

                <CardFooter className="p-4 sm:p-6 pt-2 sm:pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Total
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                      ${b.totalPrice.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    color="primary"
                    variant="flat"
                    size={isMobile ? "sm" : "md"}
                    endContent={
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    }
                    className="font-medium"
                    onPress={() => setSelected(b)}
                  >
                    {isMobile ? "View" : "Details"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))} */}
          {filtered.map((b) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: isMobile ? 1 : 1.02 }}
              className="w-full"
            >
              <Card className="h-full flex flex-col border border-gray-200 dark:border-neutral-700 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300">
                {/* Card Header with Status Badge */}
                <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <CarFront className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white truncate">
                          {b.pickUpLocation} → {b.dropOffLocation}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                          Booking ID: {b._id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                    <Badge
                      size={isMobile ? "sm" : "md"}
                      className={`ml-2 capitalize text-white shadow-sm ${
                        b.status === "pending"
                          ? "bg-yellow-500"
                          : b.status === "confirmed"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >
                      {b.status}
                    </Badge>
                  </div>
                </CardHeader>

                {/* Card Body */}
                <CardBody className="px-4 sm:px-6 py-2 sm:py-4 flex-grow">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                          Rental Period
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                          {format(new Date(b.pickUpDate), "MMM d")} –{" "}
                          {format(new Date(b.dropOffDate), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                          Pickup Location
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                          {b.address}, {b.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>

                <Divider className="bg-gray-200 dark:bg-neutral-700" />

                {/* Card Footer */}
                <CardFooter className="p-4 sm:p-6 pt-2 sm:pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Total
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                      ${b.totalPrice.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    color="primary"
                    variant="flat"
                    size={isMobile ? "sm" : "md"}
                    endContent={
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    }
                    className="font-medium"
                    onPress={() => setSelected(b)}
                  >
                    {isMobile ? "View" : "Details"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Booking Details Modal - Responsive */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-neutral-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-neutral-700"
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Booking Details
                </h2>
                <button
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-1"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-5 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    Status
                  </span>
                  <Badge
                    size={isMobile ? "sm" : "md"}
                    color={statusColor[selected.status]}
                    variant="solid"
                    className="capitalize"
                  >
                    {selected.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Pickup
                    </p>
                    <p className="font-medium">{selected.pickUpLocation}</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {format(new Date(selected.pickUpDate), "MMM d, yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Dropoff
                    </p>
                    <p className="font-medium">{selected.dropOffLocation}</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {format(new Date(selected.dropOffDate), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <Divider className="my-2 bg-gray-200 dark:bg-neutral-700" />

                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Customer
                  </p>
                  <p className="font-medium">{selected.fullName}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selected.phoneNumber}
                  </p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Address
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selected.address}, {selected.city}
                  </p>
                </div>

                <Divider className="my-2 bg-gray-200 dark:bg-neutral-700" />

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Total Price
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                      ${selected.totalPrice.toLocaleString()}
                    </p>
                  </div>
                  {selected.status === "pending" && (
                    <Button
                      color="danger"
                      variant="flat"
                      size={isMobile ? "sm" : "md"}
                      className="font-medium"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookings;
