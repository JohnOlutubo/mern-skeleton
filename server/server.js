import config from "./../config/config.js"; //import the variable to set the port number that the server will listen
import app from "./express.js"; // import the configured Express app to start the server
import mongoose from "mongoose"; // use this module to implement the user model in this skeleton

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose.connect(
  config.mongoUri,
  {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`successfully connected to database ${config.mongoUri}`);
    }
  }
);

/* mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
}); */
