//Npx Module
const ShortUniqueId = require("short-unique-id");
const md5 = require("md5");
const catchAsync = require("../utils/catchAsync.js");
AppError = require("../utils/appError.js");
const {
  v4: uuidv4
} = require("uuid");
const {
  Op,
  Sequelize
} = require("sequelize");

// //Modules
const UserModel = require("../model/UserModel.js");
// //Library
const JWTLibrary = require('../library/JWTLibrary.js');


exports.getUser = catchAsync(async (req, res, next) => {
  //user register code here
  let userData = await UserModel.findOne({where:{iUserId : req.body.iUserId}});
    return res.send({
      status: "success",
      code: 200,
      message: "User Data found",
      data: userData,
    });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  //user register code here
  let userData = await UserModel.findAll();
    return res.send({
      status: "success",
      code: 200,
      message: "User Data found",
      data: userData,
    });
});

//user register
exports.updateProfile = catchAsync(async (req, res, next) => {
      const updateProfile = {
        vFirstName: req.body.vFirstName,
        vLastName: req.body.vLastName,
        vEmail: req.body.vEmail,
        vPhone: req.body.vPhone,
      };
      let userData =await UserModel.update(updateProfile , {
        where: {iUserId : req.body.iUserId}
      });
      if (!userData) {
        throw new AppError("Something went wrong while create user", 500)
      }
        return res.send({
          status: "success",
          code: 200,
          message: "Profile Update SuccessFully",
          data: userData,
        });
      
});

exports.resetPass = catchAsync(async (req, res, next) => {
  const newPass = {
    vPassword: md5(req.body.vPassword),
  };
  let userData =await UserModel.update(newPass , {
    where: {iUserId : req.body.iUserId}
  });
  if (!userData) {
    throw new AppError("Something went wrong while updating password", 500)
  }
    return res.send({
      status: "success",
      code: 200,
      message: "PassWord reset Successfuly",
      data: userData,
    });
  
});


exports.deleteUser = catchAsync(async (req, res, next) => {
  //user register code here
  let userData = await UserModel.destroy({where:{iUserId : req.body.iUserId}});
    return res.send({
      status: "success",
      code: 200,
      message: "User Deleted Succesfully",
      data: userData,
    });
});
