module.exports = app => {
    const router = require("express").Router();
    const OrderController = require("../controller/OrderController.js");
    const {
        isAuth
    } = require('../middleware/auth.guard.js');

    router.post("/createOrder", OrderController.createOrder); //done


    app.use("/api/order", router);
}