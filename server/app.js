const express = require('express');
const app = express();
const errorHandlerMiddleware = require('./middleware/error');

app.use(express.json());

// Routes imports
const product = require("./routes/productRoute.js");
app.use("/api/v1", product)


// error handler middleware here....
app.use(errorHandlerMiddleware);

module.exports = app


// npm run dev