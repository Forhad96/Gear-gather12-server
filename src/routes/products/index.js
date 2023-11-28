const verifyAdmin = require("../../middleware/verifyAdmin");
const verifyToken = require("../../middleware/verifyToken");
const products = require("../../models/Products");

const router = require("express").Router();

// get method
router.get("/products", async (req, res, next) => {
  try {
    const result = await products.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// get all verified product
router.get("/verifiedProducts", async (req, res, next) => {
  try {
    const sort = req.query.sort;
    const searchValue = req?.query?.searchValue;
    let query = { status: "accepted" };
    //check search value
    if (searchValue && searchValue.trim()) {
      query.tags = { $in: [new RegExp(searchValue, "i")] };
    }

    let result;

    if (sort === "asc") {
      result = await products.find(query).sort({ upVotes: 1 }); // Sort in ascending order
    } else if (sort === "desc") {
      result = await products.find(query).sort({ upVotes: -1 }); // Sort in descending order
    } else {
      result = await products.find(query); // No sorting
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// get single product by id
router.get("/products/:id", verifyToken, async (req, res, next) => {
  try {
    const query = { _id: req.params.id };
    console.log(req.user);
    const result = await products.findById(query);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// get user all products by email
router.get("/userProducts/:email", async (req, res, next) => {
  try {
    const query = { product_owner: req.params.email };
    const result = await products.find(query);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

//post method
router.post("/products", async (req, res, next) => {
  try {
    const newProduct = req.body;
    const result = await products.insertMany(newProduct);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// post method to for vote
router.post("/votes/:productId/:userId", async (req, res, next) => {
  try {
    const { productId, userId } = req.params;
    const action = req.query.action;
    const product = await products.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const existingVote = product.votedUsers.find(
      (vote) => vote.user && vote.user.toString() === userId
    );

    if (existingVote) {
      // If the user has already voted, remove their vote
      product.votedUsers.pull(existingVote);
      if (existingVote.action === action) {
        // If the user is toggling the same vote action, decrement the corresponding count
        if (action === "upvote") {
          product.upVotes -= 1;
        } else if (action === "downvote") {
          product.downVotes -= 1;
        }
      } else {
        // If the user is changing the vote action, update the counts accordingly
        if (action === "upvote") {
          product.upVotes += 1;
          product.downVotes -= 1;
        } else if (action === "downvote") {
          product.downVotes += 1;
          product.upVotes -= 1;
        }
        // Add the new vote
        product.votedUsers.push({ user: userId, action });
      }
    } else {
      // If the user hasn't voted yet, add their vote
      if (action === "upvote") {
        product.upVotes += 1;
      } else if (action === "downvote") {
        product.downVotes += 1;
      }
      product.votedUsers.push({ user: userId, action });
    }

    // Save the updated product
    await product.save();

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// patch method
router.patch("/products/:id", async (req, res, next) => {
  try {
    const updateDoc = req.body;
    const query = { _id: req.params.id };

    const result = await products.findByIdAndUpdate(query, updateDoc);
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
});

// delete method
router.delete("/products/:id", async (req, res, next) => {
  try {
    const query = { _id: req.params.id };
    const result = await products.deleteOne(query);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
