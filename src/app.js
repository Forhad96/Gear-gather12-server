const express = require("express");
const applyMiddleware = require("./middleware/applyMiddleware");
const connectDB = require("./db/connectDB");
const errorHandle = require("./utils/errorHandle");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
applyMiddleware(app);

const authentication = require("./routes/authentication/index");
const productsRoutes = require("./routes/products/index");
const usersRoutes = require("./routes/users");
const reportRoutes = require('./routes/report/index')
const featuredProductsRoutes = require('./routes/featuredProducts')
const reviewsRoutes = require('./routes/Review/index')
const paymentRoutes = require('./routes/payment/index')
const couponRoutes = require('./routes/coupon/index')
const statisticsRoutes = require('./routes/adminStatistics/index')
const pageCountRoutes = require('./routes/pageCount/index.js')
//routes

app.use(authentication);
app.use(productsRoutes);
app.use(usersRoutes);
app.use(reportRoutes)
app.use(featuredProductsRoutes)
app.use(reviewsRoutes)
app.use(paymentRoutes)
app.use(couponRoutes)
app.use(statisticsRoutes)
app.use(pageCountRoutes)


app.get("/", (req, res) => {
  res.send("Gear-gather server running with mongoose");
});

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", async (req, res, next) => {
  const error = new Error(`The requested url is invalid: [${req.url}]`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

// Error handling middleware
app.use(errorHandle);

// const main = async () => {
//   await connectDB();
//   app.listen(port, () => {
//     console.log(`Gear-gather-server running with mongoose on port:- ${port}`);
//   });
// };
// main();
module.exports = app