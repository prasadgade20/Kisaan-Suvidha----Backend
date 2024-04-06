const {Sequelize} = require("sequelize");
const db = require("./index.js");
const {Op,QueryTypes} = require("sequelize");

const Blogs = db.define(
  "blog", {
    iBlogId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vTitle: {
      type: Sequelize.STRING,
    },
    vDescription: {
      type: Sequelize.STRING,
    },
    vImage: {
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

Blogs.getAllBlogs = (req) => {
  var where = {};
  if (req.body.iBlogId) {
    where.iBlogId = req.body.iBlogId
  }
  
  return Blogs.findAll({
    where,
  });
};

module.exports = Blogs;