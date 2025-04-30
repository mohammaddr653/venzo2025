require("express-async-errors");
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));

require("dotenv").config();
const debug = require("debug")("app");
const config = require("config");

const router = require("./src/routes"); // the file name is index so the express will recognize it automaticly

require("./startup/config")(app, express);
require("./startup/db")();
require("./startup/logging")();

app.use("/api", router);

const port = config.get("port") || 3000;
const host = config.get("host");
app.listen(port, host, () => debug(`listening on http://${host}:${port}`));
