// // GoogleSignInButton.tsx
// import { Button } from "@heroui/react";
// import { authClient } from "../lib/auth-client";

// export function GoogleSignInButton() {
//   const handleGoogleSignIn = async () => {
//     const origin =
//       typeof window !== "undefined"
//         ? window.location.origin
//         : "http://localhost:3000";

//     try {
//       console.log("origin", window.location.origin);
//       console.log(
//         "google signin button console.log ",
//         window.location.origin + "/api/auth/callback/google"
//       );

//       await authClient.signIn.social({
//         provider: "google",
//         callbackURL: `${origin}`,
//         errorCallbackURL: `${origin}`,
//         newUserCallbackURL: `${origin}`,
//         // disableRedirect: false, // optional – defaults to false
//       });
//     } catch (err) {
//       console.error("Google Sign-In failed:", err);
//       window.location.href = `${origin}/error`;
//     }
//   };

//   return (
//     <Button
//       onPress={handleGoogleSignIn}
//       className="bg-white border px-4 py-2 rounded shadow hover:bg-gray-100"
//     >
//       Sign in with Google
//     </Button>
//   );
// }
// GoogleSignInButton.tsx
import { Button } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import { FcGoogle } from "react-icons/fc"; // Import the Google icon

export function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";

    try {
      console.log("origin", window.location.origin);
      console.log(
        "google signin button console.log ",
        window.location.origin + "/api/auth/callback/google"
      );

      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${origin}`,
        errorCallbackURL: `${origin}`,
        newUserCallbackURL: `${origin}`,
        // disableRedirect: false, // optional – defaults to false
      });
    } catch (err) {
      console.error("Google Sign-In failed:", err);
      window.location.href = `${origin}/error`;
    }
  };

  return (
    <Button
      onPress={handleGoogleSignIn}
      className="bg-white text-gray-700 flex items-center justify-center gap-2 py-2 sm:py-3 w-full max-w-xs sm:max-w-sm border border-neutral-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
    >
      <FcGoogle size={20} className="sm:w-6 sm:h-6" />
      <p className="font-medium text-sm sm:text-base">Sign in with Google</p>
    </Button>
  );
}
