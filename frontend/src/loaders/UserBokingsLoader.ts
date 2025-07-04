import axios from "axios";
import type { IBooking } from "../types/UserBooking";
import { type LoaderFunctionArgs } from "react-router-dom";

export const UserBookingsLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<IBooking[]> => {
  const { userId } = params;

  if (!userId) {
    throw new Error("Missing userId in route parameters.");
  }

  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/booking/user/${userId}`,
      { withCredentials: true }
    );

    console.log("Result from userbooking loader function is", response);

    // Optional chaining in case data is nested
    return response.data?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch user bookings:", error);
    return [];
  }
};
