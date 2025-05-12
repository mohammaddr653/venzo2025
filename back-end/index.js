require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(cors({ origin: process.env.ORIGIN_URL, credentials: true }));

const debug = require("debug")("app");

const router = require("./src/routes"); // the file name is index so the express will recognize it automaticly

require("./startup/config")(app, express);
require("./startup/db")();
require("./startup/logging")();

app.use("/api", router);

const port = process.env.PORT || 3000;
const host = process.env.HOST;
app.listen(port, host, () => debug(`listening on http://${host}:${port}`));
