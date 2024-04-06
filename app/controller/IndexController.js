const SettingModel = require("../model/SettingsModel");
const MainMenuModel = require("../model/MainMenuModel");
const catchAsync = require("../utils/catchAsync");
AppError = require("../utils/appError");

exports.findConfigs = catchAsync(async (req, res, next) => {
  if (req.body.eConfigType) {
    const settingData = await SettingModel.getConfigData(req);
    // if (settingData.length > 0) {
    var path = `${process.env.GET_ASSET_PATH}` + "/logo/";
    return res.send({
      status: "success",
      code: "200",
      message: "Config Data Found",
      path: path,
      data: settingData,
    });
    // } else {
    //   return res.send({
    //     status: "error",
    //     code: "404",
    //     message: "Data Not Found",
    //   });
    // }
  } else {
    throw new AppError("eConfigType Parameter Missing", 404)
  }

});


exports.findMainMenuData = catchAsync(async (req, res, next) => {
  const mainmenuData = await MainMenuModel.getAllMainMenuData(req);
  // var path = `${process.env.GET_ASSET_PATH}` + "/main_menu/";
  return res.send({
    status: "success",
    code: "200",
    message: "MainMenu Data Found Successfully",
    // path: path,
    data: mainmenuData,
  });

});

exports.findClientNetworkIpAddress = (req, res, next) => {
  try {
    var clientip =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (clientip.substr(0, 7) == "::ffff:") {
      clientip = clientip.substr(7);
    }
    if (clientip) {
      return res.send({
        status: "success",
        code: "200",
        message: "Client IP Address Found",
        data: clientip,
      });
    } else {
      return res.send({
        status: "error",
        code: "404",
        message: "No Network Connect",
      });
    }
  } catch (error) {
    next(error);
  }
};