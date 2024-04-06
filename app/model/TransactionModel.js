const {Sequelize} = require("sequelize");
const db = require("./index.js");
const {Op,QueryTypes} = require("sequelize");

const Transactions = db.define(
  "transactions", {
    iTransactionId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transactionId: {
      type: Sequelize.STRING,
    },
    sender: {
      type: Sequelize.INTEGER
    },
    receiver: {
      type: Sequelize.INTEGER
    },
    amount: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING
    }
  }, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

module.exports = Transactions;