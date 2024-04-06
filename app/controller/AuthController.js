//Npx Module
const ShortUniqueId = require("short-unique-id");
const md5 = require("md5");
const catchAsync = require("../utils/catchAsync");
AppError = require("../utils/appError");
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

//user register
exports.register = catchAsync(async (req, res, next) => {
  var error_check = false;
  var error_message = [];
  var authToken = uuidv4();

  if (!req.body.vFirstName) {
    error_check = true;
    error_message.push({
      message: "	vName required",
    });
  }
  if (!req.body.vLastName) {
    error_check = true;
    error_message.push({
      message: "	vName required",
    });
  }
  if (!req.body.vEmail) {
    error_check = true;
    error_message.push({
      message: "Email required",
    });
  }
  if (!req.body.vPassword) {
    error_check = true;
    error_message.push({
      message: "Password required",
    });
  }
  if (error_check == true) {
    return res.status(400).send(error_message);
  } else {
    let result = await UserModel.findAll({
      where: {
        vEmail: req.body.vEmail,
      },
    });
    if (result.length > 0) {
      throw new AppError("User with this email already exists.", 404)
    } else {
      //user register code here
      const uid = new ShortUniqueId({
        length: 10,
        dictionary: "number",
      });
      var vUniqueId = uid.rnd();
      let name = `${req.body.vFirstName} ${req.body.vLastName}`
      let tolowercase = name.toLowerCase();
      let replaceSpace = tolowercase.replace(/\s/g, "");
      let vSlug = `${replaceSpace}${vUniqueId}`;
      const register = {
        vUniqueId: vUniqueId,
        vFirstName: req.body.vFirstName,
        vLastName: req.body.vLastName,
        vEmail: req.body.vEmail,
        vPhone: req.body.vPhone,
        vPassword: md5(req.body.vPassword),
        vAuthCode: authToken,
        vSlug: vSlug,
      };
      let userData = await UserModel.create(register);

      if (userData) {        
        return res.send({
          status: "success",
          code: 200,
          message: "User signed-up successfully. Verification mail sent to your registered email.",
          data: userData,
        });
      } else {
        throw new AppError("Something went wrong while create user", 500)
      }
    }
  }
});

//user login
exports.login = catchAsync(async (req, res, next) => {
  var error_check = false;
  var error_message = [];

  if (!req.body.vEmail) {
    error_check = true;
    error_message.push({
      message: "Email required",
    });
  }
  if (!req.body.vPassword) {
    error_check = true;
    error_message.push({
      message: "Password required",
    });
  }
  if (error_check == true) {
    return res.status(400).send(error_message);
  } else {
    var hashPassword = md5(req.body.vPassword);
    const loginUserData = await UserModel.getUserByEmail(req);
    if (loginUserData) {
      if (hashPassword === loginUserData.vPassword) {
        const userIdToken = JWTLibrary.createToken({
          iUserId: loginUserData.iUserId
        });

        const JWTToken = JWTLibrary.createToken({
          vEmail: loginUserData.vEmail,
          iUserId: loginUserData.iUserId
        });

        const userInfo = {
          iUserId: loginUserData.iUserId,
          _id: userIdToken,
          eSalutation: loginUserData.eSalutation,
          Name: `${loginUserData.vFirstName} ${loginUserData.vLastName}`,
          vSlug: loginUserData.vSlug,
          vEmail: loginUserData.vEmail,
          vUserUniqueId: loginUserData.vUserUniqueId,
          vLogo: `${process.env.GET_ASSET_PATH}` + "/users/" + `${loginUserData.iUserId}/` + loginUserData.vLogo,
          token: JWTToken
        }

        return res.send({
          status: "success",
          code: 200,
          message: "Login Successfully",
          data: userInfo,
        });
      } else {
        throw new AppError("Incorrect password!", 404)
      }
    } else {
      throw new AppError("Incorrect email!", 404)
    }
  }
});

