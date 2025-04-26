import { Server } from "http";
import app from "./app";
import config from "./app/config";
import { PrismaClient } from "@prisma/client";
import seedSuperAdmin from "./app/DB";

const prisma = new PrismaClient();

async function bootstrap() {
  let server: Server;

  try {
    // Explicitly connect to the database to verify the connection
    await prisma.$connect();
    // logger.info("Database connection established");
    console.log("Database connection established");
    seedSuperAdmin();
    // Start the server
    server = app.listen(config.port, () => {
      // logger.info(`Server running on port ${config.port}`);
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `${error.name}: ${error.message}\n${error.stack}`
        : String(error);

    // errorlogger.error(`Failed to bootstrap the application: ${errorMessage}`);
    console.error(`Failed to bootstrap the application: ${errorMessage}`);
    process.exit(1); // Exit the process with a failure code
  }

  const exitHandler = () => {
    if (server) {
      server.close(async () => {
        // logger.info('Server closed');
        console.log("Server closed");
        await prisma.$disconnect(); // Clean up Prisma connection pool
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown): void => {
    const errorMessage =
      error instanceof Error
        ? `${error.name}: ${error.message}\n${error.stack}`
        : String(error);

    // errorlogger.error(errorMessage);
    console.error(errorMessage);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  // Uncomment if you handle SIGTERM (e.g., in production on containerized environments)
  // process.on("SIGTERM", async () => {
  //   logger.info("SIGTERM received");
  //   if (server) {
  //     server.close(async () => {
  //       await prisma.$disconnect();
  //       logger.info("Server and database connections closed");
  //     });
  //   }
  // });
}

bootstrap();
