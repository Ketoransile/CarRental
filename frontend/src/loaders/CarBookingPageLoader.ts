import type { ICar } from "../types/car";
import { cars } from "../utils/dummyCarDetails";
import type { LoaderFunctionArgs } from "react-router-dom";

export const BookingPageLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<ICar> => {
  const carId = params.id;
  console.log("id params from loader is ", carId);
  if (!carId || isNaN(Number(carId))) {
    throw new Response("Invalid car ID provided.", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const car: ICar | undefined = cars.find(
    (car: ICar) => car.id === Number(carId)
  );

  if (!car) {
    // If car not found, return a 404 response
    throw new Response("Car not found.", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return car;
};
