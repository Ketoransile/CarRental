export interface IBooking {
  _id: string;
  userId: string;
  vehicleId: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  confirmationTerms: string[]; // or a more specific type if you have one
  pickUpDate: string; // ISO format date string
  dropOffDate: string;
  pickUpLocation: string;
  dropOffLocation: string;
  status: "pending" | "confirmed" | "cancelled"; // extend as needed
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
