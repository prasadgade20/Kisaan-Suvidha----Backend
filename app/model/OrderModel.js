const {Sequelize} = require("sequelize");
const db = require("./index.js");
const {Op,QueryTypes} = require("sequelize");

const Order = db.define(
  "order", {
    iOrderId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    iProductId: {
      type: Sequelize.INTEGER,
    },
    transactionId: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    validTill: {
      type: Sequelize.DATE,
    },
    iUserId: {
        type: Sequelize.INTEGER,
    },
    deliveryStatus: {
        type: Sequelize.STRING
    }
  }, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);


// Users.userDetailsById = (userId) => {
//   var where = {};

//   if (userId && userId != "") {
//     where.iUserId = userId;
//   }

//   where.eStatus = "Active";
//   return Users.findOne({
//     where,
//   });
// };

// Users.getUserById = (req) => {
//   var where = {};

//   if (req.body.iUserId && req.body.iUserId != "") {
//     where.iUserId = req.body.iUserId;
//   }

//   if (req.params.iUserId && req.params.iUserId != "") {
//     where.iUserId = req.params.iUserId;
//   }
//   where.eStatus = "Active";
//   // return Users.findAll({
//   //   where,
//   //   attributes: {
//   //     exclude: ["vPassword"],
//   //     include: [
//   //       [
//   //         Sequelize.literal(`(
//   //                       SELECT vGender
//   //                       FROM custom_gender
//   //                       WHERE
//   //                       custom_gender.eStatus = 'Active'
//   //                       AND
//   //                       custom_gender.iCustomGenderId = user.iCustomGenderId LIMIT 1
//   //                   )`),
//   //         "custom_gender_name",
//   //       ],
//   //       [
//   //         Sequelize.literal(`(
//   //                 SELECT eProfileType
//   //                 FROM profile_setting
//   //                 WHERE profile_setting.iUserProfileId = user.iUserId
//   //            )`),
//   //         "eProfileType",
//   //       ],
//   //       [
//   //         Sequelize.literal(`(
//   //                 SELECT eMention
//   //                 FROM profile_setting
//   //                 WHERE profile_setting.iUserProfileId = user.iUserId
//   //            )`),
//   //         "eMention",
//   //       ],
//   //       [
//   //         Sequelize.literal(`(
//   //                 SELECT eTag
//   //                 FROM profile_setting
//   //                 WHERE profile_setting.iUserProfileId = user.iUserId
//   //            )`),
//   //         "eTag",
//   //       ],
//   //     ],
//   //   },
//   // });
// };

// //check user with their email id
// Users.getUserByEmail = (req) => {
//   var vEmail = req.body.vEmail;
//   var where = {};

//   if (req.body.vEmail && req.body.vEmail != "") {
//     where.vEmail = vEmail;
//   }
//   return Users.findOne({
//     where,
//   });
// };

// Users.getUserDetailsByUserData = (req) => {
//   var where = {};

//   if (req.body.resetPassToken != null && req.body.resetPassToken != "") {
//     where.vAuthCode = req.body.resetPassToken;
//   }
//   if (req.body.iUserId != null && req.body.iUserId != "") {
//     where.iUserId = req.body.iUserId;
//   }
//   return Users.findOne({
//     where,
//   });
// };

// Users.getAllPremiumVendor = (req) => {
//   let where = {};
//   if (req.body.eProfileType != null && req.body.eProfileType != "") {
//     where.eProfileType = req.body.eProfileType;
//   }
//   return Users.findAll({
//     attributes: ["iUserId", "vName", "vLogo", "tMission", "tAddress"],
//     where,
//   });
// };

// Users.checkUserAuthToken = (req) => {
//   let where = {};

//   const token = req.body.verifyToken;
//   if (req.body.verifyToken != null && req.body.verifyToken != "") {
//     where.vAuthCode = token;
//   }
//   return Users.findAll({
//     where,
//   });
// };


// Users.getMetaInformationById = (req) => {
//   var where = {};

//   if (req.body.iUserId && req.body.iUserId != "") {
//     where.iUserId = req.body.iUserId;
//   }

//   return Users.findAll({
//     where,
//     attributes: ["vMetaTitle", "tMetaDescription", "vMetaKeyword", "tSchema"],
//   });
// };



// 

// Users.hasMany(UserEducationModel, {
//   foreignKey: "iUserId",
//   sourceKey: "iUserId",
// });

// Users.hasMany(UserExperienceModel, {
//   foreignKey: "iUserId",
//   sourceKey: "iUserId",
// });
// Users.hasMany(UserSkillModel, {
//   foreignKey: "iUserId",
//   sourceKey: "iUserId",
// });

// Users.hasMany(LanguageTransactionModel, {
//   foreignKey: "iUserId",
//   sourceKey: "iUserId",
// });

// Users.hasMany(UserHoobiesModel, {
//   foreignKey: "iUserId",
//   sourceKey: "iUserId",
// });

module.exports = Order;