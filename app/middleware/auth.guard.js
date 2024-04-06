const JWTLibrary = require('../library/JWTLibrary.js');
const UserModel = require("../model/UserModel.js");
const ConstanceConfig = require("../config/ConstanceConfig.js");

exports.isAuth = async (req, res, next) => {
  if (req.headers.islogin && req.headers.islogin == "Yes" && req.headers.islogin != undefined) {
    console.log("req.headers.islogin",req.headers.authorization);
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decode = JWTLibrary.verifyToken(token);

        const loginUser = await UserModel.getLoginUser(decode.iUserId)
        if (!loginUser) {
          return res.status(ConstanceConfig.STATUS_CODE.UN_AUTH).send({
            status: "error",  
            message: "unauthorized access!",
          })
        }

        // req.body.iUserId = decode.iUserId;
        // req.user = user[0];

        return next();
      } catch (error) {
        if (error.name === 'JsonWebTokenError') {
          return res.status(ConstanceConfig.STATUS_CODE.UN_AUTH).send({
            status: "error",
            message: "unauthorized access!",
          })
        }
        if (error.name === 'TokenExpiredError') {
          return res.status(ConstanceConfig.STATUS_CODE.UN_AUTH).send({
            status: "error",
            message: "session expired try sign in!",
          })
        }
        return res.status(ConstanceConfig.STATUS_CODE.INTERNAL_SERVER).send({
          status: "error",
          code: ConstanceConfig.STATUS_CODE.INTERNAL_SERVER,
          message: "Internal server error!",
        });
      }
    } else {
      return res.status(ConstanceConfig.STATUS_CODE.UN_AUTH).send({
        status: "error",
        message: "A token is required for authentication!",
      })
    }
  } else {
    return next();
  }
};