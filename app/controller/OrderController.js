//Npx Module
const catchAsync = require("../utils/catchAsync.js");

AppError = require("../utils/appError.js");
const { v4: uuidv4 } = require("uuid");
const { Op, Sequelize } = require("sequelize");

const OrderModel = require("../model/OrderModel");
const TransactionModel = require("../model/TransactionModel");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { amount, iProductId, sender, receiver, transactionId, validTill, status } = req.body;
  const transactionDetails = {
    transactionId: transactionId,
    sender: sender,
    receiver: receiver,
    amount: amount,
    status: status
  }

  const order = await OrderModel.create({
    amount: amount,
    iProductId: iProductId,
    iUserId: sender,
    transactionId: transactionId,
    validTill: validTill,
    deliveryStatus: "Not Delivered"
  });

  console.log(transactionDetails)
  const transaction = await TransactionModel.create(transactionDetails);

  res.status(201).json({
    success: true,
    order,
  });
});
