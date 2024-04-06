module.exports = app => {
    const router = require("express").Router();
    const CartController = require("../controller/CartController.js");
    const {
        isAuth
    } = require('../middleware/auth.guard.js');

    router.post("/getAllCart", CartController.getAllCart); //done
    router.post("/addCart", CartController.addCart); //done
    // router.post("/updateCart", CartController.updateCart); //done
    router.post("/deleteCart", CartController.deleteCart); //done

    app.use("/api/cart", router);
}