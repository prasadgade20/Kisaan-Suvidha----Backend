//Npx Module
const catchAsync = require("../utils/catchAsync.js");

AppError = require("../utils/appError.js");
const { v4: uuidv4 } = require("uuid");
const { Op, Sequelize } = require("sequelize");

const stripe = require("stripe")(
  "sk_test_51KiCrCSBeWSyq0I0wh1b6HwjUlysrWIWWiIvlCROwCxQeCnNQghWVJPuiWyYBawoDoHOJx5JRiTGYNpWKxbqR4Xs00r5VuVRWd"
);

const TransactionModel = require("../model/TransactionModel")

exports.processPayment = catchAsync(async (req, res, next) => {

        const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Hack-o-Holics",
      },
    });
  
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });

    
  });