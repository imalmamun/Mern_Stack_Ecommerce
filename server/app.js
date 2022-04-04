const express = require('express');
const app = express();
const errorHandlerMiddleware = require('./middleware/error');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(cookieParser());

// Routes imports
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
app.use("/api/v1", product);
app.use("/api/v1",user);
// app.use("/api/v1",order);
// app.use("/api/v1",payment);

 
// error handler middleware here....
app.use(errorHandlerMiddleware);

module.exports = app


// npm run dev