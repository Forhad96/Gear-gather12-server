const products = require("../../models/Products");
const Report = require("../../models/Report");

const router = require("express").Router();

// get all reported product
router.get("/allReportedProducts", async (req, res, next) => {
  try {
    //get all report
    const reports = await Report.find();

    // get all reported id
    const reportedId = reports.map((report) => report.productId);
    // get all reported product

    // console.log(reportedId);
    // return

    const reportedProducts = await products.find({
      _id: { $in:  reportedId },
    });
    console.log(reportedProducts);
    return;
  } catch (error) {
    console.log(error);
  }
});

// post method
router.post("/report", async (req, res, next) => {
  try {
    const newReport = req.body;
    console.log(newReport);
    const result = await Report.insertMany(newReport);
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
