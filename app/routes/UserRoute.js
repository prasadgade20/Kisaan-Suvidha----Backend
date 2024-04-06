module.exports = app => {
    const router = require("express").Router();
    const UserController = require("../controller/UserController.js");
    
    router.post("/getUser", UserController.getUser); //done
    router.post("/getAllUser", UserController.getAllUser); //done
    router.post("/updateProfile", UserController.updateProfile); //done
    router.post("/resetPass", UserController.resetPass); //done
    router.post("/deleteUser", UserController.deleteUser); //done

    app.use("/api/user", router);
}