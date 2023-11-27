const { Schema, model } = require("mongoose");

const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product_owner: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  upVotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
  votedUsers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      action: {
        type: String,
        enum: ["upvote", "downvote"],
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    required: true,
  },
  externalLinks: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const products = model("products", productsSchema);

module.exports = products;
// {
//   "id": 1,
//   "name": "Google Pixel 7 Pro",
//   "description": "The Google Pixel 7 Pro is a high-end smartphone with a powerful processor, a great camera system, and a beautiful display.",
//   "category": "Electronics",
//   "price": 899,
//   "user_id": 2,
//   "image_url": "https://example.com/pixel-7-pro.jpg",
//   "comments": [
//     {
//       "id": 1,
//       "comment": "This is an amazing phone!",
//       "user_id": 3,
//       "created_at": "2023-10-04T18:25:43Z"
//     },
//     {
//       "id": 2,
//       "comment": "I highly recommend this phone.",
//       "user_id": 4,
//       "created_at": "2023-10-05T12:37:19Z"
//     }
//   ],
//   "upvotes": 100,
//   "downvotes": 10,
//   "created_at": "2023-10-04T16:00:00Z"
// }
