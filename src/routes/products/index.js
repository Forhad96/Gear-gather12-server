const products = require("../../models/Products");

const router = require("express").Router();

router.get("/products", async (req, res) => {
// const data = await products.insertMany();
// console.log(data);
  const result = await products.find();
  console.log(result);
  res.send(result);
});


module.exports = router