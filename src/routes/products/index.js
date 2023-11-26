const products = require("../../models/Products");

const router = require("express").Router();

router.get("/products", async (req, res, next) => {
  try {
    const result = await products.find();
    console.log(result);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// get single product by id
router.get("/products/:id", async (req, res, next) => {
  try {
    const query = {_id: req.params.id}
    const result = await products.findById(query)
    res.send(result)
  } catch (error) {
    console.log(error);
    
  }
});

// get user all products by email
router.get("/products/:email", async (req, res, next) => {
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

module.exports = router;
