const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resources", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(`decoded data: ${decodedData}`);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        console.log(`roles: ${req.user.role}`);

      return next(
        new ErrorHandler(
          `Role: ${req.user.role} has no access to this resource`,
          403
        )
      );
    }
    next();
  };
};
