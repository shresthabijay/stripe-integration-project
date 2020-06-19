const http = require("http");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect("mongodb://localhost/stripeintegration", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection Error: " + err);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

const server = http.createServer(require("./app"));

server.listen(process.env.PORT, () =>
  console.log("Server started at port " + process.env.PORT)
);
