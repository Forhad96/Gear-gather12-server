const Report = require("../../models/Report");

const router = require("express").Router();

// post method
router.post('/report',async(req,res,next)=>{
    try {
        const newReport = req.body
        console.log(newReport);
        const result = await Report.insertMany(newReport)
        res.send({success:true})
    } catch (error) {
        next(error)
        
    }
})



module.exports = router;
