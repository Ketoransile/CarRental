import "dotenv/config";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { client } from "../config/db";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, customer } from "../utils/permission";
import { connectDB } from "../config/db";

const client = await connectDB();
export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "customer",
        input: false,
      },
      phoneNumber: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      address: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      city: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "http://localhost:3000, https://drivezy-frontend.vercel.app",
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        customer,
      },
    }),
  ],
});
