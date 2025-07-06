import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  // Button,
  // Avatar,
} from "@heroui/react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { LuUser } from "react-icons/lu";

export const UserMenu = () => {
  const { user, isLoading, logout } = useAuthStore();
  const navigate = useNavigate();
  const userId = user?.id;
  if (isLoading || !user) {
    return null;
  }

  // const getUserInitials = (user: { name?: string; email: string }) => {
  //   if (user.name) {
  //     return user.name
  //       .split(" ")
  //       .map((n) => n[0])
  //       .join("")
  //       .toUpperCase()
  //       .substring(0, 2);
  //   }
  //   return user.email[0].toUpperCase();
  // };

  // const userDisplayName = user.name || user.email;

  const handleAction = (key: React.Key) => {
    if (key === "logout") {
      logout();
    } else {
      navigate(`/${key}`);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex items-center gap-2 cursor-pointer">
          <LuUser size={24} />
          {/* <span className="hidden md:inline text-sm font-medium">
            {userDisplayName}
          </span> */}
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Menu" onAction={handleAction}>
        {/* <DropdownItem key="home">Home</DropdownItem> */}
        {/* <DropdownItem key="about">About</DropdownItem> */}
        <DropdownItem key={`my-bookings/${userId}`}>My Bookings</DropdownItem>
        {/* <DropdownItem key="profile">Profile</DropdownItem> */}
        {/* <DropdownItem key="settings">Settings</DropdownItem> */}
        <DropdownItem key="logout" className="text-red-500">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
