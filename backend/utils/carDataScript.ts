import "dotenv/config";
import { connectDB } from "../config/db.js";
import { Car } from "../models/Car.js";

const cars = [
  {
    make: "Honda",
    carModel: "Civic",
    year: 2023,
    type: "Sedan",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 50,
    available: true,
    mileage: 8500,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456228/car14_umlkzu.svg",
    features: [
      "Bluetooth",
      "Backup Camera",
      "Apple CarPlay",
      "Adaptive Cruise Control",
    ],
    description:
      "A reliable and fuel-efficient sedan, perfect for city commutes and comfortable long drives.",
  },
  {
    make: "Toyota",
    carModel: "RAV4",
    year: 2024,
    type: "SUV",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 70,
    available: true,
    mileage: 4200,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456227/car2_enicag.svg",
    features: [
      "All-Wheel Drive",
      "Panoramic Sunroof",
      "Blind Spot Monitoring",
      "Keyless Entry",
    ],
    description:
      "Experience adventure and versatility with this capable SUV, ideal for family trips and diverse terrains.",
  },
  {
    make: "Ford",
    carModel: "F-150",
    year: 2023,
    type: "Pickup Truck",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 90,
    available: false,
    mileage: 15000,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456223/car3_cifaio.svg",
    features: [
      "Towing Package",
      "Navigation System",
      "Heated Seats",
      "Backup Camera",
    ],
    description:
      "Built for tough jobs and weekend adventures, this powerful pickup truck offers exceptional utility and comfort.",
  },
  {
    make: "Nissan",
    carModel: "Altima",
    year: 2022,
    type: "Sedan",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 48,
    available: true,
    mileage: 18000,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456229/car10_ripwya.svg",
    features: ["Bluetooth", "Cruise Control", "Lane Departure Warning"],
    description:
      "A practical and comfortable sedan, great for daily driving with a focus on safety features.",
  },
  {
    make: "Chevrolet",
    carModel: "Tahoe",
    year: 2024,
    type: "SUV",
    transmission: "Automatic",
    seats: 7,
    doors: 4,
    pricePerDay: 110,
    available: true,
    mileage: 3000,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456226/car5_sypira.svg",
    features: ["Third Row Seating", "DVD Player", "Parking Sensors", "Sunroof"],
    description:
      "Command the road with this spacious and luxurious SUV, perfect for large families and extended journeys.",
  },
  {
    make: "Hyundai",
    carModel: "Elantra",
    year: 2023,
    type: "Sedan",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 42,
    available: true,
    mileage: 9800,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456224/car13_yjwjew.svg",
    features: ["Android Auto", "Backup Camera", "Keyless Entry"],
    description:
      "An economical and stylish sedan, offering a smooth ride and essential tech for your daily commute.",
  },
  {
    make: "BMW",
    carModel: "3 Series",
    year: 2023,
    type: "Luxury Sedan",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 120,
    available: true,
    mileage: 6000,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456224/car13_yjwjew.svg",
    features: [
      "Leather Seats",
      "Heated Seats",
      "Navigation System",
      "Premium Audio",
    ],
    description:
      "Indulge in a premium driving experience with this sophisticated luxury sedan, combining performance and elegance.",
  },
  {
    make: "Mercedes-Benz",
    carModel: "C-Class",
    year: 2024,
    type: "Luxury Sedan",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 130,
    available: true,
    mileage: 2500,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456227/car6_h1omyq.svg",
    features: [
      "Burmester Sound System",
      "Panoramic Roof",
      "Parking Assist",
      "Wireless Charging",
    ],
    description:
      "Experience unparalleled luxury and cutting-edge technology in this exquisite Mercedes-Benz C-Class.",
  },
  {
    make: "Jeep",
    carModel: "Wrangler",
    year: 2023,
    type: "SUV",
    transmission: "Automatic",
    seats: 4,
    doors: 2,
    pricePerDay: 85,
    available: true,
    mileage: 11000,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456224/car4_rvp5ds.svg",
    features: ["4x4", "Removable Top", "Off-Road Tires"],
    description:
      "Conquer any terrain with this iconic and rugged SUV, built for adventurous spirits and off-road thrills.",
  },
  {
    make: "Tesla",
    carModel: "Model 3",
    year: 2024,
    type: "Electric Sedan",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 150,
    available: true,
    mileage: 1500,
    fuelType: "Electric",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456229/car9_qw9fki.svg",
    features: [
      "Autopilot",
      "Touchscreen Display",
      "Fast Charging",
      "Heated Seats",
    ],
    description:
      "Drive the future with this innovative electric sedan, offering impressive range and advanced autonomous features.",
  },
  {
    make: "Volkswagen",
    carModel: "Jetta",
    year: 2022,
    type: "Sedan",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 40,
    available: true,
    mileage: 22000,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456228/car8_cgcdfo.svg",
    features: ["Bluetooth", "Cruise Control"],
    description:
      "A no-frills, dependable sedan known for its comfortable ride and efficient performance.",
  },
  {
    make: "Subaru",
    carModel: "Outback",
    year: 2023,
    type: "Wagon",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 65,
    available: true,
    mileage: 7000,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456227/car1_aiomif.svg",
    features: ["All-Wheel Drive", "Roof Rack", "EyeSight Driver Assist"],
    description:
      "Explore with confidence in this versatile wagon, boasting all-wheel drive and advanced safety features for any journey.",
  },
  {
    make: "Kia",
    carModel: "Seltos",
    year: 2024,
    type: "Crossover",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 60,
    available: true,
    mileage: 3500,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456227/car1_aiomif.svg",
    features: ["Apple CarPlay", "Android Auto", "Rear Cross-Traffic Alert"],
    description:
      "A compact and stylish crossover, offering a comfortable ride and smart tech for urban exploration.",
  },
  {
    make: "Mazda",
    carModel: "CX-5",
    year: 2023,
    type: "SUV",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    pricePerDay: 68,
    available: true,
    mileage: 5800,
    fuelType: "Gasoline",
    ac: true,
    image:
      "https://res.cloudinary.com/dlxmziets/image/upload/v1751456223/car11_gyth62.svg",
    features: [
      "Heads-Up Display",
      "Bose Premium Audio",
      "Dynamic Stability Control",
    ],
    description:
      "Enjoy a refined and engaging drive with this sleek SUV, featuring premium amenities and dynamic handling.",
  },
];

const uploadCarToDatabase = async () => {
  try {
    await connectDB();

    // Clear existing cars first to avoid duplicates
    await Car.deleteMany({});
    console.log("🗑️  Cleared existing cars from database");

    const uploadedCars = await Car.insertMany(cars);
    console.log(`✅ ${uploadedCars.length} cars uploaded successfully`);
  } catch (error) {
    console.error("❌ Error occurred while uploading car data:", error);
  } finally {
    process.exit();
  }
};

uploadCarToDatabase();

