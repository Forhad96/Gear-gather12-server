const products = require("../../models/Products");

const router = require("express").Router();

router.get("/pageCounts/:type", async (req, res, next) => {
  try {
    const size = parseInt(req.query.size);
    const type = req.params.type;

    let totalPage = 0;

    if (type === "verifiedProducts") {
      const totalVerifiedProducts = await products
        .find({ status: "accepted" })
        .countDocuments();
      totalPage = Math.ceil(totalVerifiedProducts / size);
    }

    res.send({ totalPage });
  } catch (error) {
    next();
    console.log(error);
  }
});

module.exports = router;
