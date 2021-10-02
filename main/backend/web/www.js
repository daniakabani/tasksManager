require("dotenv").config({ path: ".env" });
const config = require("daniakabani/config"),
  { app } = require("daniakabani/app.js"),
  http = require("http"),
  debug = require("debug"),
  port = normalizePort(config.PORT);
const server = http.createServer(app);
app.set("port", port);
server.listen(port, "0.0.0.0", async () => {
  console.log(`Service started on port ${port}`);
});
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      process.exit(1);
      break;
    case "EADDRINUSE":
      process.exit(1);
      break;
    default:
      throw error;
  }
}

async function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
}

module.exports = server;
