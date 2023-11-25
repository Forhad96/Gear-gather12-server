const users = require("../../models/users");

const router = require("express").Router();

// get method
router.get('/users',async(req,res,next)=>{
  try {
    const result = await users.find()
    res.send(result)
  } catch (error) {
    next(error)

    
  }
})
// post method
router.post("/users", async (req, res,next) => {
try {
    const user = req.body;
    const result = await users.insertMany(user);
    res.send(result);
} catch (error) {
  next(error)
  
}
});



module.exports = router;
