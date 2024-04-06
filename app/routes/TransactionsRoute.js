module.exports = app => {
    const router = require("express").Router();
    const TransactionController = require("../controller/TransactionController.js");
    const {
        isAuth
    } = require('../middleware/auth.guard.js');

    router.post("/processPayment", TransactionController.processPayment); //done


    app.use("/api/payment", router);
}