import { Hero } from "../../components/Hero/Hero";
import { PopularCars } from "../../components/PopularCars";
import { RecommendedCars } from "../../components/RecommendedCars";

export const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col gap-10  rounded-2xl  items-start justify-start pt-10 ">
      <Hero />
      <PopularCars />
      {/* <RecommendedCars /> */}
    </div>
  );
};
