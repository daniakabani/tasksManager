const express = require("express"),
  cors = require("cors"),
  app = express();
app.use(express.json());
const apiV1Routes = require("daniakabani/routes/api/v1");
app.use(cors());
app.use("/api/v1", apiV1Routes);
app.all("*", function (req, res) {
  res.status(404).send("not found");
});

module.exports.app = app;
