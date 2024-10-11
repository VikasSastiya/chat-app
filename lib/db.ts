// import { PrismaClient } from "@prisma/client";

// declare global {
//     var prisma: PrismaClient | undefined;
// }

// // reason to do this is because of hot-reload in nextjs
// export const db = globalThis.prisma || new PrismaClient();
// if(process.env.NODE_ENV !== "production") {
//     globalThis.prisma = db;
// }

import { PrismaClient } from "@prisma/client";

// Disable ESLint's no-var rule only for the global declaration
/* eslint-disable no-var */
declare global {
  var prisma: PrismaClient | undefined; // Global var declaration for Prisma client
}
/* eslint-enable no-var */

// Check if Prisma is already in the global object
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
}

// Export the Prisma client
export const db = prisma;

