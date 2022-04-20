var express = require("express");
var cors = require("cors");
var app = express();
var http = require("http");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const dotenv = require("dotenv");

const router = require("./routes");

dotenv.config();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

// mongoose
//   .connect(
//     `mongodb://health-account:Q4Yv8QCkXWERcBYnIRhd7OkTpnZ4jqgURT7eFKCyFdwhglVW5XBr1Cd5EwFDPHO3qCbChJ0ppqiepFmVhapogg==@health-account.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@health-account@`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("connected to db");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
