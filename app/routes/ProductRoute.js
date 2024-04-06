module.exports = app => {
    const router = require("express").Router();
    const ProductController = require("../controller/ProductController.js");
    const {
        isAuth
    } = require('../middleware/auth.guard.js');

    router.post("/getAllProducts", ProductController.getAllProducts); //done
    router.post("/addProducts", ProductController.addProducts); //done
    router.post("/updateProducts", ProductController.updateProducts); //done
    router.post("/deleteProducts", ProductController.deleteProducts); //done

    app.use("/api/products", router);
}