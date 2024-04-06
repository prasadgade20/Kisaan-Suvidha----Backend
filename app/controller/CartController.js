//Npx Module
const catchAsync = require("../utils/catchAsync.js");

AppError = require("../utils/appError.js");
const {
  v4: uuidv4
} = require("uuid");
const {
  Op,
  Sequelize
} = require("sequelize");

const CartModel = require("../model/CartModel.js");
const ProductModel = require("../model/ProductModel.js");
const HelperLibrary = require("../library/HelperLibrary.js");

exports.getAllCart = catchAsync(async (req, res, next) => {
  //user register code here
  let path = "http://localhost:5007/";
  let cartData = await CartModel.getAllCart(req);

  return res.send({
    status: "success",
    code: 200,
    path: path,
    message: "Cart Data found",
    data: cartData,
  });
});


exports.addCart = catchAsync(async (req, res, next) => {

  const cartsData = {
    iProductId: req.body.iProductId,
    iUserId: req.body.iUserId,
    iMonth: req.body.iMonth || null,
    dtAddedDate: new Date(),
    dtUpdatedDate: new Date(),
  };
  let cartRes = await CartModel.create(cartsData);
  await ProductModel.update({eSold: "Rented"},{
    where:{
      iProductId: req.body.iProductId
    }
  });

  if (cartRes) {
    return res.send({
      status: "success",
      code: 200,
      message: "Cart Created Successfully",
      data: cartRes,
    });
  } else {
    throw new AppError("Something went wrong while create Product", 500)
  }
});



exports.deleteCart = catchAsync(async (req, res, next) => {
  let cartData = await CartModel.findOne({
    where: { iCartId: req.body.iCartId,},
    attributes : ["iProductId"]
  })
  await CartModel.destroy({
    where: { iCartId: req.body.iCartId,}
  });
  await ProductModel.update({eSold: "UnRented"},{
    where:{
      iProductId: cartData.iProductId 
    }
  })
  return res.send({
    status: "success",
    code: 200,
    message: "Cart Deleted Successfully",
  });
});