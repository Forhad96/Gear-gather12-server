const verifyToken = require("../../middleware/verifyToken");
const Review = require("../../models/Review");

const router = require("express").Router();




// get product specific review 
router.get('/reviews/:productId',async(req,res,next)=>{
    try {
       const query = {productId: req.params.productId} 
       const result = await Review.find(query)
       res.send(result)
    } catch (error) {
        next(error)
        
    }
})

router.get('/reviewCount/:productId',verifyToken,async(req,res,next)=>{
    try {
        const query = {productId: req.params.productId}
        const reviewCount = await Review.countDocuments(query)
        res.json(reviewCount)
    } catch (error) {
        next(error)
        
    }
})

// post method
router.post('/reviews',async(req,res,next)=>{
    try {
        const review = req.body
        const result = await Review.insertMany(review)
        res.send({success:true})
        console.log(result);
    } catch (error) {
        next(error)
        
    }
})




module.exports = router