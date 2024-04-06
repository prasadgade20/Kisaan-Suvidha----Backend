module.exports = app => {
    const router = require("express").Router();
    const BlogController = require("../controller/BlogController.js");
    const {
        isAuth
    } = require('../middleware/auth.guard.js');

    router.post("/getAllBlogs", BlogController.getAllBlogs); //done
    router.post("/addBlogs", BlogController.addBlogs); //done
    router.post("/updateBlogs", BlogController.updateBlogs); //done
    router.post("/deleteBlogs", BlogController.deleteBlogs); //done

    app.use("/api/blogs", router);
}