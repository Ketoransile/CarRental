import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button, // Keep Button if you need it for other parts, but not for the Logout item itself
} from "@heroui/react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom"; // Assuming you might navigate to a profile page

export const UserMenu = () => {
  const { user, isLoading, logout } = useAuthStore();
  const navigate = useNavigate(); // If you have a profile/settings page

  // If user data isn't available yet or user is not logged in, don't render the menu
  // The parent component (Header) should ideally handle this conditional rendering.
  // However, as a safeguard, we can return null here.
  if (isLoading || !user) {
    return null; // Or a placeholder if you want something to show while loading
  }

  // Determine initials for the avatar trigger
  const getUserInitials = (user: { name?: string; email: string }) => {
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2); // Take first two initials
    }
    return user.email[0].toUpperCase(); // Fallback to first letter of email
  };

  const userDisplayName = user.name || user.email; // Prefer name, fallback to email

  return (
    <Dropdown placement="bottom-end">
      {" "}
      {/* Place dropdown at bottom-end */}
      <DropdownTrigger>
        {/* Modern Avatar/Initials Trigger */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold text-lg cursor-pointer shadow-md hover:bg-blue-700 transition-colors duration-200">
          {getUserInitials(user)}
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions" variant="flat">
        {/* User Info Header Item */}
        <DropdownItem
          key="user-info"
          textValue={userDisplayName}
          isReadOnly
          className="opacity-100 cursor-default"
        >
          <div className="font-semibold text-base py-1">{userDisplayName}</div>
          <div className="text-sm text-neutral-500">{user.email}</div>
        </DropdownItem>

        <DropdownItem key="profile" onPress={() => navigate("/profile")}>
          {" "}
          {/* Example: Navigate to profile */}
          Profile
        </DropdownItem>
        {/* You can add more items like "Settings", "Dashboard" etc. */}
        {/* <DropdownItem key="settings" onPress={() => navigate("/settings")}>
          Settings
        </DropdownItem> */}

        {/* Logout Item */}
        <DropdownItem
          key="logout"
          className="text-danger-500 font-semibold" // Use Tailwind color for danger
          color="danger" // Apply danger color from Heroui/React if supported
          onPress={logout} // Directly call logout on DropdownItem
          // You might remove 'shortcut' if you don't actually implement it globally
          // shortcut="⌘⇧D"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
