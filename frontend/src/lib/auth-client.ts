import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, admin, customer } from "../utils/permission";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        customer,
      },
    }),
  ],
});
