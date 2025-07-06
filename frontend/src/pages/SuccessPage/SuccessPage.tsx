import { Button, Image } from "@heroui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import checkmark from "../../assets/checkmark.png";
import { authClient } from "../../lib/auth-client";
export const SuccessPage = () => {
  const { data: session } = authClient.useSession();

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="flex flex-col gap-4 items-center max-w-2xl shadow-2xl shadow-neutral-300 rounded-xl p-20">
        <Image src={checkmark} alt="order-successfull" width={80} />
        <h1 className="text-black font-bold text-xl">
          Thank you for your Ordering!
        </h1>
        <p className="text-xs text-neutral-400 text-center pt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>
        {userId && (
          <Link to={`/my-bookings/${userId}`}>
            <Button className="bg-blue-600 text-white font-bold">
              View order
            </Button>
          </Link>
        )}

        <Link to="/all-cars">
          <Button className="bg-parent border border-neutral-300 rounded-xl">
            Continue Browsing Cars
          </Button>
        </Link>
      </div>
    </div>
  );
};
