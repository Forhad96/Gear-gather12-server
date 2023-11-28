const verifyAdmin = require("../../middleware/verifyAdmin");
const verifyToken = require("../../middleware/verifyToken");
const products = require("../../models/Products");

const router = require("express").Router();


// get all featured product from product Schema
router.get('/featuredProducts',async(req,res,next)=>{
    try {
        const query = { featured: true};
        const sortBy = req.query.sort || "desc"; 
        const result = await products.find(query).sort({ created_at: sortBy });
        res.send(result)
        console.log(sortBy);
    } catch (error) {
        next(error)
        
    }

})




module.exports = router