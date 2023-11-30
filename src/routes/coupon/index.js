const express = require("express");
const verifyAdmin = require("../../middleware/verifyAdmin");
const verifyToken = require("../../middleware/verifyToken");
const Coupon = require("../../models/Coupon");
const router = express.Router();

// Get all Coupons
router.get("/coupons", verifyToken, async (req, res, next) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    next(error);

    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific coupon by ID:
router.get("/coupons/:id", verifyToken, async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    next(error);
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new coupon:
router.post("/coupons",  verifyAdmin, async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(201).json(newCoupon);
    console.log(newCoupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a coupon by ID:
router.patch(
  "/coupons/:id",
  verifyAdmin,
  async (req, res, next) => {
    try {
      const updatedCoupon = await Coupon.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedCoupon) {
        return res.status(404).json({ error: "Coupon not found" });
      }
      res.status(200).json(updatedCoupon);
    } catch (error) {
      next(error);
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Delete a coupon by ID:
router.delete(
  "/coupons/:id",
  
  verifyAdmin,
  async (req, res, next) => {
    try {
      const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
      if (!deletedCoupon) {
        return res.status(404).json({ error: "Coupon not found" });
      }
      res.status(204).send(); // No content in the response for a successful deletion
    } catch (error) {
      next(error);
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
