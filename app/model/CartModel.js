const {Sequelize} = require("sequelize");
const db = require("./index.js");
const {Op,QueryTypes} = require("sequelize");

const Carts = db.define(
  "cart", {
    iCartId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    iUserId: {
      type: Sequelize.STRING,
    },
    iProductId: {
      type: Sequelize.STRING,
    },
    iMonth: {
      type: Sequelize.STRING,
    },
    dtAddedDate: {
      type: Sequelize.DATE,
    },
    dtUpdatedDate: {
      type: Sequelize.DATE,
    },
  }, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

Carts.getAllCart = (req) => {
  var where = {};

  if (req.body.iUserId && req.body.iUserId != "") {
    where.iUserId = req.body.iUserId;
  }
  return Carts.findAll({
    where,
    attributes: {
      include: [
        [
          Sequelize.literal(`(
                        SELECT vName
                        FROM product
                        WHERE
                        product.iProductId = cart.iProductId
                    )`),
          "vName",
        ],
        [
          Sequelize.literal(`(
                        SELECT vDescription
                        FROM product
                        WHERE
                        product.iProductId = cart.iProductId
                    )`),
          "vDescription",
        ],
        [
          Sequelize.literal(`(
                        SELECT vPrice
                        FROM product
                        WHERE
                        product.iProductId = cart.iProductId
                    )`),
          "vPrice",
        ],
        [
          Sequelize.literal(`(
                        SELECT eType
                        FROM product
                        WHERE
                        product.iProductId = cart.iProductId
                    )`),
          "eType",
        ],
        [
          Sequelize.literal(`(
                        SELECT vImage
                        FROM product
                        WHERE
                        product.iProductId = cart.iProductId
                    )`),
          "vImage",
        ],
        [
          Sequelize.literal(`(
                        SELECT vAddress
                        FROM product
                        WHERE
                        product.iProductId = cart.iProductId
                    )`),
          "vAddress",
        ],
      ],
    },
  });
};
module.exports = Carts;