import type { ICar } from "../types/car";
import { cars } from "../utils/dummyCarDetails";
import type { LoaderFunctionArgs } from "react-router-dom";

export const BookingPageLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<ICar> => {
  const carId = params.id;
  console.log("id params from loader is ", carId);
  if (!carId) {
    throw new Response("Invalid car ID provided.", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const car: ICar | undefined = cars.find((car: ICar) => car._id === carId);

  if (!car) {
    throw new Response("Car not found.", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return car;
};
