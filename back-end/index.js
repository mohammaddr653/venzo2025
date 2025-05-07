require("express-async-errors");
require("dotenv").config();
const config = require("config");

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(cors({ origin: config.get("origin_url"), credentials: true }));

const debug = require("debug")("app");

const router = require("./src/routes"); // the file name is index so the express will recognize it automaticly

require("./startup/config")(app, express);
require("./startup/db")();
require("./startup/logging")();

app.use("/api", router);

const port = config.get("port") || 3000;
const host = config.get("host");
app.listen(port, host, () => debug(`listening on http://${host}:${port}`));
