// src/config/accessControl.js
import { createAccessControl } from "better-auth/plugins/access";
// Assuming defaultStatements and adminAc are part of better-auth's admin plugin
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

// Define all possible resources and actions in your application
const appStatements = {
  // ...defaultStatements, // Provides 'self' actions like 'read', 'update' on user's own data

  // Car Management
  car: ["create", "read", "update", "delete", "list_all", "search_available"],

  // Location Management (even for a single location, actions like 'read' and 'update' are relevant)
  location: ["read", "update"], // No create/delete for a single fixed location

  // Booking Management
  booking: [
    "create",
    "read",
    "update",
    "delete",
    "cancel",
    "manage_status",
    "list_all",
  ],

  // Payment Management
  payment: ["create", "read", "refund", "manage_status"],

  // User Management (different from user's own profile actions)
  user_management: [
    "read",
    "update",
    "delete",
    "toggle_active",
    "verify_license",
  ],

  // Review Management
  review: ["create", "read", "update", "delete", "list_all"],

  // Analytics/Reporting
  analytics: ["read_dashboard", "generate_reports"],

  // Operational actions (e.g., performed by staff at the single location)
  pickup_car: ["perform"],
  dropoff_car: ["perform"],
} as const;

const ac = createAccessControl(appStatements);

// Define Roles and their granted permissions
// Admin Role: Full control over most aspects
const admin = ac.newRole({
  car: ["create", "read", "update", "delete", "list_all", "search_available"],
  location: ["read", "update"],
  booking: [
    "create",
    "read",
    "update",
    "delete",
    "cancel",
    "manage_status",
    "list_all",
  ],
  payment: ["create", "read", "refund", "manage_status"],
  user_management: [
    "read",
    "update",
    "delete",
    "toggle_active",
    "verify_license",
  ],
  review: ["create", "read", "update", "delete", "list_all"],
  analytics: ["read_dashboard", "generate_reports"],
  pickup_car: ["perform"],
  dropoff_car: ["perform"],
  // ...adminAc.statements, // Add any default admin capabilities from better-auth plugin
});

// Customer Role: Can manage their own profile, search cars, make/view/cancel their own bookings, leave reviews
const customer = ac.newRole({
  car: ["read", "search_available"],
  booking: ["create", "read", "cancel"], // Note: Controllers must enforce ownership for 'read'/'cancel'
  payment: ["create", "read"], // Customers initiate payments and read their own payment status
  review: ["create", "read"], // Customers can create and read reviews
});

export { ac, admin, customer, appStatements };
