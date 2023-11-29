const Review = require("../../models/Review");

const router = require("express").Router();








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