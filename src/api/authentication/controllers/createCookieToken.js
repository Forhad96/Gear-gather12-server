// const generateToken = require("../../../lib/generateToken");

const generateToken = require("../../../utils/generateToken");

const createCookieToken = async (req, res, next) => {
  try {
    const user = req.body;
    // console.log("user for token", user);
    const token = generateToken(user);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = createCookieToken;
