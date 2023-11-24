const generateToken = require("../../../lib/generateToken");

const createCookieToken = async(req,res,next)=>{
    const user= req.body;
    console.log('user for token',user);
    const token = generateToken(user)
    res.cookie("token",token,{
        httpOnly:true,
        secure: true,
        sameSite:'none',
    }).send({success:true})
}

module.exports = createCookieToken