module.exports = app => {
    const router = require("express").Router();
    const AuthController = require("../controller/AuthController");
    const {
        isAuth
    } = require('../middleware/auth.guard.js');

    router.post("/register", AuthController.register); //done
    router.post("/login", AuthController.login); //done
    // router.post("/verify-email", AuthController.verify); //done

    app.use("/api/auth", router);
}