import { Request, Response } from "express";
import { connectDB } from "../config/db";
import { Car } from "../models/car";

export const createCar = async (req: Request, res: Response) => {
  try {
    // await connectDB();

    const carDetailsFromRequest = req.body;
    const {
      make,
      model,
      year,
      type,
      transmission,
      seats,
      doors,
      pricePerDay,
      available,
      mileage,
      fuelType,
      ac,
      image,
      features,
      description,
    } = req.body;
    console.log("Car data received from frontend are", carDetailsFromRequest);
    const newCar = new Car({
      make,
      model,
      year,
      type,
      transmission,
      seats,
      doors,
      pricePerDay,
      available,
      mileage,
      fuelType,
      ac,
      image,
      features,
      description,
    });
    const car = await newCar.save();

    res.status(201).json({
      success: true,
      message: "Car Successfully created",
      data: car,
    });
    return;
  } catch (error) {
    console.error("INternal error while creating a new car");
    res.status(500).json({
      success: false,
      message: "Internal server error while creating a car",
      data: null,
    });
    return;
  }
};
export const getSingleCar = async (req: Request, res: Response) => {
  try {
    // await connectDB();

    const { id } = req.params;
    const car = await Car.findOne({ _id: id });
    if (!car) {
      res.status(404).json({
        success: false,
        message: "Car with that id was not found",
        data: null,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Car was succesfully found",
      data: car,
    });
    return;
  } catch (error) {
    console.log("Error happened while getting a single car info");
    res.status(500).json({
      sucecss: false,
      message: "internal server error while getting car info",
      data: null,
    });
    return;
  }
};
export const deleteSingleCar = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      res.status(404).json({
        success: false,
        message: "CAr with that id was not found in the dataabse",
        data: null,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Car successfully deleted from the dataabse",
      data: deletedCar,
    });
    return;
  } catch (error) {
    console.error("Erorr while deleting a car", error);
    res.status(500).json({
      success: false,
      message: "Intenral server error while deleting a car",
      data: null,
    });
    return;
  }
};

export const editSingleCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log("Data to be updated are", data);
    const car = await Car.findByIdAndUpdate(id, data);
    if (!car) {
      res.status(404).json({
        success: false,
        message: "No car was found with that id",
        data: null,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Car was successfully updated",
      data: car,
    });
  } catch (error) {
    console.error("Error while editing a single car", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error while updaintg the car",
      data: null,
    });
  }
};

export const getAllCars = async (req: Request, res: Response) => {
  try {
    // await connectDB();
    // console.log("req.headers from getAllCars is", req.headers);
    // console.log("💡 Before calling Car.find()");
    const cars = await Car.find();
    // console.log("💡 After calling Car.find()");
    if (!cars || cars.length === 0) {
      res.status(404).json({
        success: false,
        message: "No car was found in the dataabse",
        data: null,
      });
      return;
    }
    // console.log("Cars from get al lcars is ", cars);
    res.status(200).json({
      success: true,
      message: "Cars were succesfully fetched",
      data: cars,
    });
    return;
  } catch (error) {
    console.error("Error whiel getting all cars", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error while getting all cars",
      data: null,
    });
    return;
  }
};
