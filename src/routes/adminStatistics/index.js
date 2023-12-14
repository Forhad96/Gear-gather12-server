const products = require("../../models/Products");
const Review = require("../../models/Review");
const users = require("../../models/users");
const Coupon = require("../../models/Coupon");

const router = require("express").Router();

// const products = require("../../models/Products");


router.get("/statistics", async (req, res, next) => {
  try {
    const statistics = {
      totalProducts: 0,
      totalReviews: 0,
      totalUsers: 0,
    };

    statistics.totalProducts = await products.estimatedDocumentCount();
    statistics.totalReviews = await Review.estimatedDocumentCount();
    statistics.totalUsers = await users.estimatedDocumentCount();
    statistics.totalCoupon = await Coupon.estimatedDocumentCount();
    
    
    res.send(statistics);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
