const products = require("../../models/Products");

const router = require("express").Router();

// get method
router.get("/products", async (req, res, next) => {
  try {
    const result = await products.find();
    console.log(result);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// get all verified product
router.get("/verifiedProducts", async (req, res, next) => {
  try {
    const query = { status: "accepted" };
    const result = await products.find(query);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// get single product by id
router.get("/products/:id", async (req, res, next) => {
  try {
    const query = { _id: req.params.id };
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
    console.log(query);
  } catch (error) {
    next(error);
  }
});

//post method
router.post("/products", async (req, res, next) => {
  try {
    const newProduct = req.body;
    console.log(newProduct);
    const result = await products.insertMany(newProduct);
    res.send(result);
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
