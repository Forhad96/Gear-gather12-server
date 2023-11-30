const products = require("../../models/Products");
const Report = require("../../models/Report");

const router = require("express").Router();


//get all reports
router.get("/reports/:reportedProductId",async(req,res,next)=>{
  try {
    const query = {productId:req.params.reportedProductId}
    const result = await Report.find(query)
    res.send(result)
  } catch (error) {
    next(error)
  }
})

// get all reported products
router.get("/allReportedProducts", async (req, res, next) => {
  try {
    //get all report
    const reports = await Report.find();

    // get all reported id
    const reportedId = reports.map((report) => report.productId);
    // get all reported product

    // console.log(reportedId);

    const reportedProducts = await products.find({
      _id: { $in: reportedId },
    });
    console.log(reportedProducts);
    res.send(reportedProducts);
  } catch (error) {
    console.log(error);
  }
});

// post method
router.post("/report", async (req, res, next) => {
  try {
    const newReport = req.body;
    const result = await Report.insertMany(newReport);
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
});


// Delete method 
router.delete('/allReportedProduct/:productId',async(req,res,next)=>{
  try {
    const query ={_id: req.params.productId}
    const result = await products.deleteOne(query)
    res.send(result)
  } catch (error) {
    next(error)
    
  }
})

module.exports = router;
