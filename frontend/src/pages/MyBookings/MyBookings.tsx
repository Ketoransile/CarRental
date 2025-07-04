import React, { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import { Badge } from "@heroui/badge";
import { Divider } from "@heroui/divider";
import { CarFront, MapPin, CalendarDays, Phone, X } from "lucide-react";
import { format, isAfter, isBefore } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export interface Booking {
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
//     <div className="relative max-w-6xl mx-auto p-4 md:p-8">
//       <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
//         My Bookings
//       </h1>

//       <Tabs
//         aria-label="Booking tabs"
//         selectedKey={tab}
//         onSelectionChange={(key) => setTab(key as any)}
//         radius="full"
//         variant="bordered"
//         color="primary"
//         className="mb-6 gap-2"
//       >
//         <Tab key="upcoming" title="Upcoming" />
//         <Tab key="past" title="Past" />
//         <Tab key="all" title="All" />
//       </Tabs>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filtered.length === 0 ? (
//           <p className="col-span-full text-center text-gray-500">
//             No {tab} bookings.
//           </p>
//         ) : (
//           filtered.map((b) => (
//             <motion.div
//               key={b._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//             >
//               <Card
//                 shadow="lg"
//                 className="rounded-2xl border border-default/40 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/70 hover:shadow-xl transition-all"
//               >
//                 <CardHeader className="flex justify-between pb-2">
//                   <div className="flex items-center gap-3">
//                     <CarFront className="w-6 h-6 text-blue-600" />
//                     <span className="font-semibold text-sm md:text-base">
//                       {b.pickUpLocation.toUpperCase()} →{" "}
//                       {b.dropOffLocation.toUpperCase()}
//                     </span>
//                   </div>
//                   <Badge size="sm" color={statusColor[b.status]} variant="flat">
//                     {b.status}
//                   </Badge>
//                 </CardHeader>

//                 <CardBody className="py-3 space-y-3 text-[0.85rem] md:text-sm">
//                   <div className="flex items-center gap-2">
//                     <CalendarDays className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>
//                       {format(new Date(b.pickUpDate), "MMM d, yyyy")} –{" "}
//                       {format(new Date(b.dropOffDate), "MMM d, yyyy")}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>
//                       {b.address}, {b.city}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>{b.phoneNumber}</span>
//                   </div>
//                 </CardBody>

//                 <Divider />

//                 <CardFooter className="flex justify-between items-center pt-3">
//                   <span className="font-medium text-base md:text-lg">
//                     ${b.totalPrice.toLocaleString()}
//                   </span>
//                   <Button
//                     size="sm"
//                     variant="light"
//                     color="primary"
//                     onClick={() => setSelected(b)}
//                   >
//                     See Details
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
//             className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="bg-white dark:bg-neutral-900 rounded-xl p-6 max-w-md w-full shadow-xl relative"
//             >
//               <button
//                 className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
//                 onClick={() => setSelected(null)}
//               >
//                 <X className="w-5 h-5" />
//               </button>
//               <h2 className="text-xl font-semibold text-blue-600 mb-4">
//                 Booking Details
//               </h2>
//               <p>
//                 <strong>Full Name:</strong> {selected.fullName}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {selected.phoneNumber}
//               </p>
//               <p>
//                 <strong>From:</strong> {selected.pickUpLocation}
//               </p>
//               <p>
//                 <strong>To:</strong> {selected.dropOffLocation}
//               </p>
//               <p>
//                 <strong>Pick-Up Date:</strong>{" "}
//                 {format(new Date(selected.pickUpDate), "PPP")}
//               </p>
//               <p>
//                 <strong>Drop-Off Date:</strong>{" "}
//                 {format(new Date(selected.dropOffDate), "PPP")}
//               </p>
//               <p>
//                 <strong>Address:</strong> {selected.address}, {selected.city}
//               </p>
//               <p>
//                 <strong>Total Price:</strong> $
//                 {selected.totalPrice.toLocaleString()}
//               </p>
//               <p>
//                 <strong>Status:</strong> {selected.status}
//               </p>
//               <p className="text-xs text-gray-500 mt-3">
//                 Created: {format(new Date(selected.createdAt), "PPPp")}
//               </p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default MyBookings;
// ... imports remain the same

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
//     <div className="relative max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-extrabold tracking-tight text-blue-700 mb-8">
//         🚗 My Bookings
//       </h1>

//       <Tabs
//         aria-label="Booking tabs"
//         selectedKey={tab}
//         onSelectionChange={(key) => setTab(key as any)}
//         radius="full"
//         variant="solid"
//         color="primary"
//         className="mb-8"
//       >
//         <Tab key="upcoming" title="Upcoming" />
//         <Tab key="past" title="Past" />
//         <Tab key="all" title="All" />
//       </Tabs>

//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//         {filtered.length === 0 ? (
//           <p className="col-span-full text-center text-gray-500 italic">
//             No {tab} bookings available.
//           </p>
//         ) : (
//           filtered.map((b) => (
//             <motion.div
//               key={b._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Card className="rounded-3xl border bg-white/70 dark:bg-neutral-800/60 backdrop-blur-lg transition hover:shadow-2xl">
//                 <CardHeader className="flex justify-between pb-3">
//                   <div className="flex items-center gap-3">
//                     <CarFront className="w-6 h-6 text-blue-600" />
//                     <span className="text-md font-semibold uppercase tracking-wide">
//                       {b.pickUpLocation} → {b.dropOffLocation}
//                     </span>
//                   </div>
//                   <Badge
//                     size="sm"
//                     color={statusColor[b.status]}
//                     variant="flat"
//                     className="uppercase text-xs"
//                   >
//                     {b.status}
//                   </Badge>
//                 </CardHeader>

//                 <CardBody className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <CalendarDays className="w-4 h-4 text-blue-500" />
//                     <span>
//                       {format(new Date(b.pickUpDate), "PPP")} –{" "}
//                       {format(new Date(b.dropOffDate), "PPP")}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-blue-500" />
//                     <span>
//                       {b.address}, {b.city}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-4 h-4 text-blue-500" />
//                     <span>{b.phoneNumber}</span>
//                   </div>
//                 </CardBody>

//                 <Divider />

//                 <CardFooter className="flex justify-between items-center pt-3">
//                   <span className="font-semibold text-lg text-blue-600">
//                     ${b.totalPrice.toLocaleString()}
//                   </span>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     color="primary"
//                     onClick={() => setSelected(b)}
//                   >
//                     Details
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))
//         )}
//       </div>

//       {/* Booking Details Modal */}
//       <AnimatePresence>
//         {selected && (
//           <motion.div
//             className="fixed inset-0 z-[99] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="relative bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-2xl max-w-md w-full"
//             >
//               <button
//                 onClick={() => setSelected(null)}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <h2 className="text-xl font-bold text-blue-600 mb-4">
//                 Booking Details
//               </h2>
//               <div className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
//                 <p>
//                   <strong>Name:</strong> {selected.fullName}
//                 </p>
//                 <p>
//                   <strong>Phone:</strong> {selected.phoneNumber}
//                 </p>
//                 <p>
//                   <strong>From:</strong> {selected.pickUpLocation}
//                 </p>
//                 <p>
//                   <strong>To:</strong> {selected.dropOffLocation}
//                 </p>
//                 <p>
//                   <strong>Pick-Up:</strong>{" "}
//                   {format(new Date(selected.pickUpDate), "PPP")}
//                 </p>
//                 <p>
//                   <strong>Drop-Off:</strong>{" "}
//                   {format(new Date(selected.dropOffDate), "PPP")}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {selected.address}, {selected.city}
//                 </p>
//                 <p>
//                   <strong>Total:</strong> $
//                   {selected.totalPrice.toLocaleString()}
//                 </p>
//                 <p>
//                   <strong>Status:</strong> {selected.status}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-2">
//                   Created: {format(new Date(selected.createdAt), "PPPp")}
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default MyBookings;
// import React, { useMemo, useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
// import { Button } from "@heroui/button";
// import { Tabs, Tab } from "@heroui/tabs";
// import { Badge } from "@heroui/badge";
// import { Divider } from "@heroui/divider";
import {
  // CarFront,
  // MapPin,
  // CalendarDays,
  // Phone,
  // X,
  ArrowRight,
  Info,
} from "lucide-react";
// import { format, isAfter, isBefore } from "date-fns";
// import { motion, AnimatePresence } from "framer-motion";

export interface Booking {
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

  return (
    <div className="relative max-w-7xl mx-auto p-4 md:p-8 font-sans">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
        My Bookings
      </h1>

      <div className="flex justify-center mb-10">
        <Tabs
          aria-label="Booking tabs"
          selectedKey={tab}
          onSelectionChange={(key) => setTab(key as any)}
          radius="full"
          variant="underlined" // Changed to underlined for a modern look
          color="primary"
          className="gap-4 md:gap-8 border-b-2 border-gray-200 dark:border-neutral-700" // Added bottom border
        >
          <Tab
            key="upcoming"
            title={
              <span className="flex items-center gap-2 font-medium text-lg px-4 py-2">
                Upcoming
                <Badge color="primary" size="sm" variant="flat">
                  {
                    bookings.filter((b) => isAfter(new Date(b.pickUpDate), now))
                      .length
                  }
                </Badge>
              </span>
            }
          />
          <Tab
            key="past"
            title={
              <span className="flex items-center gap-2 font-medium text-lg px-4 py-2">
                Past
                <Badge color="default" size="sm" variant="flat">
                  {
                    bookings.filter((b) =>
                      isBefore(new Date(b.dropOffDate), now)
                    ).length
                  }
                </Badge>
              </span>
            }
          />
          <Tab
            key="all"
            title={
              <span className="flex items-center gap-2 font-medium text-lg px-4 py-2">
                All
                <Badge color="secondary" size="sm" variant="flat">
                  {bookings.length}
                </Badge>
              </span>
            }
          />
        </Tabs>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-full text-center py-10 bg-gray-100 dark:bg-neutral-800 rounded-xl shadow-inner flex flex-col items-center justify-center"
          >
            <Info className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
              No {tab} bookings found.
            </p>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              Looks like you haven't made any {tab} bookings yet.
            </p>
          </motion.div>
        ) : (
          filtered.map((b) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              }} // Hover effect
              className="transform-gpu" // Important for smooth transforms
            >
              <Card
                shadow="md" // Increased shadow
                className="rounded-3xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/90 overflow-hidden group hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300"
              >
                <CardHeader className="flex justify-between items-start p-6 pb-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <CarFront className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                      <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-white">
                        {b.pickUpLocation.toUpperCase()}
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-white">
                        {b.dropOffLocation.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Booking ID:{" "}
                      <span className="font-mono text-gray-600 dark:text-gray-300">
                        {b._id.slice(0, 8)}...
                      </span>
                    </p>
                  </div>
                  <Badge
                    size="md"
                    color={statusColor[b.status]}
                    variant="solid" // Changed to solid for more emphasis
                    className="capitalize px-3 py-1 text-sm font-semibold rounded-full"
                  >
                    {b.status}
                  </Badge>
                </CardHeader>

                <CardBody className="px-6 py-4 space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>
                      <span className="font-semibold">Dates:</span>{" "}
                      {format(new Date(b.pickUpDate), "MMM d, yyyy")} –{" "}
                      {format(new Date(b.dropOffDate), "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>
                      <span className="font-semibold">Location:</span>{" "}
                      {b.address}, {b.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>
                      <span className="font-semibold">Contact:</span>{" "}
                      {b.phoneNumber}
                    </span>
                  </div>
                </CardBody>

                <Divider className="my-2 bg-gray-200 dark:bg-neutral-700" />

                <CardFooter className="flex justify-between items-center p-6 pt-4">
                  <span className="font-extrabold text-xl md:text-2xl text-green-600 dark:text-green-400">
                    ${b.totalPrice.toLocaleString()}
                  </span>
                  <Button
                    size="md"
                    variant="shadow" // Changed to shadow for a more premium feel
                    color="primary"
                    onClick={() => setSelected(b)}
                    className="px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white dark:bg-neutral-900 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative border border-gray-200 dark:border-neutral-700"
            >
              <button
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                onClick={() => setSelected(null)}
                aria-label="Close details"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6 border-b pb-3 border-gray-200 dark:border-neutral-700">
                Booking Details
              </h2>
              <div className="space-y-4 text-gray-800 dark:text-gray-200 text-lg">
                <p>
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    Full Name:
                  </strong>{" "}
                  {selected.fullName}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    Phone:
                  </strong>{" "}
                  {selected.phoneNumber}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    Pick-Up Location:
                  </strong>{" "}
                  {selected.pickUpLocation}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    Drop-Off Location:
                  </strong>{" "}
                  {selected.dropOffLocation}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    Pick-Up Date:
                  </strong>{" "}
                  {format(new Date(selected.pickUpDate), "PPPP")}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    Drop-Off Date:
                  </strong>{" "}
                  {format(new Date(selected.dropOffDate), "PPPP")}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    Address:
                  </strong>{" "}
                  {selected.address}, {selected.city}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    Total Price:
                  </strong>{" "}
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    ${selected.totalPrice.toLocaleString()}
                  </span>
                </p>
                <p>
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    Status:
                  </strong>{" "}
                  <Badge
                    size="lg"
                    color={statusColor[selected.status]}
                    variant="flat"
                    className="capitalize font-semibold"
                  >
                    {selected.status}
                  </Badge>
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 pt-4 border-t border-gray-100 dark:border-neutral-800">
                Booking Created: {format(new Date(selected.createdAt), "PPPp")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookings;
