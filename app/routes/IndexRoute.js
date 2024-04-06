module.exports = app => {
    const IndexController = require("../controller/IndexController.js");

    const router = require("express").Router();

    router.post("/getConfig", IndexController.findConfigs);//done
    // router.post("/getBanner", IndexController.findBanners);
    router.post("/getMainMenuData", IndexController.findMainMenuData);//done
    router.post("/getClientIpAddress", IndexController.findClientNetworkIpAddress); //done

    app.use("/api/index", router);
}