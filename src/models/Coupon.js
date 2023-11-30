const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    unique: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
status:{
  type:Boolean,
  default:true
}
});



// pre-save hook
couponSchema.pre('save', function (next) {
  // Check if the expiry date is less than the current date
  if (this.expiryDate < new Date()) {
    // If expired, set the status to false
    this.status = false;
  }

  // save operation
  next();
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
