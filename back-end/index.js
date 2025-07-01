/*
 * Copyright (c) 2025 Mohammad Amin Derakhshande
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const debug = require("debug")("app");

const router = require("./src/routes"); // the file name is index so the express will recognize it automaticly

require("./startup/config")(app, express);
require("./startup/db")();
require("./startup/logging")();

app.get("/", (req, res) => {
  res.send("Welcome to Venzo Backend!");
});

app.use("/api", router);
const mode = process.env.NODE_ENV;
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
app.listen(port, host, () => debug(`listening on http://${host}:${port}`));
