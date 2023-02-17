/* 
This defines some server-side configuration-related variables 
that will be used in the code but should not be hardcoded 
as a best practice, as well as for security purposes.
 */

const config = {
  env: process.env.NODE_ENV || "development", // to differentiate between development and production environments
  port: process.env.PORT || 3000, // to define the listening port for the server
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", // The secret key to be used to sign JWT
  // The location of MongoDB database instance for the project
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST || "mongodb://localhost:27017/mernproject",
    /* "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/mernproject", */
};

export default config;
