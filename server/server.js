import config from "./../config/config.js"; //import the variable to set the port number that the server will listen
import app from "./express.js"; // import the configured Express app to start the server

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
