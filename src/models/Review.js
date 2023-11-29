const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  comment:{
    type:String,
    require:true

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  profession: {
    type: String,
    default:'user',
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
