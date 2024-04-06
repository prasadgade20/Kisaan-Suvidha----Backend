const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const fileUpload = require("express-fileupload");
// import sequelize from "./app/model/connection.js";
const db = require("./app/model/index.js");
const AppError = require("./app/utils/appError.js");
const errorController = require("./app/utils/errorController.js");

var corsOptions = {
    origin: [
       "*",
       "http://localhost:5173",
       "http://localhost:3000",
       "localhost:5007",
       "localhost:3000"
    ],
    methods: ["GET", "POST", "OPTION"],
    allowedHeaders: [
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, authorization, isLogin",
    ],
};

app.use(cors(corsOptions));

app.use(
    express.json({
        limit: "1000mb",
        extended: true,
        parameterLimit: 500000,
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "1000mb",
        parameterLimit: 500000,
    })
);


app.use(fileUpload());

app.get("/api", (req, res, next) => {
    try {
        db.authenticate().then(() => {
            return res.send({
                status: "success",
                code: "200",
                message: "Welcome to Farmer api",
            });
        });
    } catch (error) {
        next(error);
    }
});

require("./app/config/RouteConfig")(app);


const PORT = process.env.PORT || 5007;
app.use(express.static(__dirname + "/app/uploads/"));

app.listen(PORT, () => {
    console.log(`Coltbay server runnig on http://localhost:${PORT} .`);
});

app.all("*", function (req, res, next) {
    throw new AppError(`You reached a route ${req.path} that is not defined on this server`, 404);
    // error.statusCode = 404,
    // next(error);
})

app.use(errorController);