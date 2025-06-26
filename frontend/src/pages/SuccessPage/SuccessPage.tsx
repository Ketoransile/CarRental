import { Button, Image } from "@heroui/react";
import checkmark from "../../assets/checkmark.png";
import { Link } from "react-router-dom";

export const SuccessPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="flex flex-col gap-4 items-center max-w-2xl shadow-2xl shadow-neutral-300 rounded-xl p-20">
        <Image src={checkmark} alt="order-successfull" width={80} />
        <h1 className="text-black font-bold text-xl">
          Thankyou for your Ordering!
        </h1>
        <p className="text-xs text-neutral-400 text-center pt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus a,
          dicta dolor pariatur laudantium in perspiciatis. Quae, facere
          doloremque impedit quasi perspiciatis dolore porro natus beatae
          reiciendis amet molestias voluptate!
        </p>
        <div className=" flex items-center justify-between gap-4">
          <Button className="bg-blue-600 text-white font-bold">
            View order
          </Button>
          <Link to="/all-cars">
            <Button className="bg-parent border border-neutral-300  rounded-xl">
              Continue Browsing Cars
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
