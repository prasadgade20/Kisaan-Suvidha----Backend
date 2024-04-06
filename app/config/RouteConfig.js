module.exports = (app) => {
  require("../routes/AuthRoute")(app);
  require("../routes/ProductRoute")(app);
  require("../routes/UserRoute")(app);
  require("../routes/BlogRoute")(app);
  require("../routes/CartRoute")(app);
  require("../routes/TransactionsRoute")(app);
  require("../routes/OrderRoute")(app);
};
