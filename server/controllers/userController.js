const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const sendEmail = require("../utils/sendEmail");

// Register a user...
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  //   try {
  //     const myCloud = await cloudinary.uploader
  //       .upload(req.body.avatar, {
  //         folder: "avaters",
  //         width: 150,
  //         crop: "scale",
  //         resource_type: "auto",
  //       })
  //       .then((result) => {
  //         console.log(result);
  //       });
  // }catch(error){
  //   console.log(error);
  // }

  const { name, email, password } = req.body;
  console.log(`mycloud public Id: ${myCloud}`);
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "myCloudm.public_id",
      url: "myCloudm.secure_url",
    },
  });
  sendToken(user, 201, res);
});

// Login user...
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // now checking weather user has given email or password or both...
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

// logout user...
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forget password...
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // getting reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `Your reset Password Token is : ${resetPasswordUrl} \n \n If you haven't requested this email then, Please ignore`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
// Get Reset Password Token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {});
// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {});
// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {});
// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {});
// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {});
// Get All User --Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});
// Get Single User --Admin

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});
// Update User Role --Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserRole = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  await User.findByIdAndUpdate(req.params.id, newUserRole, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});
// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User doesn't exist with this Id: ${req.params.id}`)
    );
  }
  // const imageId = user.avatar.public_id;
  // await cloudinary.v2.uploader.destroy(imageId);
  await User.findById(req.params.id).remove();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
