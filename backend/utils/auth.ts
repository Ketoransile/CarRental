// import "dotenv/config";
// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// // import { client } from "../config/db";
// import { admin as adminPlugin } from "better-auth/plugins";
// import { ac, admin, customer } from "../utils/permission.js";
// import { connectDB } from "../config/db.js";

// const client = await connectDB();
// export const auth = betterAuth({
//   database: mongodbAdapter(client.db()),
//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         required: true,
//         defaultValue: "customer",
//         input: false,
//       },
//       phoneNumber: {
//         type: "string",
//         required: false,
//         defaultValue: "",
//         input: true,
//       },
//       address: {
//         type: "string",
//         required: false,
//         defaultValue: "",
//         input: true,
//       },
//       city: {
//         type: "string",
//         required: false,
//         defaultValue: "",
//         input: true,
//       },
//     },
//   },
//   emailAndPassword: {
//     enabled: true,
//   },
//   advanced: {
//     useSecureCookies: true,
//   },
//   trustedOrigins: [
//     "http://localhost:3000",
//     "https://drivezy-frontend.vercel.app",
//   ],
//   // socialProviders: {
//   //   // github: {
//   //   //   clientId: process.env.GITHUB_CLIENT_ID as string,
//   //   //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//   //   // },
//   // },
//   plugins: [
//     adminPlugin({
//       ac,
//       roles: {
//         admin,
//         customer,
//       },
//     }),
//   ],
// });
// import "dotenv/config";
// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// // import { client } from "../config/db";
// import { admin as adminPlugin } from "better-auth/plugins";
// import { ac, admin, customer } from "../utils/permission.js";
// import { connectDB } from "../config/db.js";

// const client = await connectDB();
// const isLocalhost = process.env.NODE_ENV !== "production";
// export const auth = betterAuth({
//   database: mongodbAdapter(client.db()),
//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         required: true,
//         defaultValue: "customer",
//         input: false,
//       },
//       phoneNumber: {
//         type: "string",
//         required: false,
//         defaultValue: "",
//         input: true,
//       },
//       address: {
//         type: "string",
//         required: false,
//         defaultValue: "",
//         input: true,
//       },
//       city: {
//         type: "string",
//         required: false,
//         defaultValue: "",
//         input: true,
//       },
//     },
//   },
//   emailAndPassword: {
//     enabled: true,
//   },
//   advanced: {
//     useSecureCookies: process.env.NODE_ENV === "production",
//     cookieSettings: {
//       sameSite: isLocalhost ? "lax" : "none",
//       secure: !isLocalhost ? true : false,
//     },
//   },
//   trustedOrigins: [
//     "http://localhost:3000",
//     "https://drivezy-frontend.vercel.app",
//   ],
//   socialProviders: {
//     // github: {
//     //   clientId: process.env.GITHUB_CLIENT_ID as string,
//     //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     // },
//   },
//   plugins: [
//     adminPlugin({
//       ac,
//       roles: {
//         admin,
//         customer,
//       },
//     }),
//   ],
// });
import "dotenv/config";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { client } from "../config/db";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, customer } from "../utils/permission.js";
import { connectDB } from "../config/db.js";

const client = await connectDB();
const isLocalhost = process.env.NODE_ENV !== "production";

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
  advanced: {
    useSecureCookies: !isLocalhost, // true in production, false locally
    cookies: {
      session_token: {
        attributes: {
          sameSite: isLocalhost ? "lax" : "none", // lax locally, none in prod for cross-site
          secure: !isLocalhost, // secure only in prod
          httpOnly: true,
          path: "/",
          // domain: ".drivezy.com", // uncomment if sharing cookies across subdomains
        },
      },
      // customize other cookies here if needed
    },
    // Optionally enable cross subdomain cookies if you have multiple subdomains
    // crossSubDomainCookies: {
    //   enabled: true,
    //   domain: ".drivezy.com",
    // },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://drivezy-frontend.vercel.app",
    "https://drivezy-car-rental.vercel.app",
  ],
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
