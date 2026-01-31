import { Hero } from "../../components/Hero/Hero";
import { PopularCars } from "../../components/PopularCars";
// import { RecommendedCars } from "../../components/RecommendedCars";

export const Home = () => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <Hero />
      <PopularCars />
      {/* <RecommendedCars /> */}
    </main>
  );
};
